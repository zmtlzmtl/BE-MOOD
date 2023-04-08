const { Server } = require("socket.io");
const { Users, Userinfos, Chats } = require("./db/models");
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
        if (!socket.roomId) {
          console.log("룸 요청이 들어오지 않았습니다.");
          return;
        }
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
      });
      socket.on("newUser", async (token) => {
        try {
          const decodedToken = jwt.verify(token, process.env.ACCESS_SECRET_KEY);
          const userId = decodedToken.userId;
          if (!userId) {
            return socket.emit(
              "onUser",
              "message: 토큰에 해당하는 사용자가 존재하지 않습니다."
            );
          }
          const user = await Users.findOne({
            where: { userId: userId },
            include: [{ model: Userinfos, attributes: [profileUrl] }],
          });
          let image = user.Userinfos.profileUrl;
          socket.nickname = user.nickname;

          if (!image) {
            image = "https://d13uh5mnneeyhq.cloudfront.net/beethoven.png";
          }
          socket.emit("onUser", socket.nickname);
          socket.to(socket.roomId).emit("onUser", socket.nickname, image);
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
        socket.emit("receiveMessage", data); // 상대방에게
        socket.to(socket.roomId).emit("receiveMessage", data); // 나한테
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
