const UserRepository = require("../repositories/user.repository");
const MusicRepository = require("../repositories/music.repository");
const bcrypt = require("bcrypt");
const axios = require("axios");
const jwt = require("jsonwebtoken");
const { cloudfrontfor } = require("../middlewares/cloudfront.middleware");
const { makeError } = require("../error");

class UserService {
  userRepository = new UserRepository();
  musicRepository = new MusicRepository();

  signUp = async (id, password, confirm, email, nickname) => {
    if (password !== confirm || !confirm) {
      throw new makeError({
        message: "비밀번호 확인란을 확인하세요",
        code: 400,
      });
    }
    const findEmail = await this.userRepository.findByEmail(email);
    if (findEmail) {
      throw new makeError({
        message: "해당 E-mail은 사용할수 없습니다.",
        code: 400,
      });
    }

    const hashedPw = await bcrypt.hash(password, 10);
    const user = await this.userRepository.signUp(
      id,
      hashedPw,
      email,
      nickname
    );
    return user;
  };

  login = async (id, password) => {
    const login = await this.userRepository.login(id);
    if (!login) {
      throw new makeError({ message: "로그인에 실패하였습니다.", code: 400 });
    }
    const isPasswordCorrect = await bcrypt.compare(password, login.password);
    if (!isPasswordCorrect) {
      throw new makeError({
        message: "비밀번호가 일치하지 않습니다.",
        code: 400,
      });
    }

    const accessToken = jwt.sign(
      { userId: login.userId },
      process.env.ACCESS_SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );
    const refreshToken = jwt.sign(
      { userId: login.userId },
      process.env.REFRESH_SECRET_KEY,
      { expiresIn: "1d" }
    );
    return { nickname: login.nickname, accessToken, refreshToken };
  };

  idCheck = async (id) => {
    const idCheck = await this.userRepository.idCheck(id);
    if (idCheck) {
      throw new makeError({ message: "중복된 아이디입니다.", code: 400 });
    }
    return;
  };

  nickNameCheck = async (nickname) => {
    const nickNameCheck = await this.userRepository.nickNameCheck(nickname);
    if (nickNameCheck) {
      throw new makeError({ message: "중복된 닉네임입니다.", code: 400 });
    }
    return;
  };

  getKakaoTokens = async (code) => {
    const KAKAO_OAUTH_TOKEN_API_URL = "https://kauth.kakao.com/oauth/token";
    const grant_type = "authorization_code";
    const client_id = process.env.CLIENT_ID;
    const redirect_uri = process.env.REDIRECT_URI;
    const authToken = await axios
      .post(
        `${KAKAO_OAUTH_TOKEN_API_URL}?grant_type=${grant_type}&client_id=${client_id}&redirect_uri=${redirect_uri}&code=${code}`,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
          },
        }
      )
      .then((res) => {
        return {
          access_token: res.data["access_token"],
          refresh_token: res.data["refresh_token"],
        };
      })
      .catch((error) => {
        console.error(error);
        throw new makeError({
          message: "카카오 로그인중에 axios요청중 문제가 발생하였습니다",
          code: 404,
        });
      });

    return authToken;
  };

  getUserInfo = async (authToken) => {
    if (!authToken) {
      throw new makeError({
        message: "카카카오 로그인중에 authToken을 읽지 못했습니다.",
        code: 404,
      });
    }

    const userData = await axios
      .get("https://kapi.kakao.com/v2/user/me", {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${authToken.access_token}`,
        },
      })
      .then((res) => {
        console.log("회원정보: ", res.data.properties);
        const { nickname, profile_image } = res.data.properties;
        const { email } = res.data.kakao_account;

        return {
          email: email,
          nickname: nickname,
          profile_image: profile_image,
        };
      })
      .catch((err) => {
        console.log("회원정보 err: ", err);
      });
    return userData;
  };

  makeTokenAndUserInfo = async (userData) => {
    const email = userData.email;
    const nickname = userData.nickname;
    const profile_image = userData.profile_image;

    const findUser = await this.userRepository.findByEmail(email);

    if (!findUser) {
      await this.userRepository.autoSocialSignup(
        email,
        nickname,
        profile_image
      );
    }

    const user = await this.userRepository.findByEmail(email);

    const access_token = jwt.sign(
      {
        userId: user.userId,
      },
      process.env.ACCESS_SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );

    const refresh_token = jwt.sign(
      {
        userId: user.userId,
      },
      process.env.REFRESH_SECRET_KEY,
      {
        expiresIn: "1d",
      }
    );

    return {
      access_token: access_token,
      refresh_token: refresh_token,
      nickname: user.nickname,
    };
  };

  userInfo = async (userId) => {
    const userInfo = await this.userRepository.userInfo(userId);

    return userInfo;
  };

  likeList = async (userId, page) => {
    const likeList = await this.userRepository.likeList(userId);
    const musicId = [];
    for (let i = 0; i < likeList.length; i++) {
      musicId.push(likeList[i].musicId);
    }
    const musicList = await this.userRepository.findMusic(musicId, page);
    await cloudfrontfor(musicList.musicList);
    return {
      musicList: musicList.musicList,
      musicCount: musicList.musicCount,
    };
  };

  scrapList = async (userId, page) => {
    const scrapList = await this.userRepository.scrapList(userId);
    const musicId = [];
    for (let i = 0; i < scrapList.length; i++) {
      musicId.push(scrapList[i].musicId);
    }
    const musicList = await this.userRepository.findMusic(musicId, page);
    await cloudfrontfor(musicList.musicList);
    return {
      musicList: musicList.musicList,
      musicCount: musicList.musicCount,
    };
  };
  reviewList = async (userId, page) => {
    const reviewData = await this.userRepository.findReview(userId);
    const recommentData = await this.userRepository.findRecomment(userId);

    const combinedData = reviewData.concat(recommentData);

    combinedData.sort((a, b) => {
      b.createdAt - a.createdAt;
    });

    const itemsPerPage = 10;
    const currentPage = page;

    const paginatedData = combinedData.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
    return { data: paginatedData, count: combinedData.length };
  };

  uploadImage = async (file) => {
    const data = await this.musicRepository.s3Upload(file);
    return data;
  };

  uploadProfile = async (userId, fileName) => {
    const userInfo = await this.userRepository.userInfo(userId);
    if (!userInfo) {
      throw new makeError({ message: "수정할 사용자가 없습니다", code: 400 });
    }
    await this.userRepository.uploadProfile(userId, fileName);
    return;
  };

  deleteUser = async (userId) => {
    await this.userRepository.deleteUser(userId);
    return;
  };

  findUser = async (userId) => {
    const user = await this.userRepository.findUser(userId);
    return user;
  };

  changeNickname = async (userId, nickname) => {
    const user = await this.userRepository.findUser(userId);
    if (user.nickname === nickname) {
      throw makeError({ message: "현재 닉네임과 같습니다.", code: 400 });
    }
    await this.userRepository.changeNickname(userId, nickname);
    return;
  };
}

module.exports = UserService;
