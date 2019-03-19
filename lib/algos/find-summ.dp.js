/* eslint-disable no-mixed-operators, no-plusplus */

/**
 * getAddends - proceeds reverse analysis for dyn-prog.matrix
 *
 * @param {Number[][]} a - dynamic programming matrix
 * @param {Number} items - source array
 * @param {Number} last - the last selected item
 * @param {Number} summ - target summ
 * @returns {Number[]} - array of addends
 */
const getAddends = (a, items, last, summ) => {
  const path = [];

  let pj = -1; // granting defined unequality for first iteration
  for (let j = summ, i = last; i >= 0 && pj !== 0; i--, j = pj) {
    pj = a[i][j].prev;
    if (pj < j) path.unshift(items[i]);
  }
  return path;
};

/**
 * findSumm - returns a subset of items with given summ.
 *
 * Dynamic programming algorithm.
 * Time: O(n * summ)
 * Memory: O(n * summ)
 *
 * @param {Number[]} items - numbers to form summ
 * @param {Number} summ - target summ
 * @returns {Number[]?} - resulting subset or null if summ is unreachable with any subset of items
 */
const findSumm = (items, summ) => {
  const n = items.length;
  const a = new Array(n);

  for (let i = 0; i < n && items[i] <= summ; i++) {
    const k = items[i];
    a[i] = new Array(summ + 1);
    a[i][0] = null;
    if (i === 0) a[i][k] = { prev: 0 };
    for (let j = 1; i > 0 && j <= summ; j++) {
      if (j < k) {
        a[i][j] = a[i - 1][j] && { prev: j };
      } else if (j === k) {
        // when current summ is equal to current item
        // don't take current item (using previos path instead)
        a[i][j] = a[i - 1][j] || { prev: 0 };
      } else {
        a[i][j] = (
          a[i - 1][j - k] && { prev: j - k } // taking current item
          || a[i - 1][j] && { prev: j } // skipping current item
        );
      }
    }
    if (a[i][summ]) return getAddends(a, items, i, summ);
  }
  return null;
};

module.exports = findSumm;
