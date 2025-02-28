"use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // User.hasMany(models.Post, { as: 'posts' });
    }
  }

  Users.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Users",
      timestamps: true,
      defaultScope: {
        exclude: ["created_at", "updated_at"],
      },
    }
  );

  return Users;
};
