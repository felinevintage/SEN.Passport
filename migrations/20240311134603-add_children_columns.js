"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        "Children", // table name
        "diagnoses", // new field name
        {
          type: Sequelize.TEXT,
          allowNull: true,
        }
      ),
      queryInterface.addColumn(
        "Children", // table name
        "school_support", // new field name
        {
          type: Sequelize.TEXT,
          allowNull: true,
        }
      ),
      queryInterface.addColumn(
        "Children", // table name
        "home_support", // new field name
        {
          type: Sequelize.TEXT,
          allowNull: true,
        }
      ),
      queryInterface.addColumn(
        "Children", // table name
        "specialists", // new field name
        {
          type: Sequelize.TEXT,
          allowNull: true,
        }
      ),
      queryInterface.addColumn(
        "Children", // table name
        "medication", // new field name
        {
          type: Sequelize.TEXT,
          allowNull: true,
        }
      ),
      queryInterface.addColumn(
        "Children", // table name
        "education", // new field name
        {
          type: Sequelize.STRING,
          allowNull: true,
        }
      ),
      queryInterface.addColumn(
        "Children", // table name
        "aids", // new field name
        {
          type: Sequelize.TEXT,
          allowNull: true,
        }
      ),
      queryInterface.addColumn(
        "Children", // table name
        "dateofbirth", // new field name
        {
          type: Sequelize.DATEONLY,
          allowNull: false,
        }
      ),
      queryInterface.addColumn(
        "Children", // table name
        "emergency_contact", // new field name
        {
          type: Sequelize.BIGINT,
          allowNull: false,
        }
      ),
    ]);
  },
};
