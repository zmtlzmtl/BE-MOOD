const { Server } = require("socket.io");
const { Users, UserInfos, Chats, Rooms } = require("./db/models");
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
        const chats = await Chats.findAll({
          where: { roomId: socket.roomId },
          order: [["chatId", "DESC"]],
          limit: 30,
        });
        const findRoomChats = chats.reverse();
        socket.emit("receive", findRoomChats);
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
          await Rooms.create({
            roomId: socket.roomId,
            nickname: socket.nickname,
            profileUrl: socket.image,
          });
          const profile = await Rooms.findAll({
            where: { roomId: socket.roomId },
            attributes: [
              [Sequelize.fn("DISTINCT", Sequelize.col("nickname")), "nickname"],
              "profileUrl",
            ],
          });
          socket.emit("userList", profile);
          socket.to(socket.roomId).emit("userList", profile);
        } catch (err) {
          socket.emit("error", {
            message: "엑세스 토큰이 만료되었습니다.",
            code: 419,
          });
          logger.error(err);
          socket.emit("onUser", err);
        }
      });
      socket.on("sendMessage", async (data) => {
        try {
          jwt.verify(data.token, process.env.ACCESS_SECRET_KEY);
          data.nickname = socket.nickname;
          await Chats.create({
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
      socket.on("getout", async (token) => {
        try {
          const decodedToken = jwt.verify(token, process.env.ACCESS_SECRET_KEY);
          const userId = decodedToken.userId;
          const user = await Users.findOne({
            where: { userId: userId },
          });
          if (user.nickname) {
            await Rooms.destroy({ where: { nickname: user.nickname } });
          }
          socket.emit("offUser", user.nickname);
          socket.to(socket.roomId).emit("offUser", user.nickname);
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
    } catch (err) {
      logger.error(err);
      socket.emit("error", err);
    }
  });
};
