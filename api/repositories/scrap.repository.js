const { Scraps } = require("../../db/models");

class ScrapRepository {
  findScrap = async (userId, musicId) => {
    const findLike = await Scraps.findOne({ where: { userId, musicId } });
    return findLike;
  };
  makeScrap = async (userId, musicId) => {
    await Scraps.create({ userId, musicId });
    return;
  };
  deleteScrap = async (userId, musicId) => {
    await Scraps.destroy({ where: { userId, musicId } });
    return;
  };
}

module.exports = ScrapRepository;
