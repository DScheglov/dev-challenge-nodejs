const createError = require('http-errors');

const notSupported = (res, req, next) => next(
  createError(405, 'Not supported')
);

// eslint-disable-next-line no-unused-vars
const handleError = (err, req, res, next) => res
  .status(err.status || 500)
  .json({ error: err.message });

module.exports = { notSupported, handleError };
