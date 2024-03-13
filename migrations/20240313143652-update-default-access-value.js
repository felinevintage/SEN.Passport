'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Relationships', 'access', {
      type: Sequelize.INTEGER,
      defaultValue: 1
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Revert the default value to the previous state (if needed)
    await queryInterface.changeColumn('Relationships', 'access', {
      type: Sequelize.INTEGER,
      defaultValue: null
    });
  }
};

