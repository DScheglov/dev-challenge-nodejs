/* eslint-disable no-plusplus */

/**
 * findSumm -- return subarray of items with given summ
 *
 * Implements shifting window algorithm.
 * Time: O(n)
 * Memory: O(1)
 *
 * Assumption: items are sorted in ascending oreder
 *
 * @param Number[] items
 * @param Number summ
 * @returns Number[]? - subarray with givven summ or null if summ is unreachable
 */

const findSumm = (items, summ) => {
  const n = items.length;
  if (summ === 0 || n === 0) return null;

  let rest = summ;
  let end = n - 1; // the last index of subarray
  let start = end; // the first inde of subarray
  let result;

  for (; start >= 0; start--) {
    rest -= items[start];
    if (rest < 0) rest += items[end--]; // shifting end of subarray to left
    if (rest === 0) result = { start, end };
  }

  if (result == null) return null; // summ is unreachable

  return items.slice(result.start, result.end + 1);
};

module.exports = findSumm;
