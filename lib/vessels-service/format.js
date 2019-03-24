const { defaultValue, pipe, oneOf, toLowerCase } = require('../utils');

const CSV = 'csv';
const JSON = 'json';

const parseFormat = pipe(
  toLowerCase,
  oneOf([JSON, CSV]),
  defaultValue(JSON),
);

module.exports = {
  parseFormat,
  CSV,
  JSON,
};
