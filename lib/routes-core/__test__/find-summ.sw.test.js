const findSumm = require('../find-summ.sw');

const exampleData = [
  [1, 7, 13, 17, 22, 34, 56, 78],
  [2, 5, 9, 12, 13, 15, 16, 25, 33, 47],
  [1, 7, 16, 19, 21, 34, 56, 78],
  [2, 3, 7, 11, 16, 17, 20, 25, 33, 47],
  [5, 9, 17, 19, 20, 25, 33, 47],
];

describe('findSumm', () => {
  it('should return null if items is an empty array', () => {
    expect(
      findSumm([], 10)
    ).toBeNull();
  });

  it('should return null if summ is 0', () => {
    expect(
      findSumm([1, 2, 3], 0)
    ).toBeNull();
  });

  it('should find an item in single item array', () => {
    expect(
      findSumm([1], 1)
    ).toEqual([1]);
  });

  it('should return null for single item array', () => {
    expect(
      findSumm([1], 10)
    ).toBeNull();
  });

  it('should find each single item in a given array', () => {
    const items = [1, 5, 8, 10, 17];
    items.forEach(
      item => expect(
        findSumm(items, item)
      ).toEqual([item])
    );
  });
  it('should return the copy of items if its total summ is target', () => {
    const items = [1, 5, 8, 10, 17];
    expect(
      findSumm(items, 41)
    ).toEqual([1, 5, 8, 10, 17]);
  });

  it('should return null if target is unreachable', () => {
    const items = [1, 5, 8, 10, 17];
    expect(
      findSumm(items, 39)
    ).toBeNull();
  });

  it('should correctly process example data', () => {
    expect(
      exampleData.map(items => findSumm(items, 56))
    ).toEqual([
      [22, 34],
      [2, 5, 9, 12, 13, 15],
      [16, 19, 21],
      [2, 3, 7, 11, 16, 17],
      [17, 19, 20],
    ]);
  });
});
