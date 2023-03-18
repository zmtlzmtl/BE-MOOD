const musicRepository = require("../repositories/music.repository");
const { makeError } = require("../error");
const { cloudfront } = require("../middlewares/cloudfront");
class MusicService {
  constructor() {
    this.musicRepository = new musicRepository();
  }

  findOneByMusicId = async ({ musicId }) => {
    let music = await this.musicRepository.findOneByMusicId({ musicId });
    if (music == null) {
      throw new makeError({
        message: "게시글 상세 조회를 실패하였습니다.",
        code: 400,
      });
    }
    let fileName = music.fileName;
    music.musicUrl = "https://d13uh5mnneeyhq.cloudfront.net/" + fileName;
    return music;
  };
  findAllByComposer = async ({ composer }) => {
    let music = await this.musicRepository.findAllByComposer({ composer });
    if (music == "") {
      throw new makeError({
        message: "적절하지 않은 파라미터 요청입니다.",
        code: 400,
      });
    }
    for (let i = 0; i < music.length; i++) {
      let fileN = music[i].dataValues.fileName;
      music[i].dataValues.musicUrl =
        "https://d13uh5mnneeyhq.cloudfront.net/" + fileN;
    }
    return music;
  };
  mood = async ({ x, y }) => {
    if ((x <= 150 && y <= 75) || (x == 0 && y == 0)) {
      if (x == 0 && y == 75) {
        let sadCalm = await this.musicRepository.find9and13();
        return await cloudfront(sadCalm);
      } else if (x == 150 && y == 0) {
        let calmSad = await this.musicRepository.find13and14();
        return await cloudfront(calmSad);
      } else if (x == 150 && y == 75) {
        let sosoSadCalm = await this.musicRepository.find9101314();
        return await cloudfront(sosoSadCalm);
      }
      let thirteen = await this.musicRepository.findOnebyStatus13();
      return await cloudfront(thirteen);
    } else if (y < 150 && y > 75 && x < 150) {
      let nine = await this.musicRepository.findOnebyStatus9();
      let fileName = nine.dataValues.fileName;
      nine.dataValues.musicUrl =
        "https://d13uh5mnneeyhq.cloudfront.net/" + fileName;
      return nine;
    } else if (y < 75 && x > 150 && x < 300) {
      let fourteen = await this.musicRepository.findOnebyStatus14();
      let fileName = fourteen.dataValues.fileName;
      fourteen.dataValues.musicUrl =
        "https://d13uh5mnneeyhq.cloudfront.net/" + fileName;
      return fourteen;
    } else if (y > 75 && y < 150 && x < 300 && x > 150) {
      let ten = await this.musicRepository.findOnebyStatus10();
      let fileName = ten.dataValues.fileName;
      ten.dataValues.musicUrl =
        "https://d13uh5mnneeyhq.cloudfront.net/" + fileName;
      return ten;
    }
  };
  findBySurvey1 = async () => {
    let survey1 = await this.musicRepository.findBySurvey1();
    if (survey1 == "") {
      throw new makeError({
        message: "status 4,7,8 에 해당하는 음악이 없습니다.",
        code: 400,
      });
    }
    for (let i = 0; i < survey1.length; i++) {
      let fileName = survey1[i].dataValues.fileName;
      survey1[i].dataValues.musicUrl =
        "https://d13uh5mnneeyhq.cloudfront.net/" + fileName;
    }
    let randNum = await this.musicRepository.rand(0, survey1.length);
    let randOne = survey1[randNum].dataValues;
    return randOne;
  };
  findBySurvey2 = async () => {
    let survey2 = await this.musicRepository.findBySurvey2();
    if (survey2 == "") {
      throw new makeError({
        message: "status: 5 에 해당하는 음악이 없습니다.",
        code: 400,
      });
    }
    for (let i = 0; i < survey2.length; i++) {
      let fileName = survey2[i].dataValues.fileName;
      survey2[i].dataValues.musicUrl =
        "https://d13uh5mnneeyhq.cloudfront.net/" + fileName;
    }
    let randNum = await this.musicRepository.rand(0, survey2.length);
    let randOne = survey2[randNum].dataValues;
    return randOne;
  };
  findBySurvey3 = async () => {
    let survey3 = await this.musicRepository.findBySurvey3();
    if (survey3 == "") {
      throw new makeError({
        message: "status: 2,3,6 에 해당하는 음악이 없습니다.",
        code: 400,
      });
    }
    for (let i = 0; i < survey3.length; i++) {
      let fileName = survey3[i].dataValues.fileName;
      survey3[i].dataValues.musicUrl =
        "https://d13uh5mnneeyhq.cloudfront.net/" + fileName;
    }
    let randNum = await this.musicRepository.rand(0, survey3.length);
    let randOne = survey3[randNum].dataValues;
    return randOne;
  };
  findByKeyword = async ({ keyword }) => {
    const music = await this.musicRepository.findByKeyword({ keyword });
    if (keyword.length === 0) {
      throw new makeError({
        message: "해당하는 keyword가 없습니다.",
        code: 400,
      });
    }
    return music;
  };
}
module.exports = MusicService;
