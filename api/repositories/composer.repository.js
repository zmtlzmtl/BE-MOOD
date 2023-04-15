const { Composers } = require("../../db/models/");

class ComposerRepository {
  constructor() {}
  
  //작곡가 조회
  getComposer = async ({ composer }) => {
    const result = await Composers.findOne({
      where: { composer },
    });
    return result;
  };

  //작곡가 태그 변경
  updateTagComposer = async ({ composer, tag }) => {
    await Composers.update({ tag }, { where: { composer } });
    return;
  };
}

module.exports = ComposerRepository;
