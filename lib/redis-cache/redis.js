const redis = require('redis');
const { promisify } = require('../utils');

promisify(redis.RedisClient.prototype);
promisify(redis.Multi.prototype);

let redisClient = null;

const connect = url => {
  if (redisClient === null) {
    redisClient = redis.createClient(url);
  }
  return redisClient;
};

module.exports = { redis, connect };
