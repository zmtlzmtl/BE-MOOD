const { Musics, Composers } = require("../../db/models");
const { S3 } = require("aws-sdk");
const Sequelize = require("sequelize");
const { Op } = require("sequelize");

class MusicRepository {
  constructor() {}
  rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  create = async ({
    musicTitle,
    musicContent,
    status,
    composer,
    musicUrl,
    fileName,
  }) => {
    let music = await Musics.create({
      musicTitle,
      musicContent,
      status,
      composer,
      userId: 1,
      musicUrl,
      fileName,
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
        "fileName",
      ],
    });
    return music;
  };
  findAllByComposer = async ({ composer }) => {
    let music = await Musics.findAll({
      where: composer,
      attributes: ["musicTitle", "musicContent", "fileName", "musicUrl"],
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
      order: Sequelize.literal("rand()"),
      where: { status },
      attributes: [
        "musicId",
        "musicTitle",
        "musicContent",
        "composer",
        "musicUrl",
        "fileName",
      ],
    });
    return mood;
  };
  findBySurvey1 = async () => {
    let survey1 = await Musics.findAll({
      where: { status: [4, 7, 8] },
      attributes: ["musicId", "musicTitle", "composer", "musicUrl", "fileName"],
    });
    return survey1;
  };
  findBySurvey2 = async () => {
    let survey2 = await Musics.findAll({
      where: { status: 5 },
      attributes: ["musicId", "musicTitle", "composer", "musicUrl", "fileName"],
    });
    return survey2;
  };
  findBySurvey3 = async () => {
    let survey3 = await Musics.findAll({
      where: { status: [2, 3, 6] },
      attributes: ["musicId", "musicTitle", "composer", "musicUrl", "fileName"],
    });
    return survey3;
  };
  findByKeyword = async ({ keyword }) => {
    console.log(keyword);
    const composerInfo = await Composers.findOne({
      where: {
        composer: { [Op.like]: `%${keyword}%` },
      },
    });
    const composerSong = await Musics.findAll({
      where: {
        composer: { [Op.like]: `%${keyword}%` },
      },
      order: [["musicTitle", "DESC"]],
    });
    const musicTitle = await Musics.findAll({
      where: {
        musicTitle: { [Op.like]: `%${keyword}%` },
      },
      order: [["musicTitle", "DESC"]],
    });

    const search = { composerInfo, composerSong, musicTitle };
    return search;
  };
}

module.exports = MusicRepository;
