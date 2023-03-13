const UserService = require("../services/user.service");
const jwt = require("jsonwebtoken");

class UserController {
  userService = new UserService();

  signUp = async (req, res, next) => {
    const { id, password, confirm, email, nickname } = req.body;
    try {
      await this.userService.signUp(id, password, confirm, email, nickname);
      res.status(201).json({ message: "회원가입을 성공하였습니다." });
    } catch (error) {
      next(error);
    }
  };

  login = async (req, res, next) => {
    const { id, password } = req.body;
    try {
      const user = await this.userService.login(id, password);
      const token = jwt.sign({ userId: user.userId }, process.env.KEY, {
        expiresIn: "1h",
      });

      res
        .status(200)
        .json({ message: "로그인에 성공하였습니다.", token: `${token}` });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = UserController;
