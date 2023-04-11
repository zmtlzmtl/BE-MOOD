const { Users, Reviews } = require("../../db/models/");

class ReviewRepository {
  constructor() {}

  //리뷰 작성하기
  addMusicReview = async ({ userId, musicId, review }) => {
    const result = await Reviews.create({ userId, musicId, review });
    return result;
  };

  //리뷰 조회하기
  getMusicReview = async ({ musicId }) => {
    const result = await Reviews.findAll({
      where: { musicId },
      include: [
        {
          model: Users,
          attributes: ["nickname"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });
    return result;
  };
  //리뷰 상세조회
  getMusicOneReview = async ({ reviewId }) => {
    const result = await Reviews.findOne({
      where: { reviewId },
    });
    return result;
  };
  //리뷰 수정하기
  updateMusicReview = async ({ reviewId, review }) => {
    await Reviews.update({ review }, { where: { reviewId } });
    return;
  };

  //리뷰 삭제하기
  deleteMusicReview = async ({ reviewId }) => {
    await Reviews.destroy({ where: { reviewId } });
    return;
  };
}

module.exports = ReviewRepository;
