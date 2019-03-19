const { all } = require('../async-fn');

const managed = fn => {
  let pResolve;
  let pReject;
  const managedAsyncFunc = (...args) => new Promise(
    (resolve, reject) => {
      pResolve = (...newArgs) => resolve(
        newArgs.length === 0 ? fn(...args) : newArgs[0]
      );
      pReject = reject;
    }
  );

  managedAsyncFunc.resolve = (...resArgs) => pResolve(...resArgs);
  managedAsyncFunc.reject = err => pReject(err);
  return managedAsyncFunc;
};

describe('all', () => {
  it('should return a function if not functions passed', () => {
    expect(
      all()
    ).toBeInstanceOf(Function);
  });

  it('should be possible to get Promise resolved with arguments if not functions passed', async () => {
    const asyncFn = all();
    const promise = asyncFn(1, 2, 3);
    expect(promise).toBeInstanceOf(Promise);
    expect(
      await promise
    ).toEqual([1, 2, 3]);
  });

  it('should work with single function', async () => {
    const asyncIdentity = jest.fn(x => Promise.resolve(x));

    expect(
      all(asyncIdentity)
    ).toBeInstanceOf(Function);

    expect(
      await all(asyncIdentity)(1)
    ).toEqual([1]);

    expect(
      asyncIdentity
    ).toHaveBeenCalledTimes(1);
  });

  it('should work with two functions', async () => {
    const asyncIdentity = jest.fn(x => Promise.resolve(x));
    const asyncSqr = jest.fn(x => Promise.resolve(x * x));

    expect(
      all(asyncIdentity, asyncSqr)
    ).toBeInstanceOf(Function);

    expect(
      await all(asyncIdentity, asyncSqr)(2)
    ).toEqual([2, 4]);

    expect(
      asyncIdentity,
    ).toHaveBeenCalledTimes(1);

    expect(
      asyncSqr,
    ).toHaveBeenCalledTimes(1);
  });

  it('should work with async and sync functions', async () => {
    const asyncIdentity = jest.fn(x => Promise.resolve(x));
    const sqr = jest.fn(x => x * x);

    expect(
      all(asyncIdentity, sqr)
    ).toBeInstanceOf(Function);

    expect(
      await all(asyncIdentity, sqr)(2)
    ).toEqual([2, 4]);

    expect(
      asyncIdentity,
    ).toHaveBeenCalledTimes(1);

    expect(
      sqr,
    ).toHaveBeenCalledTimes(1);
  });

  it('should work with sync/async functions and constants', async () => {
    const asyncIdentity = jest.fn(x => Promise.resolve(x));
    const sqr = jest.fn(x => x * x);

    expect(
      all(asyncIdentity, 5, sqr)
    ).toBeInstanceOf(Function);

    expect(
      await all(asyncIdentity, 5, sqr)(2)
    ).toEqual([2, 5, 4]);

    expect(
      asyncIdentity,
    ).toHaveBeenCalledTimes(1);

    expect(
      sqr,
    ).toHaveBeenCalledTimes(1);
  });

  it('should work with sync/async functions and constants incl. null', async () => {
    const asyncIdentity = jest.fn(x => Promise.resolve(x));
    const sqr = jest.fn(x => x * x);

    expect(
      all(asyncIdentity, 5, sqr, null)
    ).toBeInstanceOf(Function);

    expect(
      await all(asyncIdentity, 5, sqr, null)(2)
    ).toEqual([2, 5, 4, null]);

    expect(
      asyncIdentity,
    ).toHaveBeenCalledTimes(1);

    expect(
      sqr,
    ).toHaveBeenCalledTimes(1);
  });

  it('should work with sync/async functions and constants incl. undefined', async () => {
    const asyncIdentity = jest.fn(x => Promise.resolve(x));
    const sqr = jest.fn(x => x * x);

    expect(
      all(asyncIdentity, 5, sqr, undefined)
    ).toBeInstanceOf(Function);

    expect(
      await all(asyncIdentity, 5, sqr, undefined)(2)
    ).toEqual([2, 5, 4, undefined]);

    expect(
      asyncIdentity,
    ).toHaveBeenCalledTimes(1);

    expect(
      sqr,
    ).toHaveBeenCalledTimes(1);
  });

  it('should return async func that returns promise that resolves after all promise resolved', async () => {
    const identity = managed(x => x);
    const sqr = managed(x => x * x);

    const asyncFn = all(identity, sqr);

    const promise = asyncFn(2);

    identity.resolve(3);
    sqr.resolve(9);

    expect(
      await promise
    ).toEqual([3, 9]);
  });
});
