const { Composers } = require("../../db/models/");

class ComposerRepository {
  constructor() {}
  //작곡가 조회하기
  getComposer = async ({ composer }) => {
    const result = await Composers.findOne({
      where: { composer },
    });
    return result;
  };

  //작곡가 수정하기
  updateTagComposer = async ({ composer, tag }) => {
    await Composers.update({ tag }, { where: { composer } });
    return;
  };
}

module.exports = ComposerRepository;
