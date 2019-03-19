const fs = require('fs');
const gates = require('../gates');
const { connect } = require('../redis');


const init = ({
  SOURCE_FILE_PATH = '/dev/stdin', // stdin by default
  REDIS_DB_URL,
  CACHE_EXPIRATION_TIME = 5 * 60, // 5 minutes by default,
} = {}) => gates.init(
  fs.readFileSync(SOURCE_FILE_PATH, { encoding: 'utf-8' }),
  connect(REDIS_DB_URL),
  CACHE_EXPIRATION_TIME
);

module.exports = init;
