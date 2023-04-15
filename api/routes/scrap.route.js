const express = require("express");
const router = express.Router();
const authMiddleWare = require("../middlewares/auth.middleware");

const ScrapController = require("../controllers/scrap.controller");
const scrapController = new ScrapController();

//스크랩 상태변경
router.put("/:musicId/scrap", authMiddleWare, scrapController.scrap);

//스크랩 조회
router.get("/:musicId/scrap", authMiddleWare, scrapController.scrapStatus);

module.exports = router;
