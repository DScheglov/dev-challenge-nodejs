/**
 * call - calls function fn with arguments args
 *
 * @param {...any} args - args to be used to call function
 * @returns {Function}
 *
 * @param {Function} fn - function to be called
 * @returns {any}
 */
const call = args => fn => (
  typeof fn === 'function'
    ? fn(...args)
    : fn
);

/**
 * all - composes one ore more sync/async functions to async function that returns
 *       promise that will be resolved when ALL promises returned by incoming functions
 *       became resolved
 *
 * @param {...Function|any} fns - functions to be composed
 * @returns {Function} composed async function
 */
const all = (...fns) => (...args) => Promise.all(
  fns.length > 0
    ? fns.map(call(args))
    : args
);

module.exports = { all };
