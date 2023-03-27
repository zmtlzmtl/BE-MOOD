const { Likes } = require("../../db/models");

class LikeRepository {
  findLike = async (userId, musicId) => {
    const findLike = await Likes.findOne({ where: { userId, musicId } });
    return findLike;
  };
  makeLike = async (userId, musicId) => {
    await Likes.create({ userId, musicId });
    return;
  };
  deleteLike = async (userId, musicId) => {
    await Likes.destroy({ where: { userId, musicId } });
    return;
  };
}

module.exports = LikeRepository;
