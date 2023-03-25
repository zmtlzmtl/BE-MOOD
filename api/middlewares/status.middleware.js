const jwt = require("jsonwebtoken");
const { Users } = require("../../db/models");
const { v4: uuidv4 } = require("uuid");

module.exports = async (req, res, next) => {
  const { authorization } = req.headers;
  const [tokenType, token] = (authorization ?? "").split(" ");
  try {
    if (token) {
      const decodedToken = jwt.verify(token, process.env.KEY);
      const userId = decodedToken.userId;
      const user = await Users.findOne({ where: { userId } });

      res.locals.user = user;
    } else {
      res.locals.user = { userId: uuidv4() };
    }
    next();
  } catch (error) {
    next(error);
  }
};
