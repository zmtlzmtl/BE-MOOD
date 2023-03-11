const { Users } = require("../../db/models");

class UserRepository {
  signUp = async (id, password, email, nickname) => {
    await Users.create({id, password, email, nickname});
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
}

module.exports = UserRepository;
