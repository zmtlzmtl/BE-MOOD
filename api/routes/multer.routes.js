const express = require("express");
const multer = require("multer");
const { S3 } = require("aws-sdk");
const { Musics } = require("../../db/models/");
router = express.Router();

const storage = multer.memoryStorage();

s3Upload = async (file) => {
  const s3 = new S3();
  const param = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: file.originalname,
    Body: file.buffer,
  };
  return s3.upload(param).promise();
};

router.post("/music", multer({ storage }).any(), async (req, res) => {
  try {
    const file = req.files[0];
    const result = await s3Upload(file);
    let Url = result.Location;
    let userId = 1;
    let { musicTitle, musicContent, status, composer } = req.body;
    await Musics.create({
      musicUrl: Url,
      musicTitle,
      musicContent,
      status,
      composer,
      userId,
    });
    return res.status(200).json({ msg: "생성완료" });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ msg: "생성실패" });
  }
});

router.get("/music/:musicId", async (req, res) => {
  try {
    const { musicId } = req.params;
    const project = await Musics.findOne({
      where: { musicId },
      attributes: ["musicTitle", "musicContent", "composer", "musicUrl"],
    });
    res.status(200).json({ data: project });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ err: err.message });
  }
});

module.exports = router;
