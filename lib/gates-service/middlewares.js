const { queryArgToLocals } = require('../utils/express');

const targetToLocals = queryArgToLocals(
  'target',
  str => {
    if (/^[1-9][0-9]*$/.test(str)) return parseInt(str, 10);
    throw new Error('"target" query parameter is not specified or specified incorrectly');
  }
);

module.exports = { targetToLocals };
