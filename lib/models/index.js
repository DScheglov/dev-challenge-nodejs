const mongoose = require('../mongoose');
const RouteRequestRecord = require('./RouteRequestRecord');

const init = ({ MONGO_DB_URI } = {}) => new Promise(
  (resolve, reject) => {
    mongoose.connect(MONGO_DB_URI);
    mongoose.connection.once('connected', resolve);
    mongoose.connection.once('error', reject);
  }
);

module.exports = {
  init,
  RouteRequestRecord,
};
