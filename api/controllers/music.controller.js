const musicService = require("../services/music.service");
const musicRepository = require("../repositories/music.repository");

class MusicController {
  constructor() {
    this.musicService = new musicService();
    this.musicRepository = new musicRepository();
  }

  create = async (req, res) => {
    try {
      const file = req.files[0];
      const result = await this.musicRepository.s3Upload(file);
      let Url = result.Location;
      let userId = 1;
      let { musicTitle, musicContent, status, composer } = req.body;
      await this.musicRepository.create({
        musicTitle,
        musicContent,
        status,
        composer,
        userId,
        musicUrl: Url,
      });
      return res.status(200).json({ msg: "생성완료" });
    } catch (err) {
      console.log(err);
      return res.status(400).json({ msg: "생성실패" });
    }
  };

  findOneByMusicId = async (req, res) => {
    try {
      const { musicId } = req.params;
      const project = await this.musicRepository.findOneByMusicId({ musicId });
      return res.status(200).json({ data: project });
    } catch (err) {
      console.log(err);
      return res.status(400).json({ err: err.message });
    }
  };

  findAllByComposer = async (req, res) => {
    try {
      const composer = req.query;
      const project = await this.musicRepository.findAllByComposer({
        composer,
      });
      res.status(200).json({ data: project });
    } catch (err) {
      console.log(err);
      res.status(400).json({ msg: err.message });
    }
  };

  findAllByStatus = async (req, res) => {
    try {
      const { status } = req.params;
      const project = await this.musicRepository.findAllByStatus({ status });
      res.status(200).json({ data: project });
    } catch (err) {
      console.log(err);
      return res.status(400).json({ err: err.message });
    }
  };
}

module.exports = MusicController;
