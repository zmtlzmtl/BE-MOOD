const musicRepository = require("../repositories/music.repository");
const { makeError } = require("../error");
const { cloudfront } = require("../middlewares/cloudfront.middleware");
const { cloudfrontfor } = require("../middlewares/cloudfront.middleware");

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
    return await cloudfrontfor(music);
  };
  mood = async ({ x, y }) => {
    if (x >= 0 && x <= 150 && y >= 0 && y <= 75) {
      if (x == 150 && y == 75) {
        let find9101314 = await this.musicRepository.find9101314();
        return await cloudfront(find9101314);
      } else if (x == 150 && y == 0) {
        let find13and14 = await this.musicRepository.find13and14();
        return await cloudfront(find13and14);
      } else if (x == 0 && y == 75) {
        let find9and13 = await this.musicRepository.find9and13();
        return await cloudfront(find9and13);
      }
      let thirteen = await this.musicRepository.findOneByStatus13();
      return await cloudfront(thirteen);
    } else if (x > 150 && x <= 300 && y >= 0 && y <= 75) {
      if (x == 300 && y == 75) {
        let find10111415 = await this.musicRepository.find10111415();
        return await cloudfront(find10111415);
      } else if (x == 300 && y == 0) {
        let find14and15 = await this.musicRepository.find14and15();
        return await cloudfront(find14and15);
      }
      let fourteen = await this.musicRepository.findOneByStatus13();
      return await cloudfront(fourteen);
    } else if (x > 300 && x <= 450 && y >= 0 && y <= 75) {
      if (x == 450 && y == 75) {
        let find11121516 = await this.musicRepository.find11121516();
        return await cloudfront(find11121516);
      } else if (x == 450 && y == 0) {
        let find15and16 = await this.musicRepository.find15and16();
        return await cloudfront(find15and16);
      }
      let fifteen = await this.musicRepository.findOneByStatus15();
      return await cloudfront(fifteen);
    } else if (x > 450 && x <= 600 && y >= 0 && y <= 75) {
      if (x == 600 && y == 75) {
        let find12and16 = await this.musicRepository.find12and16();
        return await cloudfront(find12and16);
      }
      let sixteen = await this.musicRepository.findOneByStatus16();
      return await cloudfront(sixteen);
    } else if (x >= 0 && x <= 150 && y > 75 && y <= 150) {
      if (x == 0 && y == 150) {
        let find5and9 = await this.musicRepository.find5and9();
        return await cloudfront(find5and9);
      } else if (x == 150 && y == 150) {
        let find56910 = await this.musicRepository.find56910();
        return await cloudfront(find56910);
      }
      let nine = await this.musicRepository.findOneByStatus9();
      return await cloudfront(nine);
    } else if (x > 150 && x <= 300 && y > 75 && y <= 150) {
      if (x == 300 && y == 150) {
        let find671011 = await this.musicRepository.find671011();
        return await cloudfront(find671011);
      }
      let ten = await this.musicRepository.findOneByStatus10();
      return await cloudfront(ten);
    } else if (x > 300 && x <= 450 && y > 75 && y <= 150) {
      if (x == 450 && y == 150) {
        let find781112 = await this.musicRepository.find781112();
        return await cloudfront(find781112);
      }
      let eleven = await this.musicRepository.findOneByStatus11();
      return await cloudfront(eleven);
    } else if (x > 450 && x <= 600 && y > 75 && y <= 150) {
      if (x == 600 && y == 150) {
        let find8and12 = await this.musicRepository.find8and12();
        return await cloudfront(find8and12);
      }
      let twelve = await this.musicRepository.findOneByStatus12();
      return await cloudfront(twelve);
    } else if (x >= 0 && x <= 150 && y > 150 && y <= 225) {
      if (x == 0 && y == 225) {
        let find1and5 = await this.musicRepository.find1and5();
        return await cloudfront(find1and5);
      } else if (x == 150 && y == 225) {
        let find1256 = await this.musicRepository.find1256();
        return await cloudfront(find1256);
      }
      let five = await this.musicRepository.findOneByStatus5();
      return await cloudfront(five);
    } else if (x > 150 && x <= 300 && y > 150 && y <= 225) {
      if (x == 300 && y == 225) {
        let find2367 = await this.musicRepository.find2367();
        return await cloudfront(find2367);
      }
      let six = await this.musicRepository.findOneByStatus6();
      return await cloudfront(six);
    } else if (x > 300 && x <= 450 && y > 150 && y <= 225) {
      if (x == 450 && y == 225) {
        let find3478 = await this.musicRepository.find3478();
        return await cloudfront(find3478);
      }
      let seven = await this.musicRepository.findOnebyStatus7();
      return await cloudfront(seven);
    } else if (x > 450 && x <= 600 && y > 150 && y <= 225) {
      if (x == 600 && y == 225) {
        let find48 = await this.musicRepository.find48();
        return await cloudfront(find48);
      }
      let eight = await this.musicRepository.findOneByStatus8();
      return await cloudfront(eight);
    } else if (x >= 0 && x <= 150 && y > 225 && y <= 300) {
      if (x == 150 && y == 300) {
        let find1and2 = await this.musicRepository.find1and2();
        return await cloudfront(find1and2);
      }
      let one = await this.musicRepository.findOneByStatus1();
      return await cloudfront(one);
    } else if (x > 150 && x <= 300 && y > 225 && y <= 300) {
      if (x == 300 && y == 300) {
        let find2and3 = await this.musicRepository.find2and3();
        return await cloudfront(find2and3);
      }
      let two = await this.musicRepository.findOneByStatus2();
      return await cloudfront(two);
    } else if (x > 300 && x <= 450 && y > 225 && y <= 300) {
      if (x == 450 && y == 300) {
        let find3and4 = await this.musicRepository.find3and4();
        return await cloudfront(find3and4);
      }
      let three = await this.musicRepository.findOneByStatus3();
      return await cloudfront(three);
    } else if (x > 450 && x <= 600 && y > 225 && y <= 300) {
      let four = await this.musicRepository.findOneByStatus4();
      return await cloudfront(four);
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
    await cloudfrontfor(survey1);
    let randNum = await this.musicRepository.rand(0, survey1.length);
    let randomResult = survey1[randNum].dataValues;
    return randomResult;
  };
  findBySurvey2 = async () => {
    let survey2 = await this.musicRepository.findBySurvey2();
    if (survey2 == "") {
      throw new makeError({
        message: "status: 5 에 해당하는 음악이 없습니다.",
        code: 400,
      });
    }
    await cloudfrontfor(survey2);
    let randNum = await this.musicRepository.rand(0, survey2.length);
    let randomResult = survey2[randNum].dataValues;
    return randomResult;
  };
  findBySurvey3 = async () => {
    let survey3 = await this.musicRepository.findBySurvey3();
    if (survey3 == "") {
      throw new makeError({
        message: "status: 2,3,6 에 해당하는 음악이 없습니다.",
        code: 400,
      });
    }
    await cloudfrontfor(survey3);
    let randNum = await this.musicRepository.rand(0, survey3.length);
    let randomResult = survey3[randNum].dataValues;
    return randomResult;
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
