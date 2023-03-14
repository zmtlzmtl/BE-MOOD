'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Chats extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Musics, {
        sourceKey: "userId",
        foreignKey: "userId",
      });

      this.hasMany(models.Reviews, {
        sourceKey: "userId",
        foreignKey: "userId",
      });
    }
  }
  Chats.init({
    chatId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    roomId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    nickname: {  //소셜로그인이 어떨지 모르겠네 migration도
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    massege: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }, {
    sequelize,
    modelName: 'Chats',
  });
  return Chats;
};