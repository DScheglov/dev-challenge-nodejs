const { RouteRequestRecord } = require('../models');
const { idX, respondWithJson } = require('../utils');


const saveRequestRecord = ({ vessel, target }, result) => (
  RouteRequestRecord
    .create({ vessel, target, result })
    .catch(console.error) // just printing an error
);

const logRouteRequests = (mapper = idX) => (req, res, next) => {
  const sendJson = respondWithJson(res);
  res.json = result => {
    sendJson(result);
    saveRequestRecord(req.parsed, mapper(result));
  };
  next();
};

module.exports = { logRouteRequests };
