/* eslint valid-jsdoc: "off" */

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = (appInfo) => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {});
  config.sequelize = {
    dialect: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "root",
    database: "egg_test",
    timezone: "+8:00",
    define: {
      //model配置
      timestamps: true, //create,update,delete时间戳
      paranoid: true, //软删除
      freezaTableName: true, //防止修改表名为复数
      underscored: false, //防止驼峰式字段被默认为下划线
    },
    dialectOptions: {
      //date返回类型为字符串
      dateStrings: true,
      typeCast(field, next) {
        if (field.type === "DATETIME") {
          return field.string();
        }
        return next();
      },
    },
  };
  // config.redis = {
  //   client: {
  //     port: 6379,
  //     host: "127.0.0.1",
  //     password: null,
  //     db: 0,
  //   },
  // };

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + "_202115060149";

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
