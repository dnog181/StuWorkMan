// app/service/medis.js
const { Service } = require("egg");

class RedisService extends Service {
  /**
   * 设置指定 key 的值
   * @param {string} key - Redis 键名
   * @param {any} value - 要设置的值
   * @returns {Promise<void>} 无返回值
   */
  async set(key, value) {
    try {
      if (typeof value !== "string") {
        value = JSON.stringify(value);
      }
      await this.app.redis.set(key, value);
    } catch (error) {
      this.ctx.logger.error(`Failed to set key ${key}: ${error.message}`);
      throw new Error("Redis set operation failed");
    }
  }

  /**
   * 获取指定 key 的值
   * @param {string} key - Redis 键名
   * @returns {Promise<any>} 返回键对应的值，如果键不存在则返回 null
   */
  async get(key) {
    try {
      const value = await this.app.redis.get(key);
      return value;
      // return value ? JSON.parse(value) : null;
    } catch (error) {
      this.ctx.logger.error(`Failed to get key ${key}: ${error.message}`);
      throw new Error("Redis get operation failed");
    }
  }
  /**
   * 删除指定 key 的值
   * @param {string} key - Redis 键名
   * @returns {Promise<void>} 无返回值
   */
  async del(key) {
    try {
      await this.app.redis.del(key);
    } catch (error) {
      this.ctx.logger.error(`Failed to delete key ${key}: ${error.message}`);
      throw new Error("Redis delete operation failed");
    }
  }

  /**
   * 设置多个键值对
   * @param {Object.<string, any>} pairs - 包含键值对的映射对象
   * @returns {Promise<void>} 无返回值
   */
  async setMultiple(pairs) {
    try {
      const multi = this.app.redis.multi();
      for (const [key, value] of Object.entries(pairs)) {
        if (typeof value !== "string") {
          multi.set(key, JSON.stringify(value));
        } else {
          multi.set(key, value);
        }
      }
      await multi.exec();
    } catch (error) {
      this.ctx.logger.error(`Failed to set multiple keys: ${error.message}`);
      throw new Error("Redis set multiple operation failed");
    }
  }

  /**
   * 获取多个键的值
   * @param {string[]} keys - Redis 键名数组
   * @returns {Promise<any[]>} 返回键对应的值数组，如果键不存在则返回 null
   */
  async getMultiple(keys) {
    try {
      const values = await this.app.redis.mget(keys);
      //.map((value) => (value ? JSON.stringify(value) : null));
      return values;
    } catch (error) {
      this.ctx.logger.error(`获取多个键值失败: ${error.message}`);
      throw new Error("Redis 获取多个键值操作失败");
    }
  }

  async flushAll() {
    try {
      await this.app.redis.flushall();
    } catch (error) {
      this.ctx.logger.error(`Failed to flush Redis database: ${error.message}`);
      throw new Error("Redis flush operation failed");
    }
  }
}

module.exports = RedisService;
