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
          if (token) {
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
          } else {
            const profile = await Rooms.findAll({
              where: { roomId: socket.roomId },
              attributes: [
                [Sequelize.fn("DISTINCT", Sequelize.col("nickname")), "nickname"],
                "profileUrl",
              ],
            });
            socket.emit("userList", profile);
            socket.to(socket.roomId).emit("userList", profile);
          }
          
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
          if (!data.message || !data.message.trim()) {
            socket.emit("error", {
              message: "메시지가 비어 있거나 공백 문자만 포함되어 있습니다.",
              code: 400,
            });
            return;
          }
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
            socket.emit("sendMessage", err);
          }
        }
      });
      socket.on("disconnect", async () => {
        try {
          if (socket.nickname) {
            await Rooms.destroy({ where: { nickname: socket.nickname } });
          }
          socket.emit("offUser", socket.nickname);
          socket.to(socket.roomId).emit("offUser", socket.nickname);
        } catch (err) {
          logger.error(err);
          socket.emit("offUser", err);
        }
      });
    } catch (err) {
      logger.error(err);
      socket.emit("error", err);
    }
  });
};