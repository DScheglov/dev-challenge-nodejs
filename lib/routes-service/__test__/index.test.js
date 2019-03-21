/* eslint-disable no-underscore-dangle */
jest.mock('redis', () => require('redis-mock')); // eslint-disable-line global-require
jest.mock('fs', () => ({
  readFileSync: () => `1 7 13 17 22 34 56 78
2 5 9 12 13 15 16 25 33 47
1 7 16 19 21 34 56 78
2 3 7 11 16 17 20 25 33 47
5 9 17 19 20 25 33 47
`
}));

const express = require('express');
const request = require('supertest');
const routesService = require('../index');
const { parse, parsePositiveInt } = require('../../utils');

const mountedService = express();

mountedService.use('/',
  parse.query('target', parsePositiveInt),
  routesService);

mountedService.use(
  // eslint-disable-next-line no-unused-vars
  (err, req, res, next) => res
    .status(err.status)
    .json({ error: err.message })
);

describe('routesService', () => {
  beforeAll(routesService.init);

  it('GET /?target=56, 200', async () => {
    const res = await request(mountedService)
      .get('/?target=56')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(res.body).toMatchSnapshot();
  });

  it('GET /, 400', async () => {
    const res = await request(mountedService)
      .get('/')
      .expect(400);
    expect(res.body).toMatchSnapshot();
  });
});
