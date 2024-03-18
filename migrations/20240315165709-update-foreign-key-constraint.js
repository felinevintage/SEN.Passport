'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Children', 'avatarSeed', {
      type: Sequelize.STRING,
      allowNull: true, // Or false depending on whether the field is required
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Children', 'avatarSeed');
  }
};

