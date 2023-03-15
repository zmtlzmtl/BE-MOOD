const { Users } = require("../../db/models");

class UserRepository {
  signUp = async (id, password, email, nickname) => {
    await Users.create({ id, password, email, nickname });
    return;
  };

  findUser = async (email) => {
    const findUser = await Users.findOne({ where: { email } });
    // console.log(findUser)
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
}

module.exports = UserRepository;
