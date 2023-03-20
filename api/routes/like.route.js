const express = require("express");
const router = express.Router();
const authMiddleWare = require("../middlewares/auth.middleware")

const CommentController = require("../controllers/like.controller");
const commentController = new CommentController();

router.get("/:musicId/like",authMiddleWare,commentController.likeStatus)
router.put("/:musicId/like",authMiddleWare,commentController.like)

module.exports = router;