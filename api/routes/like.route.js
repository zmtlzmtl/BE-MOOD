const express = require("express");
const router = express.Router();
const authMiddleWare = require("../middlewares/auth.middleware");

const LikeController = require("../controllers/like.controller");
const likeController = new LikeController();

router.get("/:musicId/like", authMiddleWare, likeController.likeStatus);
router.put("/:musicId/like", authMiddleWare, likeController.like);

module.exports = router;
