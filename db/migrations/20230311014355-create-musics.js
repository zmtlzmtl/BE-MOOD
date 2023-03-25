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
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "userId",
        },
        onDelete: "CASCADE",
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
      tag: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      status: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      composer: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      fileName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      tag: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      condition: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Musics");
  },
};
