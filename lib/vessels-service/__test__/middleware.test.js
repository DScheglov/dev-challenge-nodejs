const { getStored, resetStored } = require('./__mock-models__');

// eslint-disable-next-line global-require
jest.mock('../../models', () => require('./__mock-models__'));
const { logRouteRequests } = require('../middlewares');

describe('logRouteRequests', () => {
  beforeEach(() => resetStored());

  it('should override res.json method', () => {
    const parsed = { vessel: 1, target: 2 };
    const json = jest.fn();
    const res = { json };
    const next = () => {};
    logRouteRequests()({ parsed }, res, next);
    expect(
      res.json
    ).toBeInstanceOf(Function);
    expect(res.json).not.toBe(json);
  });

  it('should call next', () => {
    const parsed = { vessel: 1, target: 2 };
    const res = { json: () => {} };
    const next = jest.fn();
    logRouteRequests()({ parsed }, res, next);
    expect(next).toHaveBeenCalledTimes(1);
    expect(next.mock.calls[0]).toEqual([]); // called without args
  });

  it('should call original json method to send response', () => {
    const parsed = { vessel: 1, target: 2 };
    const json = jest.fn();
    const res = { json };
    const next = () => {};
    logRouteRequests()({ parsed }, res, next);
    const result = [];
    res.json(result);
    expect(json).toHaveBeenLastCalledWith(result);
  });

  it('should save unchanged response to db', () => {
    const parsed = { vessel: 1, target: 2 };
    const res = { json: () => {} };
    const next = () => {};
    logRouteRequests()({ parsed }, res, next);
    const result = [];
    res.json(result);
    expect(getStored()).toHaveLength(1);
    expect(getStored()[0]).toEqual({ vessel: 1, target: 2, result });
  });

  it('should save mapped response to db', () => {
    const parsed = { vessel: 1, target: 2 };
    const res = { json: () => {} };
    const next = () => {};
    logRouteRequests(r => r.length)({ parsed }, res, next);
    const result = [1, 2, 3];
    res.json(result);
    expect(getStored()).toHaveLength(1);
    expect(getStored()[0]).toEqual({ vessel: 1, target: 2, result: 3 });
  });
});
