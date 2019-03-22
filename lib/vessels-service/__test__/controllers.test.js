// eslint-disable-next-line global-require
jest.mock('../../models', () => require('./__mock-models__'));
const controllers = require('../controllers');

describe('controllers.getAllVessels', () => {
  it('should call res.json with DB result', async () => {
    const req = {};
    const res = { json: jest.fn() };
    const next = jest.fn();

    await controllers.getAllVessels(req, res, next);

    expect(
      res.json.mock.calls[0][0]
    ).toMatchSnapshot();

    expect(
      next
    ).not.toHaveBeenCalled();
  });
});


describe('controllers.getVesselRequests', () => {
  it('should call res.json with DB result', async () => {
    const req = { parsed: { vessel: 1 } };
    const res = { json: jest.fn() };
    const next = jest.fn();

    await controllers.getVesselRequests(req, res, next);

    expect(
      res.json.mock.calls[0][0]
    ).toMatchSnapshot();

    expect(
      next
    ).not.toHaveBeenCalled();
  });

  it('should call next with 404 error if result is an empty array', async () => {
    const req = { parsed: { vessel: 2 } };
    const res = { json: jest.fn() };
    let err = null;
    const next = error => {
      err = error;
    };

    await controllers.getVesselRequests(req, res, next);

    expect(err.status).toBe(404);
    expect(err.message).toBe('Vessel "2" is not found.');

    expect(
      res.json
    ).not.toHaveBeenCalled();
  });
});
