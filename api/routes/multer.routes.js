const express = require("express");
const multer = require("multer");
const { s3Upload } = require("../services/multerService");
router = express.Router();

const storage = multer.memoryStorage()

router.post("/upload", multer(storage).any(), async (req,res) => {
    try{
        const text = req.body
        const results = await s3Upload(req.files, text);
        console.log(results);
        return res.status(200).json({results});
    }catch(err){
        console.log(err);
        return res.status(400).json({err:err.message});
    }
});

module.exports = router;
