const express = require('express');
const routesService = require('./routes-service');
const vesselsService = require('./vessels-service');
const config = require('./config');
const {
  all,
  parse,
  parsePositiveInt,
  notSupported,
  respondWithError,
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
app.use(respondWithError);

app.init = all(
  routesService.init,
  vesselsService.init,
);

app.close = all(
  routesService.close,
  vesselsService.close,
);

const onError = ({ message }) => {
  console.error('ERROR:', message);
  app.close();
};

const onConnect = () => {
  console.log(`May the Force be with you on port: ${config.API_PORT}`);
};

const start = () => app.listen(config.API_PORT)
  .on('listening', onConnect)
  .on('error', onError);

if (module.parent == null) {
  app.init(config)
    .then(start)
    .catch(onError);
}

module.exports = app;
