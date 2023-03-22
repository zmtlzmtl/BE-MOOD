const ComposerService = require("../services/composer.service");

class ComposerController {
  constructor() {
    this.composerService = new ComposerService();
  }
  //코멘트 조회하기
  getComposer = async (req, res, next) => {
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
}

module.exports = ComposerController;
