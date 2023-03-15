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
    const {
      headers: { referer },
    } = req;
    const roomId = referer.split("/")[referer.split("/").length - 1];
    socket.join(roomId);

    const findRoomChats = await Chats.findAll({
      where: { roomId },
      order: [["createdAt", "ASC"]],
      limit: 30,
    }); 

    socket.emit("receive", findRoomChats);
    console.log(`접속자: ${socket.id}`);

    socket.on("newUser", function (nickname) {
      console.log(nickname + " 님이 접속하였습니다.");
      socket.nickname = nickname;

      socket.emit("update", {
        type: "connect",
        nickname: "SERVER",
        message: nickname + "님이 접속하였습니다.",
      });

      socket.to(roomId).emit("update", {
        type: "connect",
        nickname: "SERVER",
        message: nickname + "님이 접속하였습니다.",
      });
    });

    socket.on("send_message", function (data) {
      data.nickname = socket.nickname;

      console.log(data);
      Chats.create({
        roomId: roomId,
        nickname: data.nickname,
        message: data.message,
      });

      socket.to(roomId).emit("receive_message", data);
    });

    socket.on("disconnect", function () {
      console.log(socket.nickname + "님이 나가셨습니다.");

      socket.to(roomId).emit("update", {
        type: "disconnect",
        nickname: "SERVER",
        message: socket.nickname + "님이 나가셨습니다.",
      });
    });
  });
};
