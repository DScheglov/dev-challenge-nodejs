const { transduce, push, map, filter } = require('../utils/transduce');

/**
 * toInt -- returns result of string parsing as integer
 *
 * @param {String} str - string to be parsed
 * @returns {Number} - parsing result
 */
const toInt = str => parseInt(str, 10);

/**
 * isNotNaN - checks if value is a number
 *
 * @param {Number|NaN} value
 * @returns {Boolean}
 */
const isNotNaN = value => !Number.isNaN(value);

/**
 * trim -- trims string
 *
 * @param {String} line
 * @returns {String} trimmed line
 */
const trim = line => line.trim();

/**
 * parseLevel - parses string as securite level
 *
 * @param {String} line - string line to be parsed to level
 * @returns {Number[]} - list of gates on this security level
 */
const parseLevel = line => transduce(line.split(/\s+/), push, [],
  map(toInt),
  filter(isNotNaN));

/**
 * parseGatesText - parses input data (like from gates.txt)
 *
 * @param {String} text - text to be parsed
 * @returns {Number[][]} gates grouped by levels
 */
const parseGatesText = text => transduce(text.split('\n'), push, [],
  map(trim),
  filter(Boolean),
  map(parseLevel));

module.exports = parseGatesText;
