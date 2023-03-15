const dotenv = require("dotenv");
const cors = require("cors");
const express = require("express");
const http = require("http");
const createSocket = require("./socket");
const router = require("./api/routes");

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(
  cors({
    methods: ["GET", "POST", "UPDATE", "DELETE", "PUT", "PATCH"],
    allowedOrigins: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", router);

app.use((error, req, res, next) => {
  console.error(error);
  return res
    .status(error.code || 500)
    .json({ message: error.message || "서버 에러." });
});

const server = http.createServer(app);

createSocket(server);

server.listen(PORT, () => {
  console.log(PORT, "포트로 서버가 열렸어요!");
});
