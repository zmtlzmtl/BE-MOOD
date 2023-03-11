const { Reviews } = require("../../db/models/");

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
      order: [["createdAt", "ASC"]],
    });
    return result;
  };

  //리뷰 수정하기
  updateMusicReview = async ({ reviewId, review }) => {
    await Reviews.update({ review }, { where: { reviewId } });
    return;
  };
  deleteMusicReview = async ({ reviewId }) => {
    await Reviews.destroy({ where: { reviewId } });
    return;
  };
}

module.exports = ReviewRepository;
