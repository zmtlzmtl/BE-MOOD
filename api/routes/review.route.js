const express = require("express");
const router = express.Router();

const CommentController = require("../controllers/review.controller");
const commentController = new CommentController();
//로그인 미들웨어 자리
//유효성 검증 자리

router.post("/:musicId/review", commentController.addMusicReview);
router.get("/:musicId/review", commentController.getMusicReview);
router.put("/:musicId/review/:reviewId", commentController.updateMusicReview);
router.delete(
  "/:musicId/review/:reviewId",
  commentController.deleteMusicReview
);

module.exports = router;
