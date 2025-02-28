"use strict";

const { Service } = require("egg");
const { Op } = require("sequelize");
class UserService extends Service {
  async find() {
    const user = await this.ctx.model.User.findAll({
      attributes: ["id", "name", "age", "created_at"],
      where: {
        [Op.or]: [{ age: { [Op.lt]: 12 } }, { name: "张三" }],
      },
    });
    return user;
  }
  async create() {
    const user = await this.ctx.model.User.create({
      name: "张7",
      age: 9,
    });
    await this.ctx.model.User.create({
      name: "张8",
      age: 30,
    });
    return user;
  }
}

module.exports = UserService;
