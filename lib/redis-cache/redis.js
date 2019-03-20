const redis = require('redis');
const { promisify } = require('../utils');

promisify(redis.RedisClient.prototype);
promisify(redis.Multi.prototype);

const connect = url => redis.createClient({ url });

module.exports = { redis, connect };
