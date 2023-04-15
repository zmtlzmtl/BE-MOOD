const { Likes } = require("../../db/models");

class LikeRepository {
  //좋아요 조회
  findLike = async (userId, musicId) => {
    const findLike = await Likes.findOne({ where: { userId, musicId } });
    return findLike;
  };

  //좋아요 생성
  makeLike = async (userId, musicId) => {
    await Likes.create({ userId, musicId });
    return;
  };

  //좋아요 삭제
  deleteLike = async (userId, musicId) => {
    await Likes.destroy({ where: { userId, musicId } });
    return;
  };
}

module.exports = LikeRepository;
