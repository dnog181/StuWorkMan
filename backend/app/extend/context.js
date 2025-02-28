module.exports = {
  Success(message, data) {
    this.body = {
      code: 200,
      message,
      data
    };
  },
  Fail(message, error) {
    this.body = {
      code: 500,
      message,
      error
    }
  },
};
