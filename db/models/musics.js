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
      this.hasMany(models.Likes, {
        sourceKey: "musicId",
        foreignKey: "musicId",
      });
      this.hasMany(models.Scraps, {
        sourceKey: "musicId",
        foreignKey: "musicId",
      });
      this.hasMany(models.Streamings, {
        sourceKey: "musicId",
        foreignKey: "musicId",
      });
      this.hasMany(models.MusicTags, {
        sourceKey: "musicId",
        foreignKey: "musicId",
      });
      this.belongsTo(models.Composers, {
        sourceKey: "composer",
        foreignKey: "composer",
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
      tag: {
        type: DataTypes.JSON,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Musics",
    }
  );
  return Musics;
};
