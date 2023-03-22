const ReCommentService = require("../services/recomment.service");

class ReCommentController {
  constructor() {
    this.reCommentService = new ReCommentService();
  }
  //코멘트 작성하기
  addReviewComment = async (req, res, next) => {
    const { userId } = res.locals.user;
    const { reviewId } = req.params;
    const { comment } = req.body;
    try {
      const addReComment = await this.reCommentService.addReviewComment({
        userId,
        reviewId,
        comment,
      });
      return res.status(201).json(addReComment);
    } catch (err) {
      next(err);
    }
  };
  //코멘트 조회하기
  getReviewComment = async (req, res, next) => {
    const { reviewId } = req.params;
    try {
      const reComments = await this.reCommentService.getReviewComment({
        reviewId,
      });
      return res.status(200).json({ reComments });
    } catch (err) {
      next(err);
    }
  };

  //코멘트 수정하기
  updateReviewComment = async (req, res, next) => {
    const { userId } = res.locals.user;
    const { reviewId, reCommentId } = req.params;
    const { comment } = req.body;
    try {
      const updateReComment = await this.reCommentService.updateReviewComment({
        userId,
        reviewId,
        reCommentId,
        comment,
      });
      return res.status(200).json(updateReComment);
    } catch (err) {
      next(err);
    }
  };

  //코멘트 삭제하기
  deleteReviewComment = async (req, res, next) => {
    const { userId } = res.locals.user;
    const { reviewId, reCommentId } = req.params;
    try {
      const deleteReComment = await this.reCommentService.deleteReviewComment({
        userId,
        reviewId,
        reCommentId,
      });
      return res.status(200).json(deleteReComment);
    } catch (err) {
      next(err);
    }
  };
}

module.exports = ReCommentController;
