'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('Documents', 'child_id', 'childId');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('Documents', 'childId', 'child_id');
  }
};

