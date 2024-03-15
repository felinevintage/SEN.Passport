"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.changeColumn(
      "Assessments", // name of Source model
      "childId", // updated name of the key we're adding
      {
        type: Sequelize.INTEGER,
        references: {
          model: "Children", // name of Target model
          key: "id", // key in Target model that we're referencing
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      }
    );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.removeColumn("Assessments", "childId");
  },
};
