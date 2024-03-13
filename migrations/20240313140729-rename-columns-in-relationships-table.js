'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('Relationships', 'child_id', 'childId');
    await queryInterface.renameColumn('Relationships', 'user_id', 'userId');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('Relationships', 'childId', 'child_id');
    await queryInterface.renameColumn('Relationships', 'userId', 'user_id');
  }
};

