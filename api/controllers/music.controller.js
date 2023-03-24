const musicService = require("../services/music.service");
const musicRepository = require("../repositories/music.repository");

class MusicController {
  constructor() {
    this.musicService = new musicService();
    this.musicRepository = new musicRepository();
  }
  create = async (req, res) => {
    try {
      let file = req.files[0];
      let data = await this.musicRepository.s3Upload(file);
      let Url = data.Location;
      let fileN = data.key;
      let { musicTitle, musicContent, status, composer } = req.body;
      let music = await this.musicRepository.create({
        musicTitle,
        musicContent,
        status,
        composer,
        userId: 1,
        musicUrl: Url,
        fileName: fileN,
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
      const composer = req.query;
      const project = await this.musicService.findAllByComposer({
        composer,
      });
      return res.status(200).json({ data: project });
    } catch (err) {
      next(err);
    }
  };
  findAllByCoOrdinates = async (req, res, next) => {
    try {
      const mood = await this.musicService.mood(req.params);
      return res.status(200).json({ data: mood });
    } catch (err) {
      next(err);
    }
  };
  findByKeyword = async (req, res, next) => {
    try {
      const { keyword } = req.query;
      const project = await this.musicService.findByKeyword({
        keyword,
      });
      return res.status(200).json({ data: project });
    } catch (err) {
      return res.status(400).json({ msg: err.message });
    }
  };

  likeChart =  async (req,res,next) => {
    if (!res.locals.user) {
      res.locals.user = { userId: 0 };
    }
    const { userId } = res.locals.user;
    
    const likeChart = await this.musicService.likeChart(userId)
    res.status(200).json({message:"좋아요 차트 조회에 성공했습니다.", likeChart})
  }

  streamingChart = async (req,res,next)=> {
    const streamingChart = await this.musicService.streamingChart()
    res.status(200).json({message:"스크랩 차트 조회에 성공했습니다.",streamingChart})
  }
}

module.exports = MusicController;
