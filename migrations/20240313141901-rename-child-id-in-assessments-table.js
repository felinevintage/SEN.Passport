'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('Assessments', 'child_id', 'childId');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('Assessments', 'childId', 'child_id');
  }
};
