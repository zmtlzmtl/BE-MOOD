"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class MusicTags extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Musics, {
        targetKey: "musicId",
        foreignKey: "musicId",
      });
      this.belongsTo(models.Tags, {
        targetKey: "tagId",
        foreignKey: "tagId",
      });
    }
  }
  MusicTags.init(
    {
      musicTagId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      musicId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      tagId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "MusicTags",
    }
  );
  return MusicTags;
};
