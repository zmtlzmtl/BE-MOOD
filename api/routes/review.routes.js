const express = require("express");
const router = express.Router();

const authMiddleWare = require("../middlewares/auth.middleware");
const Validation = require("../middlewares/validation.middleware");

const CommentController = require("../controllers/review.controller");
const commentController = new CommentController();

//리뷰 생성
router.post(
  "/:musicId/review",
  authMiddleWare,
  Validation.paramGetCheck,
  Validation.reviewCheck,
  commentController.addMusicReview
);

//리뷰 조회
router.get(
  "/:musicId/review",
  Validation.paramGetCheck,
  commentController.getMusicReview
);

//리뷰 수정
router.put(
  "/:musicId/review/:reviewId",
  authMiddleWare,
  Validation.paramCheck,
  Validation.reviewCheck,
  commentController.updateMusicReview
);

//리뷰 삭제
router.delete(
  "/:musicId/review/:reviewId",
  authMiddleWare,
  Validation.paramCheck,
  commentController.deleteMusicReview
);

module.exports = router;
