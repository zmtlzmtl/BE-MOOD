const express = require("express");
const router = express.Router();

const ReCommentController = require("../controllers/recomment.controller");
const reCommentController = new ReCommentController();
//로그인 미들웨어 자리
const Validation = require("../middlewares/validation.middleware");

router.post(
  "/:reviewId/recomment",
  reCommentController.addReviewComment
);
router.get(
  "/:reviewId/recomment",
  reCommentController.getReviewComment
);
router.put(
  "/:reviewId/recomment/recommentId",
  reCommentController.updateReviewComment
);
router.delete(
  "/:reviewId/recomment/recommentId",
  reCommentController.deleteReviewComment
);

module.exports = router;
