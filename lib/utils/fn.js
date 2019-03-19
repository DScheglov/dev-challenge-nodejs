/**
 * idX - identity function
 *
 * @param {*} argument - any argument
 * @returns {*} - argument received
 */
const idX = argument => argument;

/**
 * compose2 - returns function composed with f and g: f ° g
 *
 * @param {Function} f - any function
 * @param {Function} g - any function
 *
 * @returns {Function} - composed function
 */
const compose2 = (f, g) => (...args) => f(g(...args));

/**
 * compose - composes any number of functions: f1 ° f2 ° f3 ... ° fn
 *
 * If no function specified returns idX
 *
 * @param {...Function} fns - an argument list of functions to be composed
 * @returns {Function} composed function or idX
 */
const compose = (...fns) => (
  fns.length > 0
    ? fns.reduce(compose2)
    : idX
);

/**
 * pipe2 - returns function composed with f and g in reverse order: g ° f
 *
 * @param {Function} f
 * @param {Function} g
 * @returns {Function} - composed function
 */
const pipe2 = (f, g) => (...args) => g(f(...args));

/**
 * pipe - composes any number functions in reverse order: fn ° fn-1 ° ... ° f2  ° f1
 *
 * If no function specified returns idX
 *
 * @param {...Function} fns - an argument list of functions to be composed
 * @returns {Function} composed function or idX
 */
const pipe = (...fns) => (
  fns.length > 0
    ? fns.reduce(pipe2)
    : idX
);

module.exports = {
  compose,
  pipe,
  idX,
};
