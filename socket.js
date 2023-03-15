const { Server } = require("socket.io");
const { Chats } = require("./db/models");

module.exports = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });
  io.sockets.on("connection", async (socket) => {
    const req = socket.request;

    socket.on("roomId", async function (roomId) {
      socket.roomId = roomId;
      socket.join(roomId);

      // roomId가 등록되고 나서 findRoomChats를 실행합니다.
      const findRoomChats = await Chats.findAll({
        where: { roomId: socket.roomId },
        order: [["createdAt", "ASC"]],
        limit: 30,
      });
      console.log(`접속자: ${socket.id}`);
      socket.emit("receive", findRoomChats);
    });
    socket.on("newUser", function (nickname) {
      console.log(nickname + " 님이 접속하였습니다.");
      socket.nickname = nickname;
      socket.emit("update", {
        type: "connect",
        nickname: "SERVER",
        message: nickname + "님이 접속하였습니다.",
      });
      socket.to(socket.roomId).emit("update", {
        type: "connect",
        nickname: "SERVER",
        message: nickname + "님이 접속하였습니다.",
      });
    });
    socket.on("send_message", function (data) {
      data.nickname = socket.nickname;
      console.log(data);
      Chats.create({
        roomId: socket.roomId,
        nickname: data.nickname,
        message: data.message,
      });
      socket.to(socket.roomId).emit("receive_message", data);
      socket.emit("receive_message", data);
    });
    socket.on("disconnect", function () {
      console.log(socket.nickname + "님이 나가셨습니다.");
      socket.to(socket.roomId).emit("update", {
        type: "disconnect",
        nickname: "SERVER",
        message: socket.nickname + "님이 나가셨습니다.",
      });
    });
  });
};
