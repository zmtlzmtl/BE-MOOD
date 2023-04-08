const express = require("express");
router = express.Router();
const multer = require("multer");
const storage = multer.memoryStorage();
const authMiddleWare = require("../middlewares/auth.middleware");
const validationMiddleWare = require("../middlewares/validation.middleware");
const UserController = require("../controllers/user.controller");
const userController = new UserController();

router.post("/signup", validationMiddleWare.signUpCheck, userController.signUp);
router.post("/signup/idcheck", userController.check);
router.post("/signup/nicknamecheck", userController.check);
router.post("/login", validationMiddleWare.loginCheck, userController.login);
router.post("/login/kakao", userController.kakaoLogin);
router.post("/user/refresh", userController.refresh);
router.get("/user/userinfo", authMiddleWare, userController.userInfo);
router.get("/user/likelist", authMiddleWare, userController.likeList);
router.get("/user/scraplist", authMiddleWare, userController.scrapList);
router.get("/user/reviewlist", authMiddleWare, userController.reviewList);
router.patch(
  "/user/uploadprofile",
  authMiddleWare,
  multer({ storage }).any(),
  userController.uploadProfile
);
router.patch(
  "/user/changenickname",
  authMiddleWare,
  userController.changeNickname
);
router.delete("/user/delete", authMiddleWare, userController.deleteUser);
router.get("/user/email", userController.mailCheck);

module.exports = router;
