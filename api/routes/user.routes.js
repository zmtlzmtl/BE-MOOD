const express = require("express");
const router = express.Router();
const multer = require("multer");
const storage = multer.memoryStorage();

const authMiddleWare = require("../middlewares/auth.middleware");
const validationMiddleWare = require("../middlewares/validation.middleware");

const UserController = require("../controllers/user.controller");
const userController = new UserController();

//회원가입
router.post("/signup", validationMiddleWare.signUpCheck, userController.signUp);

//회원가입 시 아이디 확인
router.post("/signup/idcheck", userController.check);

//회원가입 시 닉네임 확인
router.post("/signup/nicknamecheck", userController.check);

//로그인
router.post("/login", validationMiddleWare.loginCheck, userController.login);

//로그인 카카오
router.post("/login/kakao", userController.kakaoLogin);

//리프레쉬 토큰으로 엑세스 토큰 재발급
router.post("/user/refresh", userController.refresh);

//유저 정보 조회
router.get("/user/userinfo", authMiddleWare, userController.userInfo);

//유저 좋아요 조회
router.get("/user/likelist", authMiddleWare, userController.likeList);

//유저 스크랩 조회
router.get("/user/scraplist", authMiddleWare, userController.scrapList);

//유저 플레이리스트 조회
router.get("/user/mylist", authMiddleWare, userController.myList);

//유저 리뷰 조회
router.get("/user/reviewlist", authMiddleWare, userController.reviewList);

//유저 프로필 변경
router.patch(
  "/user/uploadprofile",
  authMiddleWare,
  multer({ storage }).any(),
  userController.uploadProfile
);

//유저 닉네임 변경
router.patch(
  "/user/changenickname",
  validationMiddleWare.nicknameCheck,
  authMiddleWare,
  userController.changeNickname
);

//회원 탈퇴
router.delete(
  "/user/delete",
  validationMiddleWare.emailCheck,
  authMiddleWare,
  userController.deleteUser
);

//유저 인증 이메일 발송
router.post(
  "/user/email",
  validationMiddleWare.emailCheck,
  userController.mailSavePassword
);

//유저 인증 이메일 검사
router.post("/user/emailCheck", userController.mailCheck);

module.exports = router;
