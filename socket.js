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
      socket.on("roomId", async function (roomId, index) {
        socket.roomId = roomId;
        socket.join(roomId);
        const offset = index ? parseInt(index) : 0;
        // roomId가 등록되고 나서 findRoomChats를 실행합니다.
        const chats = await Chats.findAll({
          where: { roomId: socket.roomId },
          order: [["createdAt", "DESC"]],
          limit: 30,
          offset: offset
        });
        const findRoomChats = chats.reverse()
        console.log(`접속자: ${socket.id}`);
        socket.emit("receive", findRoomChats);
      });
      socket.on("newUser", function (nickname) {
        console.log(nickname + " 님이 접속하였습니다.");
        socket.nickname = nickname;

        socket.emit("onUser", nickname);
        socket.to(socket.roomId).emit("onUser", nickname)
      });
      socket.on("sendMessage", function (data) {
        data.nickname = socket.nickname;
        console.log(data);
        Chats.create({
          roomId: socket.roomId,
          nickname: data.nickname,
          message: data.message,
        });
        console.log(socket.roomId)
        socket.emit("receiveMessage", data);  // 상대방한테
        socket.to(socket.roomId).emit("receiveMessage", data); // 나한테
      });
      socket.on("disconnect", function () {
        console.log(socket.nickname + "님이 나가셨습니다.");
        socket.emit("offUser", socket.nickname);
        socket.to(socket.roomId).emit("offUser", socket.nickname);
      });
    } catch (err) {
      console.log(err);
    }
  });
};
