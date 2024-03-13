'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Children extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Children.belongsToMany(models.Users, {through: "Relationships"});
    }
  }
  Children.init({
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    diagnoses: DataTypes.TEXT,
    school_support: DataTypes.TEXT,
    home_support: DataTypes.TEXT,
    specialists: DataTypes.TEXT,
    medication: DataTypes.TEXT,
    educaiton: DataTypes.STRING,
    aids: DataTypes.TEXT,
    dateofbirth: DataTypes.DATEONLY,
    emergency_contact: DataTypes.BIGINT,
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  }, {
    sequelize,
    modelName: 'Children',
  });
  return Children;
};