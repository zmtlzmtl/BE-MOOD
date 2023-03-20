const express = require("express");
const router = express.Router();
const MusicRouter = require("./music.routes");
const UserRouter = require("./user.routes");
const ReviewRouter = require("./review.routes");
const ReCommentRouter = require("./recomment.routes");
const LikeRouter = require("./like.route");

router.use("/", UserRouter);
router.use("/review", ReCommentRouter);
router.use("/music", [LikeRouter, ReviewRouter]);
router.use("/", MusicRouter);
router.get("/", (_req, res) => {
  res.send("정상적으로 요청되었습니다.");
});

module.exports = router;
