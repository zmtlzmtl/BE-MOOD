const ComposerService = require("../services/composer.service");
const logger = require("../../db/config/logger");

class ComposerController {
  constructor() {
    this.composerService = new ComposerService();
  }
  //작곡가 조회하기
  getComposer = async (req, res, next) => {
    logger.info(`작곡가 조회하기`);
    const { composer } = req.query;
    try {
      const data = await this.composerService.getComposer({
        composer,
      });
      return res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  };

  //작곡가 태그 변경하기
  updateTagComposer = async (req, res, next) => {
    logger.info(`작곡가 태그 변경하기`);
    const { composer } = req.query;
    const { tag } = req.body;
    try {
      const updateTag = await this.composerService.updateTagComposer({
        composer,
        tag,
      });
      return res.status(200).json(updateTag);
    } catch (err) {
      next(err);
    }
  };
}

module.exports = ComposerController;
