'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Relationships', 'relationship', {
      type: Sequelize.STRING,
      defaultValue: "Parent"
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Revert the default value to the previous state (if needed)
    await queryInterface.changeColumn('Relationships', 'relationship', {
      type: Sequelize.INTEGER,
      defaultValue: null
    });
  }
};

