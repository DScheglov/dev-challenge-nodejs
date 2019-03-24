const { parsePositiveInt, defaultValue, oneOf, toLowerCase } = require('../parsers');

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

describe('defaultValue', () => {
  it('should create a parser', () => {
    expect(defaultValue(0)).toBeInstanceOf(Function);
  });

  it('should return the default value if value is null', () => {
    expect(
      defaultValue(0)(null)
    ).toBe(0);
  });

  it('should return the default value if value is undefined', () => {
    expect(
      defaultValue(0)(undefined)
    ).toBe(0);
  });

  it('should return the default value if value is an empty string', () => {
    expect(
      defaultValue(0)('')
    ).toBe(0);
  });

  it('should return value if it is 0', () => {
    expect(
      defaultValue(1)(0)
    ).toBe(0);
  });

  it('should return value if it is false', () => {
    expect(
      defaultValue(true)(false)
    ).toBe(false);
  });

  it('should return value if it is 5', () => {
    expect(
      defaultValue(10)(5)
    ).toBe(5);
  });
});

describe('oneOf', () => {
  it('should return a function', () => {
    expect(
      oneOf([1, 2, 3])
    ).toBeInstanceOf(Function);
  });

  it('should return a value if it is in allowed list', () => {
    expect(
      oneOf([1, 2, 3])(1)
    ).toBe(1);
  });

  it('should return an undefined if value is not in allowed list', () => {
    expect(
      oneOf([1, 2, 3])(5)
    ).toBeUndefined();
  });

  it('should return a specified default if value is not in allowed list', () => {
    expect(
      oneOf([1, 2, 3], 3)(5)
    ).toBe(3);
  });
});

describe('toLowerCase', () => {
  it('should lowerCase a string', () => {
    expect(toLowerCase('Hello')).toBe('hello');
  });

  it('should ignore object', () => {
    const value = {};
    expect(toLowerCase(value)).toBe(value);
  });
});
