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
  findBySurvey = async (req, res, next) => {
    try {
      let { survey } = req.params;
      if (survey == 1) {
        let data = await this.musicService.findBySurvey1({
          status: [4, 7, 8],
        });
        return res.status(200).json({ data });
      } else if (survey == 2) {
        let data = await this.musicService.findBySurvey2({
          status: 5,
        });
        return res.status(200).json({ data });
      } else if (survey == 3) {
        let data = await this.musicService.findBySurvey3({
          status: [2, 3, 6],
        });
        return res.status(200).json({ data });
      } else return res.status(400).json({ msg: "invalid survey parameters." });
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
}

module.exports = MusicController;
