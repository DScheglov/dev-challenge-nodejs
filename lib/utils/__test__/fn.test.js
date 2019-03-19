const { compose, pipe, idX } = require('../fn');

describe('compose', () => {
  it('should return a function', () => {
    const f = x => x + 1;
    const g = x => x * 2;
    expect(
      compose(f, g)
    ).toBeInstanceOf(Function);
  });

  it('should correctly compose two functions', () => {
    const f = x => x + 1;
    const g = x => x * 2;

    expect(
      compose(f, g)(4)
    ).toBe(9);

    expect(
      compose(g, f)(4)
    ).toBe(10);
  });

  it('should return the same function if it was called with single argument', () => {
    const f = x => x + 1;
    expect(
      compose(f)
    ).toBe(f);
  });

  it('should return an Idx if no functions passed', () => {
    expect(
      compose()
    ).toBe(idX);
  });
});

describe('pipe', () => {
  it('should return a function', () => {
    const f = x => x + 1;
    const g = x => x * 2;
    expect(
      pipe(f, g)
    ).toBeInstanceOf(Function);
  });

  it('should correctly compose two functions', () => {
    const f = x => x + 1;
    const g = x => x * 2;

    expect(
      pipe(f, g)(4)
    ).toBe(10);

    expect(
      pipe(g, f)(4)
    ).toBe(9);
  });

  it('should return the same function if it was called with single argument', () => {
    const f = x => x + 1;
    expect(
      pipe(f)
    ).toBe(f);
  });

  it('should return an Idx if no functions passed', () => {
    expect(
      pipe()
    ).toBe(idX);
  });
});

describe('idX', () => {
  it('should be a Function', () => {
    expect(idX).toBeInstanceOf(Function);
  });

  it('should return the same argument that received', () => {
    const someObj = Symbol('some-object');

    expect(
      idX(someObj)
    ).toBe(someObj);
  });
});
