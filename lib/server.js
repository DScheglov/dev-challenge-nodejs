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

app.use('/vessels/:vessel/routes-to/:target',
  parse.route('vessel', parsePositiveInt), // required by logger
  parse.route('target', parsePositiveInt), // requirer by routesService and logger
  vesselsService.logRouteRequests(), // logging requests
  routesService);

app.use('/vessels',
  vesselsService);

app.use(notSupported);
app.use(handleError);

const initAll = all(
  routesService.init,
  vesselsService.init
);

initAll(config).then(
  () => app.listen(config.API_PORT)
);
