const ReviewService = require("../services/review.service");
const logger = require("../../db/config/logger");

class ReviewController {
  constructor() {
    this.reviewService = new ReviewService();
  }
  //리뷰 작성
  addMusicReview = async (req, res, next) => {
    const { userId } = res.locals.user;
    const { musicId } = req.params;
    const { review } = req.body;
    try {
      const addreview = await this.reviewService.addMusicReview({
        userId,
        musicId,
        review,
      });
      return res.status(201).json(addreview);
    } catch (err) {
      next(err);
    }
  };

  //리뷰 조회
  getMusicReview = async (req, res, next) => {
    const { musicId } = req.params;
    try {
      const reviews = await this.reviewService.getMusicReview({
        musicId,
      });
      return res.status(200).json({ reviews });
    } catch (err) {
      next(err);
    }
  };

  //리뷰 수정
  updateMusicReview = async (req, res, next) => {
    const { userId } = res.locals.user;
    const { musicId, reviewId } = req.params;
    const { review } = req.body;
    try {
      const updateReview = await this.reviewService.updateMusicReview({
        userId,
        musicId,
        reviewId,
        review,
      });
      return res.status(200).json(updateReview);
    } catch (err) {
      next(err);
    }
  };

  //리뷰 삭제
  deleteMusicReview = async (req, res, next) => {
    const { userId } = res.locals.user;
    const { musicId, reviewId } = req.params;
    try {
      const deleteReview = await this.reviewService.deleteMusicReview({
        userId,
        musicId,
        reviewId,
      });
      return res.status(200).json(deleteReview);
    } catch (err) {
      next(err);
    }
  };
}

module.exports = ReviewController;
