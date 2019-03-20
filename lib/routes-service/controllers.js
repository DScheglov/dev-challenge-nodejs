const routes = require('../routes-core');

const getRoutes = (req, res) => routes
  .getRoute(req.parsed.target)
  .then(result => res.json(result));

module.exports = { getRoutes };
