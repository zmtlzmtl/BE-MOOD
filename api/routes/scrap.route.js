const express = require("express");
const router = express.Router();
const authMiddleWare = require("../middlewares/auth.middleware")

const ScrapController = require("../controllers/scrap.controller");
const scrapController = new ScrapController();

router.get("/:musicId/scrap",authMiddleWare,scrapController.scrapStatus)
router.put("/:musicId/scrap",authMiddleWare,scrapController.scrap)

module.exports = router;