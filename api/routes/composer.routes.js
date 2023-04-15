const express = require("express");
const router = express.Router();

const ComposerController = require("../controllers/composer.controller");
const composerController = new ComposerController();

//작곡가 조회
router.get("/composer", composerController.getComposer);

//작곡가 태그 변경
router.patch("/composer", composerController.updateTagComposer);

module.exports = router;
