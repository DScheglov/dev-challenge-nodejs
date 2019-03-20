/* eslint-disable import/order */
const { connect, disconnect, prepare } = require('./__mock-mongoose__');
const { RouteRequestRecord, init } = require('..');


describe('RouteRequestRecord', () => {
  describe('offline validation', () => {
    it('should allow to create valid instance', done => {
      const routeRequest = new RouteRequestRecord({
        vessel: 5,
        target: 10,
        result: [],
      });

      routeRequest.validate(
        err => {
          expect(err).toBeNull();
          done();
        }
      );
    });

    it('should prevent creation if vessel is not specified', done => {
      const routeRequest = new RouteRequestRecord({
        target: 10,
        result: [],
      });

      routeRequest.validate(
        err => {
          expect(err.errors.vessel.message).toBe('Path `vessel` is required.');
          done();
        }
      );
    });

    it('should prevent creation if target is not specified', done => {
      const routeRequest = new RouteRequestRecord({
        vessel: 5,
        result: [],
      });

      routeRequest.validate(
        err => {
          expect(err.errors.target.message).toBe('Path `target` is required.');
          done();
        }
      );
    });
  });

  describe('crud', () => {
    beforeAll(done => {
      connect(done);
    });

    afterAll(done => {
      disconnect().then(done);
    });

    it('should be possible to save route request', async () => {
      await RouteRequestRecord.create({ target: 1, vessel: 1, result: [] });
      const stored = await RouteRequestRecord.findOne(
        { vessel: 1, target: 1 },
        'target vessel result -_id'
      ).exec();
      expect(
        stored.toJSON()
      ).toEqual({ target: 1, vessel: 1, result: [] });
    });

    it('should be possible get all vessels', async () => {
      expect(
        await RouteRequestRecord.getAllVessels()
      ).toEqual([{ target: 1, vessel: 1 }]);
    });

    it('should be possible to get vessel requests', async () => {
      const records = await RouteRequestRecord.getVesselRequests(1);
      expect(records).toHaveLength(1);
      const { target, vessel, result, requestDate } = records[0];
      expect(target).toBe(1);
      expect(vessel).toBe(1);
      expect(result).toHaveLength(0);
      expect(requestDate).toBeInstanceOf(Date);
    });
  });
});

describe('init', () => {
  afterAll(done => {
    disconnect().then(done);
  });

  it('should be possible to connect to mongodb', async () => {
    await prepare();
    await init({ MONGO_DB_URI: '' });
  });
});