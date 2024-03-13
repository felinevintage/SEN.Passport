'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('Events', 'child_id', 'childId');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('Events', 'childId', 'child_id');
  }
};
