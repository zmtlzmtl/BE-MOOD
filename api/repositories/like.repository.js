const { Likes } = require("../../db/models");

class LikeRepository {
  findLike = async (userId, musicId) => {
    const findLike = await Likes.findOne({ where: { userId, musicId } });
    return findLike;
  };
  countLike = async (musicId) => {
    const likeCount = await Likes.count({ where: { musicId } });
    return likeCount;
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
