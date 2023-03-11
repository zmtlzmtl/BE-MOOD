const ReviewRepository = require("../repositories/review.repository");

class ReviewService {
  constructor() {
    this.reviewRepository = new ReviewRepository();
  }
  //리뷰 작성하기
  addMusicReview = async ({ userId, musicId, review }) => {
    await this.reviewRepository.addMusicReview({
      userId,
      musicId,
      review,
    });
    return { message: "리뷰가 생성되었습니다." };
  };

  //리뷰 조회하기
  getMusicReview = async ({ musicId }) => {
    const reviews = await this.reviewRepository.getMusicReview({
      musicId,
    });
    return reviews;
  };

  //리뷰 수정하기
  updateMusicReview = async ({ musicId, reviewId, review }) => {
    await this.reviewRepository.updateMusicReview({
      reviewId,
      review,
    });
    return { message: "리뷰가 수정되었습니다." };
  };

  //리뷰 삭제하기
  deleteMusicReview = async ({ musicId, reviewId }) => {
    await this.reviewRepository.deleteMusicReview({
      musicId,
      reviewId,
    });
    return { message: "리뷰가 삭제되었습니다." };
  };
}

module.exports = ReviewService;