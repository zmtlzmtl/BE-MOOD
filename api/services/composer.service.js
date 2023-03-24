const ComposerRepository = require("../repositories/composer.repository");
const { makeError } = require("../error");

class ComposerService {
  constructor() {
    this.composerRepository = new ComposerRepository();
  }
  //작곡가 조회하기
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

  //작곡가 수정하기
  updateTagComposer = async ({ composer, tag }) => {
    await this.composerRepository.updateTagComposer({
      composer,
      tag,
    });
    return { message: "태그가 수정되었습니다." };
  };
}
module.exports = ComposerService;
