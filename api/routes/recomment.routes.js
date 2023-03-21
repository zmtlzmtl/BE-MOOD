const express = require("express");
const router = express.Router();

const authMiddleWare = require("../middlewares/auth.middleware");
const Validation = require("../middlewares/validation.middleware");

const ReCommentController = require("../controllers/recomment.controller");
const reCommentController = new ReCommentController();

router.post(
  "/:reviewId/recomment",
  authMiddleWare,
  reCommentController.addReviewComment
);
router.get("/:reviewId/recomment", reCommentController.getReviewComment);
router.put(
  "/:reviewId/recomment/:reCommentId",
  authMiddleWare,
  reCommentController.updateReviewComment
);
router.delete(
  "/:reviewId/recomment/:reCommentId",
  authMiddleWare,
  reCommentController.deleteReviewComment
);

module.exports = router;
