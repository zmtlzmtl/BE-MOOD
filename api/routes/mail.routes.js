const express = require("express");
const router = express.Router();

const MailController = require("../controllers/mail.controller");
const mailController = new MailController();

router.get("/user/email", mailController.mailCheck);

module.exports = router;
