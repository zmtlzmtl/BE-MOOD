const express = require("express");
const router = express.Router();
const multer = require("multer");
const storage = multer.memoryStorage();

const statusMiddleWare = require("../middlewares/status.middleware");

const MusicController = require("../controllers/music.controller");
const musicController = new MusicController();

//음악 생성
router.post("/music", multer({ storage }).any(), musicController.create);

//음악 검색
router.get("/music/search", statusMiddleWare, musicController.findByKeyword);

//작곡가 모든 노래 조회
router.get("/music", statusMiddleWare, musicController.findAllByComposer);

//감정상태 별 노래 추천
router.get("/music/mood/:x/:y", musicController.findAllByCoOrdinates);

//설문조사 후 노래 추천
router.get(
  "/music/survey/:x/:y",
  statusMiddleWare,
  musicController.findAllByCoOrdinates
);

//실시간 좋아요 차트 조회
router.get("/music/likechart", statusMiddleWare, musicController.likeChart);

//실시간 스트리밍 차트 조회
router.get("/music/streamingchart", musicController.streamingChart);

//스트리밍 수 추가
router.post(
  "/music/:musicId/streaming",
  statusMiddleWare,
  musicController.sendStreaming
);

//음악 조회
router.get("/music/:musicId", musicController.findOneByMusicId);

//음악 태그 수정
router.patch("/music/:musicId/tag", musicController.tagMusicId);

module.exports = router;
