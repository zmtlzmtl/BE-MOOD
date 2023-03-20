const express = require("express");
const router = express.Router();
const MusicRouter = require("./music.routes");
const UserRouter = require("./user.routes");
const ReviewRouter = require("./review.routes");
const ReCommentRouter = require("./recomment.routes");
const Composer = require("./composer.routes")

router.use("/", UserRouter);
router.use("/music", ReviewRouter);
router.use("/review",ReCommentRouter)
router.use("/", MusicRouter, Composer);
router.get("/", (_req, res) => {
  res.send("정상적으로 요청되었습니다.");
});

module.exports = router;
