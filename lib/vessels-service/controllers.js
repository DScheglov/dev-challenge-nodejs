const createError = require('http-errors');
const { RouteRequestRecord } = require('../models');
const { respondWithJson } = require('../utils');


const getAllVessels = (req, res, next) => RouteRequestRecord
  .getAllVessels()
  .then(respondWithJson(res))
  .catch(next);

const reject404OnNoRequests = ({ vessel }) => requests => (
  requests.length > 0
    ? Promise.resolve(requests)
    : Promise.reject(
      createError(404, `Vessel "${vessel}" is not found.`)
    )
);

const getVesselRequests = (req, res, next) => RouteRequestRecord
  .getVesselRequests(req.parsed.vessel)
  .then(reject404OnNoRequests(req.parsed))
  .then(respondWithJson(res))
  .catch(next);

module.exports = {
  getAllVessels,
  getVesselRequests,
};
