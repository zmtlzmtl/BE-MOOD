const express = require("express");
router = express.Router();
const multer = require("multer");
const storage = multer.memoryStorage();
const authMiddleWare = require("../middlewares/auth.middleware");
const UserController = require("../controllers/user.controller");
const userController = new UserController();

router.post("/signup", userController.signUp);
router.post("/login", userController.login);
router.post("/idcheck", userController.check);
router.post("/nicknamecheck", userController.check);
router.post("/kakao/login", userController.kakaoLogin);
router.get("/user/userinfo", authMiddleWare, userController.userInfo);
router.get("/user/likelist", authMiddleWare, userController.likeList);
router.get("/user/scraplist", authMiddleWare, userController.scrapList);
router.get("/user/reviewlist", authMiddleWare, userController.reviewList);
router.get("/user/recommentlist", authMiddleWare, userController.recommentList);
router.patch(
  "/user/uploadprofile",
  authMiddleWare,
  multer({ storage }).any(),
  userController.uploadProfile
);
router.delete("/user/delete", authMiddleWare, userController.deleteUser);

module.exports = router;
