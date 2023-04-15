const { Scraps } = require("../../db/models");

class ScrapRepository {
  //스크랩 상태 찾기
  findScrap = async (userId, musicId) => {
    const findLike = await Scraps.findOne({ where: { userId, musicId } });
    return findLike;
  };

  //스크랩 하기
  makeScrap = async (userId, musicId) => {
    await Scraps.create({ userId, musicId });
    return;
  };

  //스크랩 취소
  deleteScrap = async (userId, musicId) => {
    await Scraps.destroy({ where: { userId, musicId } });
    return;
  };
}

module.exports = ScrapRepository;
