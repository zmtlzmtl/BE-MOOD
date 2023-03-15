const express = require("express");
const router = express.Router();

const CommentController = require("../controllers/review.controller");
const commentController = new CommentController();
//로그인 미들웨어 자리
const Validation = require("../middlewares/validation.middleware");

router.post(
  "/:musicId/review",
  Validation.paramGetCheck,
  Validation.reviewCheck,
  commentController.addMusicReview
);
router.get(
  "/:musicId/review",
  Validation.paramGetCheck,
  commentController.getMusicReview
);
router.put(
  "/:musicId/review/:reviewId",
  Validation.paramCheck,
  Validation.reviewCheck,
  commentController.updateMusicReview
);
router.delete(
  "/:musicId/review/:reviewId",
  Validation.paramCheck,
  commentController.deleteMusicReview
);

module.exports = router;
