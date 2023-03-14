const musicRepository = require("../repositories/music.repository");

class MusicService {
  constructor() {
    this.musicRepository = new musicRepository();
  }
  create = async ({ musicTitle, musicContent, status, composer, musicUrl }) => {
    let music = await this.musicRepository.create({
      musicTitle,
      musicContent,
      status,
      composer,
      userId: 1,
      musicUrl,
    });
    return music;
  };
  findOneByMusicId = async ({ musicId }) => {
    let music = await this.musicRepository.findOneByMusicId({ musicId });
    if (!music) {
      throw new Error("게시글 상세 조회를 실패하였습니다.");
    }
    return music;
  };
  findAllByComposer = async ({ composer }) => {
    let music = await this.musicRepository.findAllByComposer({ composer });
    if (!music) {
      throw new Error("적절하지 않은 파라미터 요청입니다.");
    }
    return music;
  };
  findAllByStatus = async ({ status }) => {
    let mood = await this.musicRepository.findAllByStatus({ status });
    if (!status) {
      throw new Error("적절하지 않은 파라미터 요청입니다.");
    }
    return mood;
  };
  findBySurvey1 = async () => {
    let survey1 = await this.musicRepository.findBySurvey1();
    if (!survey1) {
      throw new Error("적절하지 않은 파라미터 요청입니다.");
    }
    return survey1;
  };
  findBySurvey2 = async () => {
    let survey2 = await this.musicRepository.findBySurvey2();
    if (!survey2) {
      throw new Error("적절하지 않은 파라미터 요청입니다.");
    }
    return survey2;
  };
  findBySurvey3 = async () => {
    let survey3 = await this.musicRepository.findBySurvey3();
    if (!survey3) {
      throw new Error("적절하지 않은 파라미터 요청입니다.");
    }
    return survey3;
  };
}
module.exports = MusicService;
