const express = require("express");
const router = express.Router();

const authMiddleWare = require("../middlewares/auth.middleware");

const LikeController = require("../controllers/like.controller");
const likeController = new LikeController();

//좋아요 변경하기
router.put("/:musicId/like", authMiddleWare, likeController.like);

//좋아요 조회하기
router.get("/:musicId/like", authMiddleWare, likeController.likeStatus);

module.exports = router;
