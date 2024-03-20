const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Relationships extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Children.belongsToMany(models.Users, {
        through: Relationships,
      });
      models.Users.belongsToMany(models.Children, {
        through: Relationships,
      });
    }
  }
  Relationships.init(
    {
      access: DataTypes.INTEGER,
      relationship: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Relationships",
    }
  );

  return Relationships;
};
