const redis = require('redis');
const promisify = require('../utils/promisify');

promisify(redis.RedisClient.prototype);
promisify(redis.Multi.prototype);

module.exports = redis;
