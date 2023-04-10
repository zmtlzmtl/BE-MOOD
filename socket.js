const { Server } = require("socket.io");
const { Users, UserInfos, Chats } = require("./db/models");
const Sequelize = require("sequelize");
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
        socket.roomId = roomId;
        socket.join(roomId);
        // roomId가 등록되고 나서 findRoomChats를 실행합니다.
        const chats = await Chats.findAll({
          where: { roomId: socket.roomId },
          order: [["chatId", "DESC"]],
          limit: 30,
        });
        const findRoomChats = chats.reverse();
        const roomSockets = await io.in(socket.roomId).fetchSockets();
        const nicknames = roomSockets.map((socket) => socket.nickname);
        socket.emit("receive", findRoomChats);
        socket.emit("userList", nicknames);
        socket.to(socket.roomId).emit("userList", nicknames);
      });
      socket.on("scroll", async function (index) {
        if (socket.roomId) {
          if (index >= 2) {
            const chats = await Chats.findAll({
              where: { roomId: socket.roomId },
              order: [["chatId", "DESC"]],
              limit: 30,
              offset: (index - 1) * 30,
            });
            const findRoomChats = chats.reverse();
            return socket.emit("plusScroll", findRoomChats);
          } else {
            return;
          }
        }
      });
      socket.on("newUser", async (token) => {
        try {
          const decodedToken = jwt.verify(token, process.env.ACCESS_SECRET_KEY);
          const userId = decodedToken.userId;
          const user = await Users.findOne({
            where: { userId: userId },
            attributes: [
              "userId",
              "nickname",
              [Sequelize.col("UserInfo.profileUrl"), "profileUrl"],
            ],
            include: [{ model: UserInfos, attributes: [] }],
            raw: true,
          });
          socket.nickname = user.nickname;
          socket.image = user.profileUrl;
          const data = { nickname: socket.nickname, image: socket.image };
          socket.emit("onUser", data);
          socket.to(socket.roomId).emit("onUser", data);
        } catch (err) {
          socket.emit("error", {
            message: "엑세스 토큰이 만료되었습니다.",
            code: 419,
          });
          logger.error(err);
          socket.emit("onUser", err);
        }
      });
      socket.on("sendMessage", function (data) {
        try {
          jwt.verify(data.token, process.env.ACCESS_SECRET_KEY);
          data.nickname = socket.nickname;
          Chats.create({
            roomId: socket.roomId,
            nickname: socket.nickname,
            message: data.message,
          });
          socket.emit("receiveMessage", data); // 상대방한테
          socket.to(socket.roomId).emit("receiveMessage", data); // 나한테
        } catch (err) {
          if (err instanceof jwt.TokenExpiredError) {
            socket.emit("error", {
              message: "엑세스 토큰이 만료되었습니다.",
              code: 419,
            });
            logger.error(err);
            socket.emit("onUser", err);
          }
        }
      });
      socket.on("disconnect", function () {
        socket.emit("offUser", socket.nickname);
        socket.to(socket.roomId).emit("offUser", socket.nickname);
      });
    } catch (err) {
      logger.error(err);
      socket.emit("error", err);
    }
  });
};
