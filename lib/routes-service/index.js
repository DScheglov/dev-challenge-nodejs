const express = require('express');
const init = require('./init');
const contollers = require('./controllers');


const routesService = express();

routesService.get('/', contollers.getRoutes);
routesService.init = init;

module.exports = routesService;
