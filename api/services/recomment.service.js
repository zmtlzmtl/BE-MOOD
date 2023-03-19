const ReviewRepository = require("../repositories/review.repository");
const MusicRepository = require("../repositories/music.repository");
const { makeError } = require("../error");

class ReviewService {
  constructor() {
    this.musicRepository = new MusicRepository();
    this.reviewRepository = new ReviewRepository();
  } //리뷰 작성하기
  addMusicReview = async ({ userId, musicId, mood, review }) => {
    const existMusic = await this.musicRepository.findOneByMusicId({ musicId });
    if (!existMusic) {
      throw new makeError({
        message: "존재하지 않는 게시글입니다.",
        code: 404,
      });
    }
    const result = await this.reviewRepository.addMusicReview({
      userId,
      musicId,
      mood,
      review,
    });
    if (!result) {
      throw new makeError({
        message: "리뷰 작성에 실패하였습니다.",
        code: 500,
      });
    }
    return { message: "리뷰가 생성되었습니다." };
  }; //리뷰 조회하기

  getMusicReview = async ({ musicId }) => {
    const reviews = await this.reviewRepository.getMusicReview({
      musicId,
    });
    return reviews;
  }; //리뷰 수정하기 //유저정보 들어와야함

  updateMusicReview = async ({ musicId, reviewId, mood, review }) => {
    const existMusic = await this.musicRepository.findOneByMusicId({ musicId });
    if (!existMusic) {
      throw new makeError({
        message: "존재하지 않는 게시글입니다.",
        code: 404,
      });
    }
    const existReview = await this.reviewRepository.getMusicOneReview({
      reviewId,
    });
    if (!existReview) {
      throw new makeError({
        message: "리뷰를 찾을 수 없습니다.",
        code: 404,
      });
    }
    await this.reviewRepository.updateMusicReview({
      reviewId,
      mood,
      review,
    });
    return { message: "리뷰가 수정되었습니다." };
  }; //리뷰 삭제하기 //유저정보 들어와야함

  deleteMusicReview = async ({ musicId, reviewId }) => {
    const existMusic = await this.musicRepository.findOneByMusicId({ musicId });
    if (!existMusic) {
      throw new makeError({
        message: "존재하지 않는 게시글입니다.",
        code: 404,
      });
    }
    const existReview = await this.reviewRepository.getMusicOneReview({
      reviewId,
    });
    if (!existReview) {
      throw new makeError({
        message: "리뷰를 찾을 수 없습니다.",
        code: 404,
      });
    }
    await this.reviewRepository.deleteMusicReview({
      reviewId,
    });
    return { message: "리뷰가 삭제되었습니다." };
  };
}

module.exports = ReviewService;