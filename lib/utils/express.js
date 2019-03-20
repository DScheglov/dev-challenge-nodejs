const createError = require('http-errors');
const { compose } = require('./fn');

const respondWithJson = res => result => res.json(result);

const reader = (from, paramName) => (
  typeof from === 'function'
    ? req => from(req, paramName)
    : req => req[from][paramName]
);

const errMessage = (paramName, sourceName, message) => (
  `${sourceName} parameter "${paramName}" is not specified or specified incorrectly: ${message}`
);

const parseParameter = (from, sourceName) => (paramName, caster, errorCode = 400) => {
  const readValue = compose(caster, reader(from, paramName));
  const parseParameterMiddleware = (req, res, next) => {
    try {
      req.parsed = req.parsed || {};
      req.parsed[paramName] = readValue(req);
      next();
    } catch (err) {
      next(
        err.statusCode == null
          ? createError(errorCode, errMessage(paramName, sourceName, err.message))
          : err
      );
    }
  };
  return parseParameterMiddleware;
};

const parse = parseParameter(
  (req, paramName) => req.param(paramName),
  'Request'
);

parse.query = parseParameter('query', 'Query');
parse.route = parseParameter('params', 'Route');

module.exports = {
  respondWithJson,
  parse,
};
