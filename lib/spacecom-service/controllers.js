const { RouteRequestRecord } = require('../models');
const { respondWith500, respondWithJson } = require('../utils/express');


const getAllVessels = (req, res) => RouteRequestRecord
  .aggregate()
  .sort({ requestDate: -1 })
  .group({ _id: '$vessel', target: { $first: '$target' } })
  .project({ vessel: '$_id', target: '$target', _id: 0 })
  .exec()
  .then(respondWithJson(res))
  .catch(respondWith500(res));

const select = {
  _id: 0,
  vessel: 1,
  target: 1,
  requestDate: 1,
  'result.securityLevel': 1,
  'result.gates': 1,
};

const getVesselRequests = (req, res) => RouteRequestRecord
  .find({ vessel: req.params.vessle }, select)
  .sort({ requestDate: 1 })
  .exec()
  .then(respondWithJson(res))
  .catch(respondWith500(res));

module.exports = {
  getAllVessels,
  getVesselRequests,
};
