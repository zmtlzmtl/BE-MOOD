"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Musics", {
      musicId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      musicTitle: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      musicContent: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      musicUrl: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      status: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      composer: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: "Composers",
          key: "composer",
        },
        onDelete: "CASCADE",
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Musics");
  },
};
