'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      "Documents", // name of Source model
      "child_id", // name of the key we're adding
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

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      "Documents", // name of Source model
      "child_id" // key we want to remove
    );
  },
};