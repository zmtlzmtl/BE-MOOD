const UserService = require("../services/user.service");
const jwt = require("jsonwebtoken");

class UserController {
  userService = new UserService();

  signUp = async (req, res, next) => {
    const { id, password, confirm, email, nickname } = req.body;
    try {
      const user = await this.userService.signUp(
        id,
        password,
        confirm,
        email,
        nickname
      );
      res.status(201).json({
        message: "회원가입을 성공하였습니다.",
        nickname: user.nickname,
      });
    } catch (error) {
      next(error);
    }
  };

  login = async (req, res, next) => {
    const { id, password } = req.body;
    try {
      const user = await this.userService.login(id, password);
      const { nickname, accessToken, refreshToken } = user;

      // res.cookie("accessToken", `Bearer ${accessToken}`, {
      //   httpOnly: true,
      //   secure: process.env.NODE_ENV === "production",
      //   sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
      // });
      // res.cookie("refreshToken", `Bearer ${refreshToken}`, {
      //   httpOnly: true,
      //   secure: process.env.NODE_ENV === "production",
      //   sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
      // });
      res.status(200).json({
        message: "로그인에 성공하였습니다.",
        accessToken,
        refreshToken,
        nickname,
      });
    } catch (error) {
      next(error);
    }
  };

  check = async (req, res, next) => {
    const { id, nickname } = req.body;
    try {
      if (!nickname) {
        await this.userService.idCheck(id);
        res.status(200).json({ message: "사용가능한 아이디 입니다." });
      }
      if (!id) {
        await this.userService.nickNameCheck(nickname);
        res.status(200).json({ message: "사용가능한 닉네임 입니다." });
      }
    } catch (error) {
      next(error);
    }
  };

  kakaoLogin = async (req, res, next) => {
    try {
      const { code } = req.body;
      const authToken = await this.userService.getKakaoTokens(code);
      const userData = await this.userService.getUserInfo(authToken);
      const { access_token, refresh_token, nickname } =
        await this.userService.makeTokenAndUserInfo(userData);

      res.status(200).send({
        message: "카카오 로그인 성공",
        access_token: access_token,
        refresh_token: refresh_token,
        nickname,
      });
    } catch (error) {
      next(error);
    }
  };

  userInfo = async (req, res, next) => {
    try {
      const { userId } = res.locals.user;
      const userInfo = await this.userService.userInfo(userId);
      res.status(200).json({
        message: "사용자 정보 조회를 성공했습니다.",
        userInfo,
      });
    } catch (error) {
      next(error);
    }
  };

  likeList = async (req, res, next) => {
    try {
      const { userId } = res.locals.user;
      const { page } = req.query;
      const likeList = await this.userService.likeList(userId, page);
      res.status(200).json({
        message: "사용자가 좋아요한 음악조회를 성공했습니다.",
        likeCount: likeList.musicCount,
        likeList: likeList.musicList,
      });
    } catch (error) {
      next(error);
    }
  };

  scrapList = async (req, res, next) => {
    try {
      const { userId } = res.locals.user;
      const { page } = req.query;
      const scrapList = await this.userService.scrapList(userId, page);
      res.status(200).json({
        message: "사용자가 스크랩한 음악조회를 성공했습니다.",
        scrapCount: scrapList.musicCount,
        scrapList: scrapList.musicList,
      });
    } catch (error) {
      next(error);
    }
  };

  reviewList = async (req, res, next) => {
    try {
      const { userId } = res.locals.user;
      const { page } = req.query;
      const data = await this.userService.reviewList(userId, page);
      res.status(200).json({
        message: "리뷰 조회 성공",
        reviewCount: data.count,
        reviewList: data.data,
      });
    } catch (error) {
      next(error);
    }
  };

  uploadProfile = async (req, res, next) => {
    try {
      const { userId } = res.locals.user;
      const file = req.files[0];

      if (!file || req.files.length !== 1) {
        res
          .status(400)
          .json({ message: "프로필사진은 1장만 업로드 가능합니다." });
      }
      if (file.mimetype.includes("image") === false) {
        res
          .status(400)
          .json({ massage: "이미지 파일 형식만 업로드 가능합니다." });
      }
      const data = await this.userService.uploadImage(file);

      const fileName = "https://d13uh5mnneeyhq.cloudfront.net/" + data.Key;
      await this.userService.uploadProfile(userId, fileName);
      res.status(200).json({ message: "업로드성공" });
    } catch (error) {
      next(error);
    }
  };

  deleteUser = async (req, res, next) => {
    try {
      const { userId } = res.locals.user;
      await this.userService.deleteUser(userId);
      res.status(200).json({ message: "회원탈퇴에 성공하였습니다" });
    } catch (error) {
      next(error);
    }
  };

  refresh = async (req, res, next) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({ message: "리프레시 토큰이 없습니다." });
    }

    try {
      const decodedToken = jwt.verify(
        refreshToken,
        process.env.REFRESH_SECRET_KEY
      );
      const userId = decodedToken.userId;

      const user = await this.userService.findUser(userId);
      if (!user) {
        return res
          .status(401)
          .json({ message: "토큰에 해당하는 사용자가 존재하지 않습니다." });
      }

      const newAccessToken = jwt.sign(
        { userId: userId },
        process.env.ACCESS_SECRET_KEY,
        { expiresIn: "1h" }
      );

      return res.status(200).json({
        message: "새로운 토큰이 발급되었습니다,",
        accessToken: newAccessToken,
      });
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        return res
          .status(401)
          .json({ message: "리프레시 토큰이 만료되었습니다." });
      } else {
        return res
          .status(401)
          .json({ message: "유효하지 않은 리프레시 토큰입니다." });
      }
    }
  };

  changeNickname = async (req, res, next) => {
    try {
      const { userId } = res.locals.user;
      const { nickname } = req.body;

      await this.userService.changeNickname(userId, nickname);
      res.status(200).json({ message: "닉네임 변경이 완료되었습니다." });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = UserController;
