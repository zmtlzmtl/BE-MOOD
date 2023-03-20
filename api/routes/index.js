const express = require("express");
const router = express.Router();
const MusicRouter = require("./music.routes");
const UserRouter = require("./user.routes");
const ReviewRouter = require("./review.routes");
const ReCommentRouter = require("./recomment.routes");
const Composer = require("./composer.routes")
const LikeRouter = require("./like.route");
const ScrapRouter = require("./scrap.route");

router.use("/", UserRouter);
router.use("/review", ReCommentRouter);
router.use("/music", [ScrapRouter, LikeRouter, ReviewRouter]);
router.use("/", MusicRouter, Composer);

router.get("/", (_req, res) => {
  res.send("정상적으로 요청되었습니다.");
});

module.exports = router;
