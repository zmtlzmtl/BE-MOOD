const { Composers } = require("../../db/models/");

class ComposerRepository {
  constructor() {}
  //코멘트 조회하기
  getComposer = async ({ composer }) => {
    const result = await Composers.findOne({
      where: { composer },
    });
    return result;
  };
}

module.exports = ComposerRepository;
