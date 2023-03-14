const express = require("express");
router = express.Router();
const multer = require("multer");
const storage = multer.memoryStorage();
const MusicController = require("../controllers/music.controller");
const musicController = new MusicController();

router.post("/music", multer({ storage }).any(), musicController.create);
router.get("/music/:musicId", musicController.findOneByMusicId);
router.get("/music", musicController.findAllByComposer);
router.get("/mood/:status", musicController.findAllByStatus);
router.get("/survey/:survey", musicController.findBySurvey);

module.exports = router;
