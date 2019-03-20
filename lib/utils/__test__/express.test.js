const createError = require('http-errors');
const { respondWithJson, parse } = require('../express');

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
