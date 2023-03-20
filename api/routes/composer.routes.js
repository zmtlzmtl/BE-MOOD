const express = require("express");
const router = express.Router();

const ComposerController = require("../controllers/composer.controller");
const composerController = new ComposerController();


router.get(
  "/composer",
  composerController.getComposer
);

module.exports = router;
