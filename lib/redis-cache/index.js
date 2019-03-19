const parseJson = value => (
  typeof value === 'string'
    ? JSON.parse(value)
    : null
);

const get = ({ redisClient, expiration }) => key => redisClient
  .multi()
  .get(key)
  .expire(key, expiration)
  .execAsync()
  .then(([value]) => parseJson(value));

const set = ({ redisClient, expiration }) => (key, value) => redisClient
  .setAsync(key, JSON.stringify(value), 'EX', expiration)
  .then(() => value);

const clear = ({ redisClient }) => () => redisClient.flushdbAsync();

const assignPrivateData = (redisClient, expiration) => ({ redisClient, expiration });

const createRedisCache = privateData => ({
  get: get(privateData),
  set: set(privateData),
  clear: clear(privateData),
});

const RedisCache = (redisClient, expiration) => createRedisCache(
  assignPrivateData(redisClient, expiration)
);

module.exports = RedisCache;
