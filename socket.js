/* 설치한 express 모듈 불러오기 */
const express = require("express");

/* 설치한 socket.io 모듈 불러오기 */
const socket = require("socket.io");

/* Node.js 기본 내장 모듈 불러오기 */
const http = require("http");

/* Node.js 기본 내장 모듈 불러오기 */
const fs = require("fs");

/* express 객체 생성 */
const app = express();

/* express http 서버 생성 */
const server = http.createServer(app);

/* 생성된 서버를 socket.io에 바인딩 */
const io = socket(server);

/* 저장할 모델 불러오기 */
const { Chats } = require("./db/models");

app.use("/css", express.static("./static/css"));
app.use("/js", express.static("./static/js"));

/* Get 방식으로 / 경로에 접속하면 실행 됨 */
app.get("/api/room/:roomId", function (request, response) {
  fs.readFile("./static/index.html", function (err, data) {
    if (err) {
      response.send("에러");
    } else {
      response.writeHead(200, { "Content-Type": "text/html" });
      response.write(data);
      response.end();
    }
  });
});

io.sockets.on("connection", async function (socket) {
  const req = socket.request;
  const {
    headers: { referer }, //referer: http://localhost:8080/rooms/1
  } = req;
  const roomId = referer.split("/")[referer.split("/").length - 1]; // roomId: 1
  socket.join(roomId); //room을 통해 소켓분리

  // 처음 접속한 유저에게만 채팅 내역 전송
  const findRoomChats = await Chats.findAll({
    where: { roomId },
    order: [["createdAt", "ASC"]],
    limit: 30,
  });
  socket.emit("receive", findRoomChats);

  socket.on("newUser", function (nickname) {
    console.log(nickname + " 님이 접속하였습니다.");
    socket.nickname = nickname;
  
    // 해당 소켓에게만 접속 메시지 보내기
    socket.emit("update", {
      type: "connect",
      nickname: "SERVER",
      message: nickname + "님이 접속하였습니다.",
    });
  
    // 나를 제외한 모든 소켓에게 접속 메시지 보내기
    socket.to(roomId).emit("update", {
      type: "connect",
      nickname: "SERVER",
      message: nickname + "님이 접속하였습니다.",
    });
  });

  /* 전송한 메시지 받기 */
  socket.on("message", function (data) {
    /* 받은 데이터에 누가 보냈는지 이름을 추가 */
    data.nickname = socket.nickname;

    console.log(data);
    Chats.create({
      roomId: roomId,
      nickname: data.nickname,
      message: data.message,
    });
    /* 보낸 사람을 제외한 나머지 유저에게 메시지 전송 */
    socket.to(roomId).emit("update", data);
  });

  /* 접속 종료 */
  socket.on("disconnect", function () {
    console.log(socket.nickname + "님이 나가셨습니다.");

    /* 나가는 사람을 제외한 나머지 유저에게 메시지 전송 */
    socket.to(roomId).emit("update", {
      type: "disconnect",
      nickname: "SERVER",
      message: socket.nickname + "님이 나가셨습니다.",
    });
  });
});

/* 서버를 8080 포트로 listen */
server.listen(8080, function () {
  console.log("서버 실행 중..");
});
