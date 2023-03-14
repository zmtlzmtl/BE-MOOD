const { Musics } = require("../../db/models");
const { S3 } = require("aws-sdk");

class MusicRepository {
  constructor() {}
  create = async ({ musicTitle, musicContent, status, composer, musicUrl }) => {
    let music = await Musics.create({
      musicTitle,
      musicContent,
      status,
      composer,
      userId: 1,
      musicUrl,
    });
    return music;
  };

  findOneByMusicId = async ({ musicId }) => {
    let music = await Musics.findOne({
      where: { musicId },
      attributes: [
        "musicTitle",
        "musicContent",
        "composer",
        "musicUrl",
        "musicId",
      ],
    });
    return music;
  };

  findAllByComposer = async ({ composer }) => {
    let music = await Musics.findAll({
      where: composer,
      attributes: ["musicTitle", "musicContent"],
    });
    return music;
  };

  s3Upload = async (file) => {
    const s3 = new S3();
    const param = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: file.originalname,
      Body: file.buffer,
    };
    return s3.upload(param).promise();
  };

  findAllByStatus = async ({ status }) => {
    let mood = await Musics.findAll({
      where: { status: status },
    });
    return mood;
  };
}

module.exports = MusicRepository;
