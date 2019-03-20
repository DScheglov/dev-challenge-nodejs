const { RouteRequestRecord } = require('../models');


const saveRequestRecord = (vessel, target, result) => RouteRequestRecord
  .create({ vessel, target, result })
  .catch(console.error); // do nothing

const logRouteRequests = (req, res, next) => {
  const sendJson = res.json.bind(res);
  res.json = result => {
    const { vessel, target } = req.parsed;
    sendJson(result);
    return saveRequestRecord(vessel, target, result);
  };
  next();
};

module.exports = { logRouteRequests };
