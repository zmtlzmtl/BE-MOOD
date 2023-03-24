const jwt = require("jsonwebtoken");
const { Users } = require("../../db/models");

module.exports = async (req, res, next) => {
  const { authorization } = req.headers;
  const [tokenType, token] = (authorization ?? "").split(" ");

  if (token) {
    const { userId } = jwt.verify(token, process.env.JWT_KEY);

    const user = await Users.findOne({ where: { userId } });

    res.locals.user = user;
  }
  next();
};
