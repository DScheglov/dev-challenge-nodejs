const express = require('express');
const { parse, parsePositiveInt } = require('../utils');
const { init } = require('../models');
const controllers = require('./controllers');
const middlewares = require('./middlewares');
const { parseFormat } = require('./format');


const vesselsService = express();

vesselsService.use(
  parse.query('format', parseFormat)
);

vesselsService.get('/', controllers.getAllVessels);

vesselsService.get(
  '/:vessel/route-requests',
  parse.route('vessel', parsePositiveInt),
  controllers.getVesselRequests
);

vesselsService.init = init;
vesselsService.logRouteRequests = middlewares.logRouteRequests;


module.exports = vesselsService;
