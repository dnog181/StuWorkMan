const { Controller } = require("egg");

class UserController extends Controller {
  async index() {
    const { ctx, service } = this;
    let user = await service.user.find();

    ctx.Success("请求成功", user);
  }
  async create() {
    const { ctx, service } = this;
    let user = await service.user.create();
    ctx.Success("创建成功", user);
  }
}
module.exports = UserController;
