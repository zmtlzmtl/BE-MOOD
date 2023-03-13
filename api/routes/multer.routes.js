const express = require("express");
const multer = require("multer");
const { S3 } = require("aws-sdk");
const { memoryStorage } = require("multer");
const { Musics } = require("../../db/models/");
router = express.Router();

const storage = multer.memoryStorage(); //require buffer

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
    let userId = 1;
    let Url = result.Location;
    let { musicTitle, musicContent, status } = req.body;
    await Musics.create({
      musicUrl: Url,
      musicTitle,
      musicContent,
      status,
      userId,
    });
    res.json();
  } catch (err) {
    console.log(err);
    return res.status(400).json({ err: err.message });
  }
});

module.exports = router;
