const express = require("express");
router = express.Router();
const multer = require("multer");
const storage = multer.memoryStorage();
const MusicController = require("../controllers/music.controller");
const musicController = new MusicController();

router.post("/music", multer({ storage }).any(), musicController.create);
router.get("/music/search", musicController.findByKeyword);

router.get("/music", musicController.findAllByComposer);
router.get("/mood/:x/:y", musicController.findAllByCoOrdinates);
router.get("/survey/:x/:y", musicController.findAllByCoOrdinates);
router.get("/music/likechart",musicController.likeChart)
router.get("/music/streamingchart",musicController.streamingChart)
router.get("/music/:musicId", musicController.findOneByMusicId);

module.exports = router;
