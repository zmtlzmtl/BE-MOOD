const express = require("express");
router = express.Router();
const UserController = require("../controllers/user.controller");
const userController = new UserController();

router.post("/signup", userController.signUp);
router.post("/login", userController.login);
router.post("/idcheck", userController.check);
router.post("/nicknamecheck", userController.check);

router.get("/kakao", userController.kakaoLogin);
router.get("/kakao/callback", userController.kakaoCallback);

module.exports = router;
