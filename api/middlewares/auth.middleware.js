const jwt = require("jsonwebtoken");
const { Users } = require("../../db/models");

module.exports = async (req, res, next) => {
  const { authorization } = req.headers;
  // console.log("리퀘스트 쿠키", req.cookies);
  // const authorization = req.cookies.accessToken;
  // console.log("받아오는 토큰값", authorization);
  const [tokenType, token] = (authorization ?? "").split(" ");
  // console.log("타입", tokenType);
  // console.log("토큰", token);

  if (tokenType !== "Bearer" || !token) {
    return res.status(401).json({
      message: "토큰 타입이 일치하지 않거나, 토큰이 존재하지 않습니다.",
    });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.ACCESS_SECRET_KEY);
    const userId = decodedToken.userId;
    const user = await Users.findOne({ where: { userId: userId } });

    if (!user) {
      return res
        .status(401)
        .json({ message: "토큰에 해당하는 사용자가 존재하지 않습니다." });
    }

    res.locals.user = user;
    next();
  } catch (error) {
    res.clearCookie("authorization"); // 인증에 실패 할 경우 쿠키 삭제

    if (error instanceof jwt.TokenExpiredError) {
      return res.status(419).json({
        message: "엑세스 토큰이 만료되었습니다.",
      });
    } else {
      return res.status(401).json({
        message: "유효하지 않은 토큰입니다.",
      });
    }
  }
};
