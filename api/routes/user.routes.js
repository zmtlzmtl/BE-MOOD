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
router.get("/user/mylist", authMiddleWare, userController.myList);
router.get("/user/reviewlist", authMiddleWare, userController.reviewList);
router.patch(
  "/user/uploadprofile",
  authMiddleWare,
  multer({ storage }).any(),
  userController.uploadProfile
);
router.patch(
  "/user/changenickname",
  validationMiddleWare.nicknameCheck,
  authMiddleWare,
  userController.changeNickname
);
router.delete(
  "/user/delete",
  validationMiddleWare.emailCheck,
  authMiddleWare,
  userController.deleteUser
);
router.post(
  "/user/email",
  validationMiddleWare.emailCheck,
  userController.mailSavePassword
);
router.post(
  "/user/emailCheck",
  userController.mailCheck
);

module.exports = router;
