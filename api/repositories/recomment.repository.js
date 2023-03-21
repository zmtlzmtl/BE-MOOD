const { Users, ReComments } = require("../../db/models/");

class ReCommnetRepository {
  constructor() {}
  //코멘트 작성하기
  addReviewComment = async ({ userId, reviewId, comment }) => {
    const result = await ReComments.create({ userId, reviewId, comment });
    return result;
  };

  //코멘트 조회하기
  getReviewComment = async ({ reviewId }) => {
    const result = await ReComments.findAll({
      where: { reviewId },
      include: [
        {
          model: Users,
          attributes: ["nickname"],
        },
      ],
      group: ["ReComments.userId"],
      order: [["createdAt", "ASC"]],
    });
    return result;
  };

  //코멘트 상세조회
  existReComment = async ({ reCommentId }) => {
    const result = await ReComments.findOne({
      where: { reCommentId },
    });
    return result;
  };
  //코멘트 수정
  updateReviewComment = async ({ reCommentId, comment }) => {
    await ReComments.update({ comment }, { where: { reCommentId } });
    return;
  };
  //코멘트 삭제
  deleteReviewComment = async ({ reCommentId }) => {
    await ReComments.destroy({ where: { reCommentId } });
    return;
  };
}

module.exports = ReCommnetRepository;
