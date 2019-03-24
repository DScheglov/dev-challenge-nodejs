const createError = require('http-errors');
const { RouteRequestRecord } = require('../models');
const { respondWithJson, respondWithCsv, compose } = require('../utils');
const { requestsToCsv, vesselsToCsv } = require('./mappers');
const { CSV } = require('./format');


const getAllVessels = (req, res, next) => RouteRequestRecord
  .getAllVessels()
  .then(
    req.parsed.format === CSV
      ? compose(respondWithCsv(res, 'vessels'), vesselsToCsv)
      : respondWithJson(res)
  )
  .catch(next);

const reject404OnNoRequests = ({ vessel }) => requests => (
  requests.length > 0
    ? Promise.resolve(requests)
    : Promise.reject(
      createError(404, `Vessel "${vessel}" is not found.`)
    )
);

const getVesselRequestsNested = (req, res, next) => RouteRequestRecord
  .getVesselRequests(req.parsed.vessel)
  .then(reject404OnNoRequests(req.parsed))
  .then(respondWithJson(res))
  .catch(next);

const fileName = ({ vessel }) => `route-requests-${vessel}`;

const getVesselRequestsFlat = (req, res, next) => RouteRequestRecord
  .getVesselRequestsFlat(req.parsed.vessel)
  .then(reject404OnNoRequests(req.parsed))
  .then(compose(respondWithCsv(res, fileName(req.parsed)), requestsToCsv))
  .catch(next);

const getVesselRequests = (req, res, next) => (
  req.parsed.format === CSV
    ? getVesselRequestsFlat(req, res, next)
    : getVesselRequestsNested(req, res, next)
);

module.exports = {
  getAllVessels,
  getVesselRequests,
};
