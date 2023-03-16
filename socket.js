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
    try {
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
        try {
          if (!data.message) {
            throw new Error("메시지가 입력되지 않았습니다.");
          }
  
          data.nickname = socket.nickname;
          console.log(data);
  
          Chats.create({
            roomId: socket.roomId,
            nickname: data.nickname,
            message: data.message,
          });
  
          socket.to(socket.roomId).emit("receiveMessage", data);
        } catch (err) {
          console.error(err);
          socket.emit("errorMessage", err.message);
        }
      });
  
      socket.on("disconnect", function () {
        console.log(socket.nickname + "님이 나가셨습니다.");
        socket.to(socket.roomId).emit("offUser", socket.nickname);
      });
    } catch (err) {
      console.error(err);
      socket.emit("errorMessage", "서버 에러가 발생했습니다.");
    }
  });
};
