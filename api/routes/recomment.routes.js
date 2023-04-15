const express = require("express");
const router = express.Router();

const authMiddleWare = require("../middlewares/auth.middleware");
const Validation = require("../middlewares/validation.middleware");

const ReCommentController = require("../controllers/recomment.controller");
const reCommentController = new ReCommentController();

//대댓글 생성
router.post(
  "/:reviewId/recomment",
  Validation.commentCheck,
  authMiddleWare,
  reCommentController.addReviewComment
);

//대댓글 조회
router.get("/:reviewId/recomment", reCommentController.getReviewComment);

//대댓글 수정
router.put(
  "/:reviewId/recomment/:reCommentId",
  Validation.commentCheck,
  authMiddleWare,
  reCommentController.updateReviewComment
);

//대댓글 삭제
router.delete(
  "/:reviewId/recomment/:reCommentId",
  authMiddleWare,
  reCommentController.deleteReviewComment
);

module.exports = router;
