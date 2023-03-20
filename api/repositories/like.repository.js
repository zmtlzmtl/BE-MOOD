const { Likes } = require("../../db/models");

class LikeRepository {
  findLike = async (userId, musicId) => {
    const findLike = Likes.findOne({ where: { userId, musicId } });
    return findLike;
  };
  makeLike = async (userId, musicId) => {
    Likes.create({ userId, musicId });
    return;
  };
  deleteLike = async (userId, musicId) => {
    Likes.destroy({ where: { userId, musicId } });
    return;
  };
}

module.exports = LikeRepository;
