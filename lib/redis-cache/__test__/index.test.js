jest.mock('redis', () => require('redis-mock')); // eslint-disable-line global-require

const { connect } = require('../redis');
const RedisCache = require('..');

const redisClient = connect();

const delay = waitSec => new Promise(
  resolve => setTimeout(resolve, waitSec * 1000)
);

const all = (...promises) => Promise.all(promises);

describe('RedisCache', () => {
  it('should be possible to create object with get, set and clear methods', () => {
    const cache = RedisCache(redisClient, 1);
    const { get, set, clear } = cache;
    expect(get).toBeInstanceOf(Function);
    expect(set).toBeInstanceOf(Function);
    expect(clear).toBeInstanceOf(Function);
  });

  it('should be possible to set and get value', async () => {
    const cache = RedisCache(redisClient, 1);
    await cache.set('key', 'value');
    expect(
      await cache.get('key')
    ).toBe('value');
  });

  it('should return undefined if no value associated with key', async () => {
    const cache = RedisCache(redisClient, 1);
    await cache.set('key', 100);
    expect(
      await cache.get('key2')
    ).toBeNull();
  });

  it('should expire key-value pare after expiration ms passed', async () => {
    const cache = RedisCache(redisClient, 1);
    await cache.set('key', 'value');
    expect(
      await cache.get('key')
    ).toBe('value');

    await delay(1.5);

    expect(
      await cache.get('key')
    ).toBeNull();
  });

  it('should be possible to clear all keys', async () => {
    const cache = RedisCache(redisClient, 1);
    await all(
      cache.set('key-1', 'value-1'),
      cache.set('key-2', 'value-2'),
    );

    expect(
      await all(
        cache.get('key-1'),
        cache.get('key-2')
      )
    ).toEqual(['value-1', 'value-2']);

    await cache.clear();

    expect(
      await all(
        cache.get('key-1'),
        cache.get('key-2')
      )
    ).toEqual([null, null]);
  });
});
