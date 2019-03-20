const express = require('express');
const init = require('./init');
const contollers = require('./controllers');


const routesService = new express.Router();

routesService.get('/', contollers.getRoutes);
routesService.init = init;

module.exports = routesService;
