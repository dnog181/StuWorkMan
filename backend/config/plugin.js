/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  static: {
    enable: true,
  },
  // redis: {
  //   enable: false,
  //   package: "egg-redis",
  // },
  sequelize: {
    enable: false,
    package: "egg-sequelize",
  },
};
