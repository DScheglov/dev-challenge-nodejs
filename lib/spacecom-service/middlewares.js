const { RouteRequestRecord } = require('../models');
const { queryArgToLocals } = require('../utils/express');

const vesselTolocals = queryArgToLocals(
  'vessel',
  str => {
    if (/^[1-9][0-9]?$/.test(str)) return parseInt(str, 10);
    throw new Error('"vessel" query parameter is not specified or specified incorrectly');
  }
);

const saveRequestRecord = (vessel, target, result) => RouteRequestRecord
  .create({ vessel, target, result })
  .catch(console.error); // do nothing

const logRouteRequests = (req, res, next) => {
  const sendJson = res.json.bind(res);
  res.json = result => {
    const { vessel, target } = req.locals;
    sendJson(result);
    return saveRequestRecord(vessel, target, result);
  };
  next();
};

module.exports = { vesselTolocals, logRouteRequests };
