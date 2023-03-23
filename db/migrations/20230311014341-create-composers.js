"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Composers", {
      composerId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      composer: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      describe: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      tag: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      imageUrl: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Composers");
  },
};
