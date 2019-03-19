const findPath = require('../find-path');

const exampleData = [
  [1, 7, 13, 17, 22, 34, 56, 78],
  [2, 5, 9, 12, 13, 15, 16, 25, 33, 47],
  [1, 7, 16, 19, 21, 34, 56, 78],
  [2, 3, 7, 11, 16, 17, 20, 25, 33, 47],
  [5, 9, 17, 19, 20, 25, 33, 47],
];

describe('findPath', () => {
  it('should return an empty array if levels are empty array', () => {
    expect(findPath([])(56)).toEqual([]);
  });

  it('should return an output from example on exampleData', () => {
    expect(findPath(exampleData)(56)).toEqual([
      { securityLevel: 1, gates: [22, 34] },
      { securityLevel: 2, gates: [2, 5, 9, 12, 13, 15] },
      { securityLevel: 3, gates: [16, 19, 21] },
      { securityLevel: 4, gates: [2, 3, 7, 11, 16, 17] },
      { securityLevel: 5, gates: [17, 19, 20] },
    ]);
  });

  it('should skip levels that not contain path', () => {
    expect(findPath(exampleData)(9)).toEqual([
      { securityLevel: 2, gates: [9] },
      { securityLevel: 5, gates: [9] },
    ]);
  });

  it('should an empty array if no path found', () => {
    expect(findPath(exampleData)(4)).toEqual([]);
  });
});
