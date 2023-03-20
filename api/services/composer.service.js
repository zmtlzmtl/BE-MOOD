const ComposerRepository = require("../repositories/composer.repository");
const { makeError } = require("../error");

class ComposerService {
  constructor() {
    this.composerRepository = new ComposerRepository();
  }
  //코멘트 조회하기
  getComposer = async ({ composer }) => {
    const result = await this.composerRepository.getComposer({
      composer,
    });
    if (!result) {
      throw new makeError({
        message: "해당하는 작곡가가 없습니다.",
        code: 400,
      });
    }
    return result;
  };
}

module.exports = ComposerService;
