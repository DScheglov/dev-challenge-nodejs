const { parseFormat } = require('../format');

describe('parseFormat', () => {
  it('should be a Function', () => {
    expect(parseFormat).toBeInstanceOf(Function);
  });

  it('should parse "json" as "json"', () => {
    expect(parseFormat('json')).toBe('json');
  });

  it('should parse "csv" as "csv"', () => {
    expect(parseFormat('json')).toBe('json');
  });

  it('should parse "" as "json"', () => {
    expect(parseFormat('')).toBe('json');
  });

  it('should parse undefined as "json"', () => {
    expect(parseFormat()).toBe('json');
  });
});
