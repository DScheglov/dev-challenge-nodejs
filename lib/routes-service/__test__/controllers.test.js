jest.mock('../../routes-core', () => ({ getRoute: target => Promise.resolve(target) }));
const controllers = require('../controllers');

describe('controllers.getRoutes', () => {
  it('should call res.json and path req.parsed.target', async () => {
    const req = { parsed: { target: 56 } };
    const res = { json: jest.fn() };
    await controllers.getRoutes(req, res);
    expect(
      res.json
    ).toHaveBeenLastCalledWith(req.parsed.target);
  });

  it('should call next with error in case when exception occured', async () => {
    const req = { parsed: { target: Promise.reject(new Error('Some Error')) } };
    const res = { json: jest.fn() };
    const next = jest.fn();
    await controllers.getRoutes(req, res, next);
    expect(
      next
    ).toHaveBeenLastCalledWith(expect.any(Error));
    expect(
      next.mock.calls[0][0].message
    ).toBe('Some Error');
  });
});
