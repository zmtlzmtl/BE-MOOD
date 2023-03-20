const ScrapRepository = require("../repositories/scrap.repository");
const MusicRepository = require("../repositories/music.repository");
const { makeError } = require("../error");

class ScrapService {
  scrapRepository = new ScrapRepository();
  musicRepository = new MusicRepository();

  scrap = async (userId, musicId) => {
    const findMusic = await this.musicRepository.findOneByMusicId({ musicId });
    if (!findMusic) {
      throw new makeError({ message: "스크랩 할 음악이 없습니다", code: 400 });
    }
    const scrap = await this.scrapRepository.findScrap(userId, musicId);
    if (!scrap) {
      await this.scrapRepository.makeScrap(userId, musicId);
      return { code: 201, message: "스크랩을 생성하였습니다" };
    } else {
      await this.scrapRepository.deleteScrap(userId, musicId);
      return { code: 200, message: "스크랩을 삭제하였습니다" };
    }
  };

  scrapStatus = async (userId, musicId) => {
    const findScrap = await this.scrapRepository.findScrap(userId, musicId);
    if (!findScrap) {
      return { scrapStatus: false };
    } else {
      return { scrapStatus: true };
    }
  };
}

module.exports = ScrapService;
