const express = require('express');
const routesService = require('./routes-service');
const vesselsService = require('./vessels-service');
const config = require('./config');
const {
  all,
  parse,
  parsePositiveInt,
  notSupported,
  handleError,
} = require('./utils');

const app = express();

app.use(
  '/routes',
  parse.query('vessel', parsePositiveInt), // required by logger
  parse.query('target', parsePositiveInt), // requirer by routesService and logger
  vesselsService.logRouteRequests(), // logging requests
  routesService
);

app.use('/vessels', vesselsService);

app.use(notSupported);
app.use(handleError);

app.init = all(
  routesService.init,
  vesselsService.init,
);

if (module.parent == null) {
  app.init(config).then(
    () => app.listen(config.API_PORT)
  );
}

module.exports = app;
