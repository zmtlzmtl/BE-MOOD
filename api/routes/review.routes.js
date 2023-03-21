const express = require("express");
const router = express.Router();

const authMiddleWare = require("../middlewares/auth.middleware");
const Validation = require("../middlewares/validation.middleware");

const CommentController = require("../controllers/review.controller");
const commentController = new CommentController();

router.post(
  "/:musicId/review",
  authMiddleWare,
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
  authMiddleWare,
  Validation.paramCheck,
  Validation.reviewCheck,
  commentController.updateMusicReview
);
router.delete(
  "/:musicId/review/:reviewId",
  authMiddleWare,
  Validation.paramCheck,
  commentController.deleteMusicReview
);

module.exports = router;
