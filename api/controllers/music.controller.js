const musicService = require("../services/music.service");
const musicRepository = require("../repositories/music.repository");

class MusicController {
  constructor() {
    this.musicService = new musicService();
    this.musicRepository = new musicRepository();
  } //test
  create = async (req, res) => {
    try {
      let file = req.files[0];
      let data = await this.musicRepository.s3Upload(file);
      let fileName = data.Key;
      let { musicTitle, musicContent, status, composer, tag } = req.body;
      let music = await this.musicService.create({
        musicTitle,
        musicContent,
        status,
        composer,
        tag,
        fileName,
      });
      return res.status(200).json({ music, msg: "생성 완료" });
    } catch (err) {
      console.log(err);
      return res.status(400).json({ msg: err.message + "생성 실패" });
    }
  };
  findOneByMusicId = async (req, res, next) => {
    try {
      const { musicId } = req.params;
      const project = await this.musicService.findOneByMusicId({ musicId });
      return await res.status(200).json({ data: project });
    } catch (err) {
      next(err);
    }
  };
  findAllByComposer = async (req, res, next) => {
    try {
      const { userId } = res.locals.user;
      const composer = req.query;
      const project = await this.musicService.findAllByComposer({
        userId,
        composer,
      });
      return res.status(200).json({ data: project });
    } catch (err) {
      next(err);
    }
  };
  findAllByCoOrdinates = async (req, res, next) => {
    try {
      if (!res.locals.user || typeof res.locals.user.userId !== "number") {
        res.locals.user = { userId: null };
      }
      const { userId } = res.locals.user;
      const { x, y } = req.params;
      const mood = await this.musicService.mood({ userId, x, y });
      return res
        .status(200)
        .json({ message: mood.message, music: mood.musicData });
    } catch (err) {
      next(err);
    }
  };
  findByKeyword = async (req, res, next) => {
    try {
      const { userId } = res.locals.user;
      const { keyword } = req.query;
      const project = await this.musicService.findByKeyword({
        userId,
        keyword,
      });
      return res.status(200).json({ data: project });
    } catch (err) {
      return res.status(400).json({ msg: err.message });
    }
  };

  likeChart = async (req, res, next) => {
    try {
      const { userId } = res.locals.user;

      const likeChart = await this.musicService.likeChart(userId);
      res
        .status(200)
        .json({ message: "좋아요 차트 조회에 성공했습니다.", likeChart });
    } catch (error) {
      next(error);
    }
  };

  streamingChart = async (req, res, next) => {
    try {
      const streamingChart = await this.musicService.streamingChart();
      res
        .status(200)
        .json({ message: "스크랩 차트 조회에 성공했습니다.", streamingChart });
    } catch (error) {
      next(error);
    }
  };

  sendStreaming = async (req, res, next) => {
    try {
      const { userId } = res.locals.user;
      const { musicId } = req.params;

      await this.musicService.sendStreaming(userId, musicId);
      res.status(201).json({ message: "스트리밍수 증가" });
    } catch (error) {
      next(error);
    }
  };
  tagMusicId = async (req, res, next) => {
    try {
      const { musicId } = req.params;
      const { tag } = req.body;
      await this.musicRepository.tagMusicId({ musicId, tag });
      res.status(201).json({ message: "태그 변경" });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = MusicController;
