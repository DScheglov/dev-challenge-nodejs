const parseGatesText = require('../parser');

const sampleText = `1 7 13 17 20 34 56 78
2 5 9 12 13 15 16 25 33 47
1 7 16 19 21 34 56 78
2 3 7 11 16 17 20 25 33 47
5 9 17 19 20 25 33 47
`;

describe('paeseGatesText', () => {
  it('should return an empty array for empty text', () => {
    expect(
      parseGatesText('')
    ).toEqual([]);
  });

  it('should parse a single line', () => {
    expect(
      parseGatesText('1 2 3 4 5')
    ).toEqual([[1, 2, 3, 4, 5]]);
  });

  it('should parse example text', () => {
    expect(
      parseGatesText(sampleText)
    ).toMatchSnapshot();
  });
});
