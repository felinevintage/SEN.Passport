'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Relationships", {
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
        allowNull: false,
      },
      child_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Children",
          key: "id",
        },
        allowNull: false,
      },
      access: {
        type: Sequelize.INTEGER,
     
        allowNull: false,
      },
      relationship: {
        type: Sequelize.STRING,
        
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Relationships");
  },
};