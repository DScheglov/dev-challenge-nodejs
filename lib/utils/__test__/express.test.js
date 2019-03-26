const createError = require('http-errors');
const {
  respondWithJson,
  respondWithCsv,
  parse,
  notSupported,
  respondWithError,
} = require('../express');

describe('respondWithJson', () => {
  it('query: should return a function', () => {
    expect(
      respondWithJson({})
    ).toBeInstanceOf(Function);
  });

  it('query: should create handler that calls res.json with argument received', () => {
    const res = { json: jest.fn() };

    const handler = respondWithJson(res);
    const someData = {};

    handler(someData);

    expect(
      res.json.mock.calls[0][0]
    ).toBe(someData);
  });
});

describe('respondWithCsv', () => {
  it('query: should return a function', () => {
    expect(
      respondWithCsv({})
    ).toBeInstanceOf(Function);
  });

  it('query: should create handler that calls res.send with argument received', () => {
    const res = { send: jest.fn(), type: jest.fn(), set: jest.fn() };

    const handler = respondWithCsv(res);
    const someData = 'Text data';

    handler(someData);

    expect(res.send).toHaveBeenCalledTimes(1);
    expect(res.send).toHaveBeenCalledWith(someData);
    expect(res.type).toHaveBeenCalledTimes(1);
    expect(res.type).toHaveBeenCalledWith('text/csv');
  });
});

describe('parse', () => {
  it('query: should allow to parse query parameters', () => {
    const req = { query: { param: '123' } };
    const next = jest.fn();
    const parser = parse.query('param', s => +s);
    parser(req, {}, next);
    expect(
      req.parsed
    ).toEqual({ param: 123 });
    expect(next).toHaveBeenCalledTimes(1);
  });

  it('query: should allow to parse several parameters', () => {
    const req = { query: { param1: '123', param2: 'read' } };
    const next = jest.fn();
    const parser1 = parse.query('param1', s => +s);
    const parser2 = parse.query('param2', s => s.length);
    parser1(req, {}, next);
    parser2(req, {}, next);
    expect(
      req.parsed
    ).toEqual({ param1: 123, param2: 4 });
    expect(next).toHaveBeenCalledTimes(2);
  });

  it('query: should allow to get error', () => {
    const req = { query: {} };
    const next = jest.fn();
    const error = new Error('Some error');
    const parser = parse.query('param', () => {
      throw error;
    });
    parser(req, {}, next);
    expect(
      next.mock.calls[0][0].message
    ).toMatchSnapshot();
    expect(
      next.mock.calls[0][0].statusCode
    ).toBe(400);
  });

  it('query: should allow to specify custom status code', () => {
    const req = { query: {} };
    const next = jest.fn();
    const error = new Error('Some error');
    const parser = parse.query('param', () => { throw error; }, 406);
    parser(req, {}, next);

    expect(
      next.mock.calls[0][0].statusCode
    ).toBe(406);
  });

  it('query: should allow to get own error', () => {
    const req = { query: {} };
    const next = jest.fn();
    const error = createError(401, 'Some error');
    const parser = parse.query('param', () => {
      throw error;
    });
    parser(req, {}, next);
    expect(
      next.mock.calls[0][0]
    ).toBe(error);
  });

  it('params: should return a function', () => {
    expect(
      respondWithJson({})
    ).toBeInstanceOf(Function);
  });

  it('params: should create handler that calls res.json with argument received', () => {
    const res = { json: jest.fn() };

    const handler = respondWithJson(res);
    const someData = {};

    handler(someData);

    expect(
      res.json.mock.calls[0][0]
    ).toBe(someData);
  });

  it('params: should allow to parse params parameters', () => {
    const req = { params: { param: '123' } };
    const next = jest.fn();
    const parser = parse.route('param', s => +s);
    parser(req, {}, next);
    expect(
      req.parsed
    ).toEqual({ param: 123 });
    expect(next).toHaveBeenCalledTimes(1);
  });

  it('params: should allow to parse several parameters', () => {
    const req = { params: { param1: '123', param2: 'read' } };
    const next = jest.fn();
    const parser1 = parse.route('param1', s => +s);
    const parser2 = parse.route('param2', s => s.length);
    parser1(req, {}, next);
    parser2(req, {}, next);
    expect(
      req.parsed
    ).toEqual({ param1: 123, param2: 4 });
    expect(next).toHaveBeenCalledTimes(2);
  });

  it('params: should allow to get error', () => {
    const req = { params: {} };
    const next = jest.fn();
    const error = new Error('Some error');
    const parser = parse.route('param', () => {
      throw error;
    });
    parser(req, {}, next);
    expect(
      next.mock.calls[0][0].message
    ).toMatchSnapshot();
    expect(
      next.mock.calls[0][0].statusCode
    ).toBe(400);
  });

  it('params: should allow to specify custom status code', () => {
    const req = { params: {} };
    const next = jest.fn();
    const error = new Error('Some error');
    const parser = parse.route('param', () => { throw error; }, 406);
    parser(req, {}, next);

    expect(
      next.mock.calls[0][0].statusCode
    ).toBe(406);
  });

  it('params: should allow to get own error', () => {
    const req = { params: {} };
    const next = jest.fn();
    const error = createError(401, 'Some error');
    const parser = parse.route('param', () => {
      throw error;
    });
    parser(req, {}, next);
    expect(
      next.mock.calls[0][0]
    ).toBe(error);
  });

  it('should allow to parse several parameters', () => {
    const req = {
      params: { param1: '123' },
      query: { param2: 'read' },
      param(name) {
        return (
          Object.hasOwnProperty.call(this.params, name)
            ? this.params[name]
            : this.query[name]
        );
      }
    };
    const next = jest.fn();
    const parser1 = parse('param1', s => +s);
    const parser2 = parse('param2', s => s.length);
    parser1(req, {}, next);
    parser2(req, {}, next);
    expect(
      req.parsed
    ).toEqual({ param1: 123, param2: 4 });
    expect(next).toHaveBeenCalledTimes(2);
  });
});

describe('notSupported', () => {
  it('should have length less then 4 (not to be an error handler)', () => {
    expect(notSupported.length).toBeLessThan(4);
  });

  it('should call next with http 405 error', () => {
    const res = {};
    const req = {};
    const next = jest.fn();
    notSupported(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(next.mock.calls[0][0].statusCode).toBe(405);
    expect(next.mock.calls[0][0].message).toBe('Not Supported');
  });
});

describe('respondWithError', () => {
  it('should have length 4 to be an error handler', () => {
    expect(respondWithError).toHaveLength(4);
  });

  it('should call res.json method with error.statusCode', () => {
    const req = {};
    const res = { json: jest.fn(() => res), status: jest.fn(() => res) };
    const next = jest.fn();
    const error = createError(404, 'Not Found');
    respondWithError(error, req, res, next);

    expect(next).toHaveBeenCalledTimes(0);
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.status.mock.calls[0][0]).toBe(404);
    expect(res.json.mock.calls[0][0]).toEqual({ error: 'Not Found' });
  });

  it('should call res.json method with 500 if status code is not specified', () => {
    const req = {};
    const res = { json: jest.fn(() => res), status: jest.fn(() => res) };
    const next = jest.fn();
    const error = new Error('Some Error');
    respondWithError(error, req, res, next);

    expect(next).toHaveBeenCalledTimes(0);
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.status.mock.calls[0][0]).toBe(500);
    expect(res.json.mock.calls[0][0]).toEqual({ error: 'Some Error' });
  });
});
