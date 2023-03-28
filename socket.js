const { Server } = require("socket.io");
const { Users, Chats } = require("./db/models");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const logger = require("./db/config/logger");

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
        console.log(`roomId : ${roomId}`);
        socket.roomId = roomId;
        socket.join(roomId);
        // roomId가 등록되고 나서 findRoomChats를 실행합니다.
        const chats = await Chats.findAll({
          where: { roomId: socket.roomId },
          order: [["chatId", "DESC"]],
          limit: 30,
        });
        const findRoomChats = chats.reverse();
        console.log(`접속자: ${socket.id}`);
        const roomSockets = await io.in(socket.roomId).fetchSockets();
        const nicknames = roomSockets.map((socket) => socket.nickname);
        console.log("-------------" + nicknames);
        socket.emit("receive", findRoomChats);
        socket.emit("userList", nicknames);
        socket.to(socket.roomId).emit("userList", nicknames);
      });
      socket.on("scroll", async function (index) {
        console.log(index + "스크롤이벤트발생");
        const offset = (index - 1) * 30;
        if (index >= 2) {
          const chats = await Chats.findAll({
            where: { roomId: socket.roomId },
            order: [["chatId", "DESC"]],
            limit: 30,
            offset: offset,
          });
          const findRoomChats = chats.reverse();
          return socket.emit("plusScroll", findRoomChats);
        } else {
          return;
        }
      });
      socket.on("newUser", async (token) => {
        try {
          const decodedToken = jwt.verify(token, process.env.ACCESE_SECRET_KEY);
          const userId = decodedToken.userId;
          console.log(userId);
          const user = await Users.findOne({ where: { userId: userId } });
          socket.nickname = user.nickname;
          if (!user) {
            return socket.emit(
              "onUser",
              "message: 토큰에 해당하는 사용자가 존재하지 않습니다."
            );
          } else if (!socket.nickname) return;
          else {
            console.log(socket.nickname + " 님이 접속하였습니다.");
            socket.emit("onUser", socket.nickname);
            socket.to(socket.roomId).emit("onUser", socket.nickname);
          }
        } catch (err) {
          logger.error(err);
          socket.emit("onUser", err);
        }
      });
      socket.on("sendMessage", function (data) {
        data.nickname = socket.nickname;
        Chats.create({
          roomId: socket.roomId,
          nickname: socket.nickname,
          message: data.message,
        });
        socket.emit("receiveMessage", data); // 상대방한테
        socket.to(socket.roomId).emit("receiveMessage", data); // 나한테
      });
      socket.on("disconnect", function () {
        console.log(socket.nickname + "님이 나가셨습니다.");
        socket.emit("offUser", socket.nickname);
        socket.to(socket.roomId).emit("offUser", socket.nickname);
      });
    } catch (err) {
      logger.error(err);
      socket.emit("error", err);
    }
  });
};
