jest.mock('redis', () => require('redis-mock')); // eslint-disable-line global-require

const { init, getPath } = require('..');
const { connect } = require('../../redis');

const text = `1 7 13 17 22 34 56 78
2 5 9 12 13 15 16 25 33 47
1 7 16 19 21 34 56 78
2 3 7 11 16 17 20 25 33 47
5 9 17 19 20 25 33 47
`;

describe('init', () => {
  it('should return promise when gates service is ready to find routes', async () => {
    await init(text, connect(), 1);
  });
});

describe('getPath', () => {
  it('should return an empty path', async () => {
    await init(text, connect(), 1);

    expect(
      await getPath(4)
    ).toEqual([]);
  });
});
