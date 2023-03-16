"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Musics extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Users, {
        targetKey: "userId",
        foreignKey: "userId",
      });
      this.hasMany(models.Reviews, {
        sourceKey: "musicId",
        foreignKey: "musicId",
      });
    }
  }
  Musics.init(
    {
      musicId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      musicTitle: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      musicContent: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      musicUrl: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      composer: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      fileName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Musics",
    }
  );
  return Musics;
};
