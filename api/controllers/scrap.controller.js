const ScrapService = require("../services/scrap.service");

class ScrapController {
  scrapService = new ScrapService();

  scrap = async (req, res, next) => {
    try {
      const { userId } = res.locals.user;
      const { musicId } = req.params;

      const scrap = await this.scrapService.scrap(userId, musicId);
      const { code, message } = scrap;
      res.status(code).json({ message });
    } catch (error) {
      next(error);
    }
  };

  scrapStatus = async (req, res, next) => {
    try {
      const { userId } = res.locals.user;
      const { musicId } = req.params;

      const scrapStatus = await this.scrapService.scrapStatus(userId, musicId);
      res
        .status(200)
        .json({ message: "좋아요 조회에 성공했습니다.", scrapStatus });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = ScrapController;
