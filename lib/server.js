const express = require('express');
const createError = require('http-errors');
const gates = require('./gates-service');
const spacecom = require('./spacecom-service');
const config = require('./config');
const { all } = require('./utils/async-fn');

const app = express();

app.use(
  '/gates', // /gates?vessel=10&target=20
  gates.targetToLocals, // target -> req.locals.target
  spacecom.vesselTolocals, // vessel -> req.locals.vessel
  spacecom.logRouteRequests, // logging requests
  gates
);

app.use('/vessels', spacecom);

app.use((res, req, next) => next(
  createError(405, 'Not supported')
));
app.use(
  // eslint-disable-next-line no-unused-vars
  (err, req, res, next) => res.status(err.status || 500).json({ error: err.message })
);

const init = all(gates.init, spacecom.init);

init(config).then(
  () => app.listen(config.API_PORT)
);
