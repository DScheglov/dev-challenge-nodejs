const RedisCache = require('../redis-cache');
const parseGatesText = require('./parser');
const findPath = require('./find-path');

let findPathSync = null;
let asyncCache = null;

const init = (text, redisClient, expiration) => {
  if (asyncCache == null) {
    asyncCache = RedisCache(redisClient, expiration);
  }

  findPathSync = findPath(
    parseGatesText(text)
  );

  return asyncCache.clear();
};

const findPathAndCache = target => {
  const path = findPathSync(target);
  asyncCache
    .set(target, path)
    .catch(console.error); // lazy caching
  return path;
};

const ensurePath = target => path => (
  path === null
    ? findPathAndCache(target)
    : path
);

const getPath = target => asyncCache
  .get(target)
  .then(ensurePath(target));

module.exports = { init, getPath };
