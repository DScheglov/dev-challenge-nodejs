const promisify = require('../promisify');

describe('promisify', () => {
  it('should promisify a simple object', async () => {
    const obj = {
      method(action, cb) {
        if (action === 'reject') {
          cb({ error: 'Rejecting' });
          return;
        }
        cb(null, { action });
      }
    };

    promisify(obj);
    expect(obj.methodAsync).toBeInstanceOf(Function);

    const success = jest.fn();
    const fail = jest.fn();

    await obj.methodAsync('ok').then(success).catch(fail);

    expect(success.mock.calls).toEqual([[{ action: 'ok' }]]);

    expect(fail.mock.calls).toHaveLength(0);

    await obj.methodAsync('reject').then(success).catch(fail);

    expect(success.mock.calls).toHaveLength(1);
    expect(fail.mock.calls).toEqual([[{ error: 'Rejecting' }]]);
  });

  it('should promisify Class prototype', async () => {
    class SomeClass {
      constructor(rejectAction) {
        this.rejectAction = rejectAction;
      }

      method(action, cb) {
        if (action === this.rejectAction) {
          cb({ error: action });
          return;
        }
        cb(null, { action });
      }
    }

    promisify(SomeClass.prototype);

    const obj = new SomeClass('Rejecting');
    expect(obj.methodAsync).toBeInstanceOf(Function);

    const success = jest.fn();
    const fail = jest.fn();

    await obj.methodAsync('ok').then(success).catch(fail);

    expect(success.mock.calls).toEqual([[{ action: 'ok' }]]);

    expect(fail.mock.calls).toHaveLength(0);

    await obj.methodAsync('Rejecting').then(success).catch(fail);

    expect(success.mock.calls).toHaveLength(1);
    expect(fail.mock.calls).toEqual([[{ error: 'Rejecting' }]]);
  });
});
