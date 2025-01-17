"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Assessments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Assessments.belongsTo(models.Children);
    }
  }
  Assessments.init(
    {
      assessment_type: DataTypes.STRING,
      date: DataTypes.DATEONLY,
      results_doc: DataTypes.BLOB,
      childId: DataTypes.BIGINT,
    },
    {
      sequelize,
      modelName: "Assessments",
    }
  );
  return Assessments;
};
