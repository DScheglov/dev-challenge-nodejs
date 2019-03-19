const express = require('express');
const init = require('./init');
const contollers = require('./controllers');
const middlewares = require('./middlewares');

const gatesApp = new express.Router();

gatesApp.get('/', contollers.getGates);

gatesApp.init = init;
gatesApp.targetToLocals = middlewares.targetToLocals;

module.exports = gatesApp;
