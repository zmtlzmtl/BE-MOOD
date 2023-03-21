const ReCommentRepository = require("../repositories/recomment.repository");
const ReviewRepository = require("../repositories/review.repository");
const { makeError } = require("../error");

class ReCommentService {
  constructor() {
    this.reviewRepository = new ReviewRepository();
    this.reCommentRepository = new ReCommentRepository();
  }
  //코멘트 작성하기
  addReviewComment = async ({ userId, reviewId, comment }) => {
    const existReview = await this.reviewRepository.getMusicOneReview({
      reviewId,
    });
    if (!existReview) {
      throw new makeError({
        message: "존재하지 않는 리뷰입니다.",
        code: 404,
      });
    }
    const result = await this.reCommentRepository.addReviewComment({
      userId,
      reviewId,
      comment,
    });
    if (!result) {
      throw new makeError({
        message: "리뷰 작성에 실패하였습니다.",
        code: 500,
      });
    }
    return { message: "리뷰에 대한 댓글이 생성되었습니다." };
  };
  //코멘트 조회하기
  getReviewComment = async ({ reviewId }) => {
    const reComments = await this.reCommentRepository.getReviewComment({
      reviewId,
    });
    const count = reComments.length;
    const rows = reComments.map((data) => {
      return {
        nickname: data.User.nickname,
        comment: data.comment,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
      };
    });
    return { count, rows };
  };
  //코멘트 수정하기
  updateReviewComment = async ({ userId, reCommentId, comment }) => {
    const existReComment = await this.reCommentRepository.existReComment({
      reCommentId,
    });
    if (!existReComment) {
      throw new makeError({
        message: "존재하지 않는 댓글입니다.",
        code: 404,
      });
    }
    if (userId !== existReComment.userId) {
      throw new makeError({
        message: "권한이 없습니다.",
        code: 403,
      });
    }
    await this.reCommentRepository.updateReviewComment({
      reCommentId,
      comment,
    });
    return { message: "리뷰에 대한 댓글이 수정되었습니다." };
  };

  //코멘트 삭제하기
  deleteReviewComment = async ({ userId, reCommentId }) => {
    const existReComment = await this.reCommentRepository.existReComment({
      reCommentId,
    });
    if (!existReComment) {
      throw new makeError({
        message: "존재하지 않는 댓글입니다.",
        code: 404,
      });
    }
    if (userId !== existReComment.userId) {
      throw new makeError({
        message: "권한이 없습니다.",
        code: 403,
      });
    }
    await this.reCommentRepository.deleteReviewComment({
      reCommentId,
    });
    return { message: "리뷰에 대한 댓글이 삭제되었습니다." };
  };
}

module.exports = ReCommentService;
