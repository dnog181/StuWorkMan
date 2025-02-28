"use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Posts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  Posts.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.JSON,
        allowNull: true,
      },
    },
    {
      sequelize, // sequelize实例，用于数据库连接
      modelName: "Posts", // 模型名称，对应数据库中的表名
      timestamps: true, // 启用时间戳，会自动添加 created_at 和 updated_at 字段
    }
  );

  return Posts;
};
