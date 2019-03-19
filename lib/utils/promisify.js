const Blubird = require('bluebird');

/**
 * createCallback - creates promisificating callback
 *
 * @param {Function} resolve
 * @param {Function} reject
 * @returns {Function} callback that resolves or rejects promise
 */
const createCallback = (resolve, reject) => (err, response) => (
  err != null ? reject(err) : resolve(response)
);

/**
 * nativePromisifier - promisifies object methods with a native node.js Promise
 *
 * @param {Function} originalMethod - method to be promisified
 * @returns {Function} promisified method
 */
const nativePromisifier = originalMethod => function promisified(...args) {
  return new Promise(
    (resolve, reject) => originalMethod.call(
      this, ...args, createCallback(resolve, reject)
    )
  );
};

/**
 * promisify - promisifies all object methods with
 *
 * @param {*} object
 */
const promisify = object => Blubird.promisifyAll(
  object, { promisifier: nativePromisifier }
);

module.exports = promisify;
