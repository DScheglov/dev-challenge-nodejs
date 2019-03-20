const express = require('express');
const routesService = require('./routes-service');
const vesselsService = require('./vessels-service');
const { all, parse, parsePositiveInt } = require('./utils');
const ctrl = require('./controllers');
const config = require('./config');

const app = express();

app.use(
  '/vessels/:vessel/routes-to/:target',
  parse.route('vessel', parsePositiveInt),
  parse.route('target', parsePositiveInt),
  vesselsService.logRouteRequests, // logging requests
  routesService
);

app.use('/vessels', vesselsService);

app.use(ctrl.notSupported);
app.use(ctrl.handleError);

const init = all(routesService.init, vesselsService.init);

init(config).then(
  () => app.listen(config.API_PORT)
);
