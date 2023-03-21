const { Musics, Composers } = require("../../db/models");
const { S3 } = require("aws-sdk");
const Sequelize = require("sequelize");
const { Op, where } = require("sequelize");

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
  //ㅡㅡㅡㅡㅡ교점 없음
  findOneByStatus1 = async () => {
    let mood = await Musics.findOne({
      order: Sequelize.literal("rand()"),
      where: { status: 1 },
    });
    return mood;
  };
  findOneByStatus2 = async () => {
    let mood = await Musics.findOne({
      order: Sequelize.literal("rand()"),
      where: { status: 2 },
    });
    return mood;
  };
  findOneByStatus3 = async () => {
    let mood = await Musics.findOne({
      order: Sequelize.literal("rand()"),
      where: { status: 3 },
    });
    return mood;
  };
  findOneByStatus4 = async () => {
    let mood = await Musics.findOne({
      order: Sequelize.literal("rand()"),
      where: { status: 4 },
    });
    return mood;
  };
  findOneByStatus5 = async () => {
    let mood = await Musics.findOne({
      order: Sequelize.literal("rand()"),
      where: { status: 5 },
    });
    return mood;
  };
  findOneByStatus6 = async () => {
    let mood = await Musics.findOne({
      order: Sequelize.literal("rand()"),
      where: { status: 6 },
    });
    return mood;
  };
  findOneByStatus7 = async () => {
    let mood = await Musics.findOne({
      order: Sequelize.literal("rand()"),
      where: { status: 7 },
    });
    return mood;
  };
  findOneByStatus8 = async () => {
    let mood = await Musics.findOne({
      order: Sequelize.literal("rand()"),
      where: { status: 8 },
    });
    return mood;
  };
  findOneByStatus9 = async () => {
    let mood = await Musics.findOne({
      order: Sequelize.literal("rand()"),
      where: { status: 9 },
    });
    return mood;
  };
  findOneByStatus10 = async () => {
    let mood = await Musics.findOne({
      order: Sequelize.literal("rand()"),
      where: { status: 10 },
    });
    return mood;
  };
  findOneByStatus11 = async () => {
    let mood = await Musics.findOne({
      order: Sequelize.literal("rand()"),
      where: { status: 11 },
    });
    return mood;
  };
  findOneByStatus12 = async () => {
    let mood = await Musics.findOne({
      order: Sequelize.literal("rand()"),
      where: { status: 12 },
    });
    return mood;
  };
  findOneByStatus13 = async () => {
    let mood = await Musics.findOne({
      order: Sequelize.literal("rand()"),
      where: { status: 13 },
    });
    return mood;
  };
  findOneByStatus14 = async () => {
    let mood = await Musics.findOne({
      order: Sequelize.literal("rand()"),
      where: { status: 14 },
    });
    return mood;
  };
  findOneByStatus15 = async () => {
    let mood = await Musics.findOne({
      order: Sequelize.literal("rand()"),
      where: { status: 15 },
    });
    return mood;
  };
  findOneByStatus16 = async () => {
    let mood = await Musics.findOne({
      order: Sequelize.literal("rand()"),
      where: { status: 16 },
    });
    return mood;
  };
  //ㅡㅡㅡㅡㅡㅡㅡㅡ4개 교점
  find9101314 = async () => {
    let mood = await Musics.findOne({
      order: Sequelize.literal("rand()"),
      where: { status: [9, 10, 13, 14] },
    });
    return mood;
  };
  find10111415 = async () => {
    let mood = await Musics.findOne({
      order: Sequelize.literal("rand()"),
      where: { status: [10, 11, 14, 15] },
    });
    return mood;
  };
  find11121516 = async () => {
    let mood = await Musics.findOne({
      order: Sequelize.literal("rand()"),
      where: { status: [11, 12, 15, 16] },
    });
    return mood;
  };
  find56910 = async () => {
    let mood = await Musics.findOne({
      order: Sequelize.literal("rand()"),
      where: { status: [5, 6, 9, 10] },
    });
    return mood;
  };
  find671011 = async () => {
    let mood = await Musics.findOne({
      order: Sequelize.literal("rand()"),
      where: { status: [6, 7, 10, 11] },
    });
    return mood;
  };
  find781112 = async () => {
    let mood = await Musics.findOne({
      order: Sequelize.literal("rand()"),
      where: { status: [7, 8, 11, 12] },
    });
    return mood;
  };
  find1256 = async () => {
    let mood = await Musics.findOne({
      order: Sequelize.literal("rand()"),
      where: { status: [1, 2, 5, 6] },
    });
    return mood;
  };
  find2367 = async () => {
    let mood = await Musics.findOne({
      order: Sequelize.literal("rand()"),
      where: { status: [2, 3, 6, 7] },
    });
    return mood;
  };
  find3478 = async () => {
    let mood = await Musics.findOne({
      order: Sequelize.literal("rand()"),
      where: { status: [3, 4, 7, 8] },
    });
    return mood;
  };
  //ㅡㅡㅡ교점 2개ㅡㅡㅡㅡㅡㅡ
  find13and14 = async () => {
    let mood = await Musics.findOne({
      order: Sequelize.literal("rand()"),
      where: { status: [13, 14] },
    });
    return mood;
  };
  find14and15 = async () => {
    let mood = await Musics.findOne({
      order: Sequelize.literal("rand()"),
      where: { status: [14, 15] },
    });
    return mood;
  };
  find15and16 = async () => {
    let mood = await Musics.findOne({
      order: Sequelize.literal("rand()"),
      where: { status: [15, 16] },
    });
    return mood;
  };
  find1and2 = async () => {
    let mood = await Musics.findOne({
      order: Sequelize.literal("rand()"),
      where: { status: [1, 2] },
    });
    return mood;
  };
  find2and3 = async () => {
    let mood = await Musics.findOne({
      order: Sequelize.literal("rand()"),
      where: { status: [2, 3] },
    });
    return mood;
  };
  find3and4 = async () => {
    let mood = await Musics.findOne({
      order: Sequelize.literal("rand()"),
      where: { status: [3, 4] },
    });
    return mood;
  };
  //세로 교점(아래), 가로 교점(위)
  find12and16 = async () => {
    let mood = await Musics.findOne({
      order: Sequelize.literal("rand()"),
      where: { status: [12, 16] },
    });
    return mood;
  };
  find9and13 = async () => {
    let mood = await Musics.findOne({
      order: Sequelize.literal("rand()"),
      where: { status: [9, 13] },
    });
    return mood;
  };
  find5and9 = async () => {
    let mood = await Musics.findOne({
      order: Sequelize.literal("rand()"),
      where: { status: [5, 9] },
    });
    return mood;
  };
  find8and12 = async () => {
    let mood = await Musics.findOne({
      order: Sequelize.literal("rand()"),
      where: { status: [8, 12] },
    });
    return mood;
  };
  find1and5 = async () => {
    let mood = await Musics.findOne({
      order: Sequelize.literal("rand()"),
      where: { status: [1, 5] },
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
