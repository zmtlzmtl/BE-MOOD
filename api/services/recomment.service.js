const ReCommentRepository = require("../repositories/reComment.repository");
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
        message: "알맞은 형식의 리뷰를 입력하세요.",
        code: 400,
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
        code: 400,
      });
    }
    return { message: "댓글이 생성되었습니다." };
  };
  //코멘트 조회하기
  getReviewComment = async ({ reviewId }) => {
    const existReview = await this.reviewRepository.getMusicOneReview({
      reviewId,
    });
    if (!existReview) {
      throw new makeError({
        message: "알맞은 형식의 리뷰를 입력하세요.",
        code: 400,
      });
    }
    const reComments = await this.reCommentRepository.getReviewComment({
      reviewId,
    });
    return reComments;
  };
  //코멘트 수정하기
  updateReviewComment = async ({ reCommentId, comment }) => {
    const existReComment = await this.reCommentRepository.existReComment({
      reCommentId,
    });
    if (!existReComment) {
      throw new makeError({
        message: "댓글을 찾을수 없습니다.",
        code: 400,
      });
    }
    await this.reCommentRepository.updateReviewComment({
      reCommentId,
      comment,
    });
    return { message: "댓글이 수정되었습니다." };
  };

  //코멘트 삭제하기
  deleteReviewComment = async ({ reCommentId }) => {
    const existReComment = await this.reCommentRepository.existReComment({
      reCommentId,
    });
    if (!existReComment) {
      throw new makeError({
        message: "댓글을 찾을수 없습니다.",
        code: 400,
      });
    }
    await this.reCommentRepository.deleteReviewComment({
      existReComment,
    });
    return { message: "댓글이 삭제되었습니다." };
  };
}

module.exports = ReCommentService;
