const gates = require('../gates');

const getGates = (req, res) => gates
  .getPath(req.locals.target)
  .then(result => res.json(result));

module.exports = { getGates };
