module.exports = {
  Success(msg, data, code = 200) {
    this.status = code; // 明确设置 HTTP 状态码
    this.body = {
      code,
      msg,
      data,
    };
  },
  Error(msg = "error", data = null, code = 400) {
    this.status = code; // 明确设置 HTTP 状态码
    this.body = {
      code,
      msg,
      data,
    };
  },
};
