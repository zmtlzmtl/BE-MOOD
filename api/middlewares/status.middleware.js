const jwt = require("jsonwebtoken");
const { Users } = require("../../db/models");

module.exports = async (req, res, next) => {
  const { authorization } = req.headers;
  const [tokenType, token] = (authorization ?? "").split(" ");
  try {
    if (token) {
      const decodedToken = jwt.verify(token, process.env.KEY);
      const userId = decodedToken.userId;
      const user = await Users.findOne({ where: { userId } });

      res.locals.user = user;
    }
    next();
  } catch (error) {
    next(error);
  }
};
