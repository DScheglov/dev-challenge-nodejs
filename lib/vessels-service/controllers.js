const { RouteRequestRecord } = require('../models');
const { respondWithJson } = require('../utils');


const getAllVessels = (req, res, next) => RouteRequestRecord
  .getAllVessels()
  .then(respondWithJson(res))
  .catch(next);

const getVesselRequests = (req, res, next) => RouteRequestRecord
  .getVesselRequests(req.parsed.vessel)
  .then(respondWithJson(res))
  .catch(next);

module.exports = {
  getAllVessels,
  getVesselRequests,
};
