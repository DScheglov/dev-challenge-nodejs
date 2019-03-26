const mongoose = require('./mongoose');
const RouteRequestRecord = require('./route-request-record');

const init = ({ MONGO_DB_URI }) => new Promise(
  (resolve, reject) => {
    mongoose.connect(MONGO_DB_URI);
    mongoose.connection.once('connected', resolve);
    mongoose.connection.once('error', reject);
  }
);

const close = () => mongoose.disconnect();

module.exports = {
  init,
  close,
  RouteRequestRecord,
};
