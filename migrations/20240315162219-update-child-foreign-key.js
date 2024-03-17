'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {

await queryInterface.changeColumn('Children', 'childId', {
  type: Sequelize.INTEGER,
  allowNull: true, // Allow NULL values for childId
  references: {
    model: 'Children', // Assuming 'Children' is the table name
    key: 'id'
  },
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE' // Set childId to NULL when associated child is deleted
});
},

down: async (queryInterface, Sequelize) => {
// Revert changes
await queryInterface.changeColumn('Children', 'childId', {
  type: Sequelize.INTEGER,
  allowNull: false,
  references: {
    model: 'Children',
    key: 'id'
  },
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE'
});
}
};
