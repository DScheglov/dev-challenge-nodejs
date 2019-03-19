const { map, filter, push, transduce } = require('../transduce');

describe('map', () => {
  it('should return a function', () => {
    const inc = x => x + 1;
    expect(
      map(inc)
    ).toBeInstanceOf(Function);
  });

  it('should allow to map items for some reducer', () => {
    const inc = x => x + 1;
    const reducer = (a, b) => a * b;
    expect(
      map(inc)(reducer)(2, 2)
    ).toBe(6);
  });
});

describe('filter', () => {
  it('should return a function', () => {
    const isOdd = x => Boolean(x & 1);
    expect(
      filter(isOdd)
    ).toBeInstanceOf(Function);
  });

  it('should allow to filter items before reducer', () => {
    const isOdd = x => Boolean(x & 1);
    const reducer = (a, b) => a * b;
    expect(
      filter(isOdd)(reducer)(2, 3)
    ).toBe(6);

    expect(
      filter(isOdd)(reducer)(2, 2)
    ).toBe(2);
  });
});


describe('push', () => {
  it('should add item to the end of list', () => {
    const a = [1, 2, 3];
    expect(
      push(a, 4)
    ).toEqual([1, 2, 3, 4]);
  });

  it('should not create a new list', () => {
    const a = [1, 2, 3];
    expect(push(a, 4)).toBe(a);
  });
});

describe('transduce', () => {
  it('should work as simple reduce if no transducer specified', () => {
    expect(
      transduce([1, 2, 3, 4], (a, b) => a + b, 0)
    ).toBe(10);
  });

  it('should allow to compose transducers', () => {
    const a = [1, 2, 3, 4];
    const isOdd = x => Boolean(x & 1);
    const inc = x => x + 1;
    const wrap = value => ({ value });

    expect(
      transduce(a, push, [],
        map(inc),
        filter(isOdd),
        map(wrap))
    ).toEqual([
      { value: 3 },
      { value: 5 },
    ]);
  });
});
