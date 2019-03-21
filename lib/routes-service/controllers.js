const routes = require('../routes-core');

const getRoutes = (req, res, next) => routes
  .getRoute(req.parsed.target)
  .then(result => res.json(result))
  .catch(next);

module.exports = { getRoutes };
