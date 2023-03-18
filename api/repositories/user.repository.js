const { Users, UserInfos } = require("../../db/models");

class UserRepository {
  signUp = async (id, password, email, nickname) => {
    await Users.create({ id, password, email, nickname });
    return;
  };

  findUser = async (email) => {
    const findUser = await Users.findOne({ where: { email } });

    return findUser;
  };

  login = async (id, password) => {
    const findUser = await Users.findOne({ where: { id, password } });
    return findUser;
  };

  idCheck = async (id) => {
    const idCheck = await Users.findOne({ where: { id } });
    return idCheck;
  };

  nickNameCheck = async (nickname) => {
    const nickNameCheck = await Users.findOne({ where: { nickname } });
    return nickNameCheck;
  };

  findByEmail = async (email) => {
    const user = await Users.findOne({
      where: {
        email: email,
      },
    });

    return user;
  };

  // 테이블에 없으면 자동으로 회원가입(DB에 저장)
  autoSocialSignup = async (email, nickname, profile_image) => {
    const auto_signup_kakao_user = await Users.create({
      id: email,
      email: email,
      nickname: nickname,
    });

    const auto_signup_kakao_user_image = await UserInfos.create({
      src: profile_image,
      userId: auto_signup_kakao_user.userId,
    });

    return {
      user_id: auto_signup_kakao_user.user_id,
      email: auto_signup_kakao_user.email,
      nickname: auto_signup_kakao_user.nickname,
      profile_image: auto_signup_kakao_user_image.src,
    };
  };
}

module.exports = UserRepository;
