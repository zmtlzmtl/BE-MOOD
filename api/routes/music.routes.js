const express = require("express");
router = express.Router();
const multer = require("multer");
const storage = multer.memoryStorage();
const statusMiddleWare = require("../middlewares/status.middleware");
const MusicController = require("../controllers/music.controller");
const musicController = new MusicController();

router.post("/music", multer({ storage }).any(), musicController.create);
router.get("/music/search",statusMiddleWare, musicController.findByKeyword);
router.get("/music", statusMiddleWare, musicController.findAllByComposer);
router.get("/music/mood/:x/:y", musicController.findAllByCoOrdinates);
router.get("/music/survey/:x/:y", musicController.findAllByCoOrdinates);
router.get("/music/likechart", statusMiddleWare, musicController.likeChart);
router.get("/music/streamingchart", musicController.streamingChart);
router.post(
  "/music/:musicId/streaming",
  statusMiddleWare,
  musicController.sendStreaming
);
router.get("/music/:musicId", musicController.findOneByMusicId);
router.patch("/music/:musicId/tag", musicController.tagMusicId);

module.exports = router;
