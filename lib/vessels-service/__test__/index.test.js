// eslint-disable-next-line global-require
jest.mock('../../models', () => require('./__mock-models__'));
const request = require('supertest');
const vesselsService = require('..');

describe('vesselsService', () => {
  it('GET / 200', async () => {
    await request(vesselsService)
      .get('/')
      .expect(200, [
        { vessel: 1, target: 1 },
        { vessel: 2, target: 2 },
      ]);
  });

  it('GET /1/route-requests', async () => {
    await request(vesselsService)
      .get('/1/route-requests')
      .expect(200, [
        { vessel: 1, target: 2, result: [], requestDate: '2019-03-22T10:12:12.000Z' },
        { vessel: 1, target: 2, result: [], requestDate: '2019-03-22T10:12:15.000Z' },
      ]);
  });
});
