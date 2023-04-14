const Joi = require("joi");
const { makeError } = require("../error");

const Validation = {
  //회원가입 check
  signUpCheck: async (req, res, next) => {
    const check = Joi.object().keys({
      id: Joi.string()
        .regex(/^(?=.*[a-z])(?=.*\d)[a-z\d]{4,}$/)
        .required()
        .error(
          new makeError({
            message: "id값이 잘못되었습니다.",
            code: 400,
          })
        ),
      password: Joi.string()
        .regex(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])[a-zA-Z0-9!@#$%^&*(),.?":{}|<>]{8,}$/
        )
        .required()
        .error(
          new makeError({
            message: "비밀번호값이 잘못되었습니다.",
            code: 400,
          })
        ),
      confirm: Joi.string()
        .regex(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])[a-zA-Z0-9!@#$%^&*(),.?":{}|<>]{8,}$/
        )
        .required()
        .error(
          new makeError({
            message: "비밀번호 확인값이 잘못되었습니다.",
            code: 400,
          })
        ),
      email: Joi.string()
        .email()
        .required()
        .error(
          new makeError({
            message: "Email형식이 아닙니다.",
            code: 400,
          })
        ),
      nickname: Joi.string()
        .trim()
        .min(2)
        .max(8)
        .required()
        .error(
          new makeError({
            message: "닉네임은 2글자 이상 ~ 8글자 이하 이어야 합니다.",
            code: 400,
          })
        ),
    });
    try {
      await check.validateAsync(req.body);
    } catch (error) {
      next(error);
    }
    next();
  },
  //로그인 check
  loginCheck: async (req, res, next) => {
    const check = Joi.object().keys({
      id: Joi.string()
        .regex(/^(?=.*[a-z])(?=.*\d)[a-z\d]{4,}$/)
        .required()
        .error(
          new makeError({
            message: "id값이 잘못되었습니다.",
            code: 400,
          })
        ),
      password: Joi.string()
        .regex(
          /^(?=.*[!@#$%^&*(),.?":{}|<>])[a-zA-Z0-9!@#$%^&*(),.?":{}|<>]{8,}$/
        )
        .required()
        .error(
          new makeError({
            message: "비밀번호값이 잘못되었습니다.",
            code: 400,
          })
        ),
    });
    try {
      await check.validateAsync(req.body);
    } catch (error) {
      next(error);
    }
    next();
  },
  //musicId check
  paramGetCheck: async (req, res, next) => {
    const check = Joi.object().keys({
      musicId: Joi.number()
        .required()
        .error(
          new makeError({
            message: "알맞은 형식의 게시글을 입력하세요.",
            code: 400,
          })
        ),
    });
    try {
      await check.validateAsync(req.params);
    } catch (error) {
      next(error);
    }
    next();
  },
  paramCheck: async (req, res, next) => {
    const check = Joi.object().keys({
      musicId: Joi.number()
        .required()
        .error(
          new makeError({
            message: "알맞은 형식의 게시글을 입력하세요.",
            code: 400,
          })
        ),
      reviewId: Joi.number()
        .required()
        .error(
          new makeError({
            message: "알맞은 형식의 댓글을 입력하세요.",
            code: 400,
          })
        ),
    });
    try {
      await check.validateAsync(req.params);
    } catch (error) {
      next(error);
    }
    next();
  },
  reviewCheck: async (req, res, next) => {
    const check = Joi.object().keys({
      review: Joi.string()
        .required()
        .trim()
        .min(1)
        .error(
          new makeError({
            message: "알맞은 형식의 리뷰를 입력하세요.",
            code: 400,
          })
        ),
    });
    try {
      await check.validateAsync(req.body);
    } catch (error) {
      next(error);
    }
    next();
  },
  nicknameCheck: async (req, res, next) => {
    const check = Joi.object().keys({
      nickname: Joi.string()
        .trim() //여백 없애기
        .min(2)
        .max(8)
        .required()
        .error(
          new makeError({
            message: "닉네임은 2글자 이상 ~ 8글자 이하 이어야 합니다.",
            code: 400,
          })
        ),
    });
    try {
      await check.validateAsync(req.body);
    } catch (error) {
      next(error);
    }
    next();
  },

  emailCheck: async (req, res, next) => {
    const check = Joi.object().keys({
      email: Joi.string()
        .email()
        .required()
        .error(
          new makeError({
            message: "Email형식이 아닙니다.",
            code: 400,
          })
        ),
    });
    try {
      await check.validateAsync(req.body);
    } catch (error) {
      next(error);
    }
    next();
  },
  commentCheck: async (req, res, next) => {
    const check = Joi.object().keys({
      comment: Joi.string()
        .required()
        .trim()
        .min(1)
        .error(
          new makeError({
            message: "알맞은 형식의 리뷰를 입력하세요.",
            code: 400,
          })
        ),
    });
    try {
      await check.validateAsync(req.body);
    } catch (error) {
      next(error);
    }
    next();
  },
};

module.exports = Validation;
