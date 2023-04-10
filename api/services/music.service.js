const musicRepository = require("../repositories/music.repository");
const LikeRepository = require("../repositories/like.repository");
const ScrapRepository = require("../repositories/scrap.repository");
const UserRepository = require("../repositories/user.repository");
const ComposerRepository = require("../repositories/composer.repository");
const { makeError } = require("../error");
const {
  cloudfront,
  cloudfrontfor,
} = require("../middlewares/cloudfront.middleware");
class MusicService {
  constructor() {
    this.musicRepository = new musicRepository();
  }
  likeRepository = new LikeRepository();
  scrapRepository = new ScrapRepository();
  composerRepository = new ComposerRepository();
  userRepository = new UserRepository();

  create = async ({
    musicTitle,
    musicContent,
    status,
    composer,
    tag,
    fileName,
  }) => {
    const musicUrl = "https://d13uh5mnneeyhq.cloudfront.net/" + fileName;
    const music = await this.musicRepository.create({
      musicTitle,
      musicContent,
      status,
      composer,
      musicUrl,
    });
    const musicId = music.musicId;
    const tagList = tag.split(",");
    for (const tag of tagList) {
      await this.musicRepository.createTag({ musicId, tag });
    }
    return music;
  };
  findOneByMusicId = async ({ musicId }) => {
    let music = await this.musicRepository.findOneByMusicId({ musicId });
    if (music == null) {
      throw new makeError({
        message: "게시글 상세 조회를 실패하였습니다.",
        code: 400,
      });
    }
    return music;
  };
  findAllByComposer = async ({ userId, composer }) => {
    let music = await this.musicRepository.findAllByComposer({ composer });
    if (music == "") {
      throw new makeError({
        message: "적절하지 않은 파라미터 요청입니다.",
        code: 400,
      });
    }
    for (let i = 0; i < music.music.length; i++) {
      const like = await this.likeRepository.findLike(
        userId,
        music.music[i].musicId
      );
      music.music[i].dataValues.likeStatus = !!like;
      const scrap = await this.scrapRepository.findScrap(
        userId,
        music.music[i].musicId
      );
      music.music[i].dataValues.scrapStatus = !!scrap;
    }
    return music;
  };
  mood = async ({ userId, x, y }) => {
    let status;
    let message;
    if (x >= 0 && x <= 25 && y >= 0 && y <= 25) {
      if (x == 25 && y == 25) {
        status = [9, 10, 13, 14];
        message = "당신은 조금의 불만족을 느끼는 것 같아요.";
      } else if (x == 25 && y == 0) {
        status = [13, 14];
        message = "당신은 조금 우울해 보입니다..";
      } else if (x == 0 && y == 25) {
        status = [9, 13];
        message = "당신은 우울해 보입니다.";
      }
      status = 13;
      message = "당신은 약간 우울해 보입니다.";
    } else if (x > 25 && x <= 50 && y >= 0 && y <= 25) {
      if (x == 50 && y == 25) {
        status = [10, 11, 14, 15];
        message = "당신은 조금 불만족을 느끼는 것 같아요.";
      } else if (x == 50 && y == 0) {
        status = [14, 15];
        message = "당신은 불만족을 느끼는 것 같아요.";
      }
      status = 14;
      message = "당신은 약간의 불만족을 느끼는 것 같아요.";
    } else if (x > 50 && x <= 75 && y >= 0 && y <= 25) {
      if (x == 75 && y == 25) {
        status = [11, 12, 15, 16];
        message = "당신은 조금의 만족감을 느끼는 것 같아요.";
      } else if (x == 75 && y == 0) {
        status = [15, 16];
        message = "당신은 만족감을 느끼는 것 같아요.";
      }
      status = 15;
      message = "당신은 약간의 만족감을 느끼는 것 같아요.";
    } else if (x > 75 && x <= 100 && y >= 0 && y <= 25) {
      if (x == 100 && y == 25) {
        status = [12, 16];
        message = "당신은 기분이 좋아 보입니다.";
      }
      status = 16;
      message = "당신은 약간 기분이 좋아 보입니다.";
    } else if (x >= 0 && x <= 25 && y > 25 && y <= 50) {
      if (x == 0 && y == 50) {
        status = [5, 9];
        message = "당신은 조금 불안해하는 모습이네요.";
      } else if (x == 25 && y == 50) {
        status = [5, 6, 9, 10];
        message = "당신은 불안해하는 모습이네요.";
      }
      status = 9;
      message = "당신은 상당히 불안해하는 모습이네요.";
    } else if (x > 25 && x <= 50 && y > 25 && y <= 50) {
      if (x == 50 && y == 50) {
        status = [6, 7, 10, 11];
        message = "당신은 불편해 보입니다.";
      }
      status = 10;
      message = "당신은 조금 불편해 보입니다.";
    } else if (x > 50 && x <= 75 && y > 25 && y <= 50) {
      if (x == 75 && y == 50) {
        status = [7, 8, 11, 12];
        message = "당신은 편안해 보입니다..";
      }
      status = 11;
      message = "당신은 조금 편안해 보입니다.";
    } else if (x > 75 && x <= 100 && y > 25 && y <= 50) {
      if (x == 100 && y == 50) {
        status = [8, 12];
        message = "당신은 만족해하는 모습이네요.";
      }
      status = 12;
      message = "당신은 상당히 만족해하는 모습이네요.";
    } else if (x >= 0 && x <= 25 && y > 50 && y <= 75) {
      if (x == 0 && y == 75) {
        status = [1, 5];
        message = "당신은 화가 나 보입니다.";
      } else if (x == 25 && y == 75) {
        status = [1, 2, 5, 6];
        message = "당신은 분노를 느끼고 계시네요.";
      }
      status = 5;
      message = "당신은 정말 화가 나 보입니다.";
    } else if (x > 25 && x <= 50 && y > 50 && y <= 75) {
      if (x == 50 && y == 75) {
        status = [2, 3, 6, 7];
        message = "당신은 조금 편안해 보입니다.";
      }
      status = 6;
      message = "당신은 조금 불편해 보입니다.";
    } else if (x > 50 && x <= 75 && y > 50 && y <= 75) {
      if (x == 75 && y == 75) {
        status = [3, 4, 7, 8];
        message = "당신은 정말 행복해 보입니다.";
      }
      status = 7;
      message = "당신은 기쁜 모습이네요.";
    } else if (x > 75 && x <= 100 && y > 50 && y <= 75) {
      if (x == 100 && y == 75) {
        status = [4, 8];
        message = "당신은 행복해 보입니다.";
      }
      status = 8;
      message = "당신은 정말 행복해 보입니다.";
    } else if (x >= 0 && x <= 25 && y > 75 && y <= 100) {
      if (x == 25 && y == 100) {
        status = [1, 2];
        message = "당신은 정말 화가 나 보입니다.";
      }
      status = 1;
      message = "당신은 엄청난 분노를 느끼고 계시네요.";
    } else if (x > 25 && x <= 50 && y > 75 && y <= 100) {
      if (x == 50 && y == 100) {
        status = [2, 3];
        message = "당신은 상당히 화가 난 것 같아요.";
      }
      status = 2;
      message = "당신은 굉장히 화가 나 보입니다.";
    } else if (x > 50 && x <= 75 && y > 75 && y <= 100) {
      if (x == 75 && y == 100) {
        status = [3, 4];
        message = "당신은 정말 행복해 보입니다.";
      }
      status = 3;
      message = "당신은 굉장히 기뻐하는 것 같아요.";
    } else if (x > 75 && x <= 100 && y > 75 && y <= 100) {
      status = 4;
      message = "당신은 기쁨을 느끼고 계시네요!";
    }
    if (!userId) {
      const musicData = await this.musicRepository.findOneByStatus(status);
      return { musicData, message };
    } else {
      const musicData = await this.musicRepository.findOneByStatus(status);
      const date = `${new Date().getMonth() + 1}월${new Date().getDate()}일 `;
      const newMassage = `${date}` + message;
      await this.userRepository.updateUserStatus(userId, newMassage);
      return { musicData, message };
    }
  };

  findByKeyword = async ({ userId, keyword }) => {
    const music = await this.musicRepository.findByKeyword({ keyword });
    if (keyword.length === 0) {
      throw new makeError({
        message: "해당하는 keyword가 없습니다.",
        code: 400,
      });
    }
    if (music.composerSong.length === 0 && music.musicTitle.length === 0) {
      return { message: "해당하는 keyword가 없습니다." };
    }
    await Promise.all(
      music.composerSong.map(async (item) => {
        const musicId = item.dataValues.musicId;
        const like = await this.likeRepository.findLike(userId, musicId);
        item.dataValues.likeStatus = !!like;
        const scrap = await this.scrapRepository.findScrap(userId, musicId);
        item.dataValues.scrapStatus = !!scrap;
      }),
      music.musicTitle.map(async (item) => {
        const musicId = item.dataValues.musicId;
        const like = await this.likeRepository.findLike(userId, musicId);
        item.dataValues.likeStatus = !!like;
        const scrap = await this.scrapRepository.findScrap(userId, musicId);
        item.dataValues.scrapStatus = !!scrap;
      })
    );
    return music;
  };

  likeChart = async (userId) => {
    const cacheKey = "likeChart";

    const cachedResult = await this.musicRepository.getChartData(cacheKey);
    if (cachedResult) {
      // 캐시에 데이터가 있으면 반환 전에 likeStatus를 업데이트
      await Promise.all(
        cachedResult.map(async (item) => {
          const Like = await this.likeRepository.findLike(userId, item.musicId);
          item.likeStatus = !!Like;
        })
      );
      return cachedResult;
    } else {
      const likeChart = await this.musicRepository.likeChart();

      await Promise.all(
        likeChart.map(async (item) => {
          const Like = await this.likeRepository.findLike(userId, item.musicId);
          item.dataValues.likeStatus = !!Like;
        })
      );

      await this.musicRepository.setCache(likeChart, cacheKey);
      return likeChart;
    }
  };

  streamingChart = async () => {
    const streamingChart = await this.musicRepository.streamingChart();
    return streamingChart;
  };

  sendStreaming = async (userId, musicId) => {
    const makeStreaming = await this.musicRepository.sendStreaming(
      userId,
      musicId
    );
    if (!makeStreaming) {
      throw makeError({
        message: "스트리밍을 생성하지 못했습니다.",
        code: 400,
      });
    }
    return;
  };
}
module.exports = MusicService;
