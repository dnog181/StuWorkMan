module.exports = (app) => {
  const { router, controller } = app;
  router.get("/user", controller.user.index);
  router.get("/users", controller.user.create);
  router.post("/reg", controller.user.reg);
};
