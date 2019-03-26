const express = require('express');
const { init, close } = require('./init');
const contollers = require('./controllers');


const routesService = express();

routesService.get('/', contollers.getRoutes);
routesService.init = init;
routesService.close = close;

module.exports = routesService;
