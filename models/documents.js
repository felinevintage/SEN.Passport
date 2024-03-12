'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Documents extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Documents.belongsTo(models.Children);
    }
  }
  Documents.init({
    doc_name: DataTypes.STRING,
    document: DataTypes.BLOB
  }, {
    sequelize,
    modelName: 'Documents',
  });
  return Documents;
};