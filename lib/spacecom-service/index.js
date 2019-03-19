const express = require('express');
const { init } = require('../models');
const controllers = require('./controllers');
const middlewares = require('./middlewares');

const spacecomApp = new express.Router();

spacecomApp.get('/', controllers.getAllVessels);
spacecomApp.get('/:vessle/requests', controllers.getVesselRequests);

spacecomApp.init = init;
spacecomApp.logRouteRequests = middlewares.logRouteRequests;
spacecomApp.vesselTolocals = middlewares.vesselTolocals;

module.exports = spacecomApp;
