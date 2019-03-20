const RedisCache = require('../redis-cache');
const parseGatesText = require('./parser');
const findRoute = require('./find-route');

let findRouteSync = null;
let asyncCache = null;

const init = (text, redisClient, expiration) => {
  if (asyncCache == null) {
    asyncCache = RedisCache(redisClient, expiration);
  }

  findRouteSync = findRoute(
    parseGatesText(text)
  );

  return asyncCache.clear();
};

const findRouteAndCache = target => {
  const path = findRouteSync(target);
  asyncCache
    .set(target, path)
    .catch(console.error); // lazy caching
  return path;
};

const ensurePath = target => path => (
  path === null
    ? findRouteAndCache(target)
    : path
);

const getRoute = target => asyncCache
  .get(target)
  .then(ensurePath(target));

module.exports = { init, getRoute };
