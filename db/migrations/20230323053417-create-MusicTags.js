"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("MusicTags", {
      musicTagId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      musicId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Musics",
          key: "musicId",
        },
        onDelete: "CASCADE",
      },
      tagId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("MusicTags");
  },
};
