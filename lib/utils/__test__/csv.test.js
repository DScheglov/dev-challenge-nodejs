const toCsv = require('../csv');

describe('toCsv', () => {
  it('should return a single row', () => {
    expect(toCsv([[1, 2, 3]])).toMatchSnapshot();
  });

  it('should return a multiple rows', () => {
    expect(toCsv([[1, 2, 3], [3, 2, 1]])).toMatchSnapshot();
  });

  it('should support headers', () => {
    expect(toCsv([['Field 1', 'Field 2', 'Field 3'], [1, 2, 3]])).toMatchSnapshot();
  });

  it('should return a multiple rows and header row', () => {
    expect(toCsv([['Field #1', 'Field #2', 'Field #3'], [1, 2, 3], [3, 2, 1]])).toMatchSnapshot();
  });

  it('should process a complex data', () => {
    const data = [
      ['Value With "Quotes"', 'Value With ,(comma)', 1, 2, 3],
      ['Just a Value', 'Value with \n carret return', 1, 2, 3],
    ];

    expect(toCsv(data)).toMatchSnapshot();
  });
});
