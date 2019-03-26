const fs = require('fs');
const routes = require('../routes-core');


const init = ({
  SOURCE_FILE_PATH = '/dev/stdin', // stdin by default
  REDIS_DB_URL,
  CACHE_EXPIRATION_TIME = 5 * 60, // 5 minutes by default,
} = {}) => routes.init(
  fs.readFileSync(SOURCE_FILE_PATH, { encoding: 'utf-8' }),
  REDIS_DB_URL,
  CACHE_EXPIRATION_TIME
);

module.exports = { init, close: routes.close };
