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
      socket.to(socket.roomId).emit("onUser", nickname);
    });
    socket.on("sendMessage", function (data) {
      data.nickname = socket.nickname;
      console.log(data);
      // 메세지가 안들어왔을때 거르는 방법 고안
      // if (data.message.length === 0) {

      // }
      Chats.create({
        roomId: socket.roomId,
        nickname: data.nickname,
        message: data.message,
      });
      socket.to(socket.roomId).emit("receiveMessage", data);
    });
    socket.on("disconnect", function () {
      console.log(socket.nickname + "님이 나가셨습니다.");
      socket.to(socket.roomId).emit("offUser", socket.nickname);
    });
  });
};