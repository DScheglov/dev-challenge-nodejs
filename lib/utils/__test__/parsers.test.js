const { parsePositiveInt } = require('../parsers');

describe('parsePositiveInt', () => {
  it('("1") -> 1', () => {
    expect(
      parsePositiveInt('1')
    ).toBe(1);
  });

  it('("0") -> Error: "0" is not a positive integer.', () => {
    expect(
      () => parsePositiveInt('0')
    ).toThrow('"0" is not a positive integer.');
  });

  it('("112121212") -> 112121212', () => {
    expect(
      parsePositiveInt('112121212')
    ).toBe(112121212);
  });

  it('("-1212") -> Error: "-1212" is not a positive integer.', () => {
    expect(
      () => parsePositiveInt('-1212')
    ).toThrow('"-1212" is not a positive integer.');
  });

  it('("ashe232") -> Error: "ashe232" is not a positive integer.', () => {
    expect(
      () => parsePositiveInt('ashe232')
    ).toThrow('"ashe232" is not a positive integer.');
  });
});
