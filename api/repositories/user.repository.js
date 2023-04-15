const {
  Users,
  UserInfos,
  Likes,
  Scraps,
  Chats,
  Musics,
  Reviews,
  ReComments,
  EmailChecks,
} = require("../../db/models");
const sequelize = require("sequelize");

class UserRepository {
  //회원가입
  signUp = async (id, password, email, nickname) => {
    const makeUser = await Users.create({ id, password, email, nickname });
    await UserInfos.create({
      userId: makeUser.userId,
      profileUrl:
        "https://d13uh5mnneeyhq.cloudfront.net/Heart_fill_white copy.png",
    });
    return makeUser;
  };

  //유저Id 조회
  findUser = async (userId) => {
    const findUser = await Users.findOne({ where: { userId } });

    return findUser;
  };

  //로그인
  login = async (id) => {
    const findUser = await Users.findOne({ where: { id } });
    return findUser;
  };

  //회원가입 시 아이디 확인(2차)
  idCheck = async (id) => {
    const idCheck = await Users.findOne({ where: { id } });
    return idCheck;
  };

  //회원가입 시 닉네임 확인(2차)
  nickNameCheck = async (nickname) => {
    const nickNameCheck = await Users.findOne({ where: { nickname } });
    return nickNameCheck;
  };

  //회원가입 시 id 중복확인
  findById = async (id) => {
    const user = await Users.findOne({ where: { id } });
    return user;
  };

  //회원가입 시 닉네임 중복확인
  findByNickname = async (nickname) => {
    const user = await Users.findOne({ where: { nickname } });
    return user;
  };

  //회원가입 시 email 중복확인
  findByEmail = async (email) => {
    const user = await Users.findOne({
      where: {
        email: email,
      },
    });

    return user;
  };

  //테이블에 없으면 자동으로 회원가입(DB에 저장)
  autoSocialSignup = async (email, nickname, profile_image) => {
    const auto_signup_kakao_user = await Users.create({
      id: email,
      email: email,
      nickname: nickname,
    });

    const auto_signup_kakao_user_image = await UserInfos.create({
      userId: auto_signup_kakao_user.userId,
      profileUrl: profile_image,
    });

    return {
      userId: auto_signup_kakao_user.user_id,
      email: auto_signup_kakao_user.email,
      nickname: auto_signup_kakao_user.nickname,
      profileUrl: auto_signup_kakao_user_image.profileUrl,
    };
  };

  //유저 정보 조회
  userInfo = async (userId) => {
    const findUser = await Users.findOne({ where: { userId } });
    const findUserInfo = await UserInfos.findOne({ where: { userId } });

    return {
      userId: findUser.userId,
      nickname: findUser.nickname,
      profileUrl: findUserInfo.profileUrl,
      myStatus: findUserInfo.myStatus,
    };
  };

  //유저 좋아요 조회
  likeList = async (userId) => {
    const likeList = await Likes.findAll({ where: { userId } });
    return likeList;
  };

  //유저 스크랩 조회
  scrapList = async (userId) => {
    const scrapList = await Scraps.findAll({ where: { userId } });
    return scrapList;
  };

  //좋아요, 스크랩 시 음악 검색
  findMusic = async (musicId, page) => {
    const musicList = await Musics.findAll({
      where: { musicId },
      attributes: [
        "musicTitle",
        "musicContent",
        "composer",
        "musicUrl",
        "musicId",
      ],
      limit: 10,
      offset: (page - 1) * 10,
      order: [["musicId", "DESC"]],
    });
    const musicCount = await Musics.count({ where: { musicId } });
    return { musicList, musicCount };
  };

  //유저 플레이리스트 조회(카운트 추가)
  findMyMusic = async (musicId) => {
    const musicList = await Musics.findAll({
      where: { musicId },
      attributes: [
        "musicTitle",
        "musicContent",
        "composer",
        "musicUrl",
        "musicId",
      ],
      order: [["musicId", "DESC"]],
    });
    const musicCount = await Musics.count({ where: { musicId } });
    return { musicList, musicCount };
  };

  //유저 프로필 변경
  uploadProfile = async (userId, fileName) => {
    await UserInfos.update({ profileUrl: fileName }, { where: { userId } });
    return;
  };

  //닉네임 변경
  changeNickname = async ({ userId, nickname, beforeNickname }) => {
    await Users.update({ nickname }, { where: { userId } });
    await Chats.update({ nickname }, { where: { nickname: beforeNickname } });
    return;
  };

  //유저 리뷰 검색
  findReview = async (userId) => {
    const reviewData = await Reviews.findAll({
      where: { userId },
      attributes: ["musicId", "reviewId", "review", "createdAt"],
      order: [[sequelize.literal("reviewId"), "DESC"]],
    });
    return reviewData;
  };

  //유저 대댓글 검색
  findRecomment = async (userId) => {
    const recommentData = await ReComments.findAll({
      where: { userId },
      attributes: [
        "reCommentId",
        "reviewId",
        ["comment", "review"],
        "createdAt",
        [sequelize.col("Review.musicId"), "musicId"],
      ],
      include: [
        {
          model: Reviews,
          as: "Review",
          attributes: [],
        },
      ],
      order: [[sequelize.literal("reCommentId"), "DESC"]],
    });
    return recommentData;
  };

  //회원 탈퇴
  deleteUser = async (userId) => {
    await Users.destroy({ where: { userId } });
    await UserInfos.destroy({ where: { userId } });
    return;
  };

  //회원 감정상태 변경
  updateUserStatus = async (userId, message) => {
    await UserInfos.update({ myStatus: message }, { where: { userId } });
    return;
  };

  //유저 인증 이메일 발송
  savePassword = async ({ email, hashedPw }) => {
    await EmailChecks.destroy({ where: { email } });
    await EmailChecks.create({ email, password: hashedPw });
    return;
  };

  ///유저 인증 이메일 검사
  mailCheck = async ({ email }) => {
    const check = await EmailChecks.findOne({ where: { email } });
    return check;
  };
}

module.exports = UserRepository;
