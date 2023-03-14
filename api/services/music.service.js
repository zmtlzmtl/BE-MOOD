const musicRepository = require("../repositories/music.repository");

class MusicService {
  constructor() {
    this.musicRepository = new musicRepository();
  }

  create = async ({ musicTitle, musicContent, status, composer }) => {
    await this.musicRepository.create({
      musicTitle,
      musicContent,
      status,
      composer,
    });
  };

  findOneByMusicId = async ({ musicId }) => {
    let music = await this.musicRepository.findOneByMusicId({ musicId });
    return music;
  };
  findAllByComposer = async ({ composer }) => {
    let music = await this.musicRepository.findAllByComposer({ composer });
    return music;
  };

  findAllByStatus = async ({ status }) => {
    let music = await this.musicRepository.findAllByStatus({ status });
    return music;
  };
}
module.exports = MusicService;
