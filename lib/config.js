const {
  SOURCE_FILE_PATH = '/dev/stdin', // stdin by default
  CACHE_EXPIRATION_TIME = 5 * 60, // 5 minutes by default
  REDIS_DB_URL,
  MONGO_DB_URI = 'mongodb://localhost:27017/SpaceCom',
  API_PORT = 3000,
} = process.env;

module.exports = {
  SOURCE_FILE_PATH,
  CACHE_EXPIRATION_TIME,
  REDIS_DB_URL,
  MONGO_DB_URI,
  API_PORT,
};
