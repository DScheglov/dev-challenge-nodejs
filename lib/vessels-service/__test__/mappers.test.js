const { vesselsToCsv, requestsToCsv } = require('../mappers');

describe('vesselsToCsv', () => {
  it('should proceed with empty vessels list', () => {
    expect(vesselsToCsv([])).toMatchSnapshot();
  });
  it('should proceed with non-empty vessels list', () => {
    expect(vesselsToCsv([
      { vessel: 1, target: 2 },
      { vessel: 2, target: 2 },
    ])).toMatchSnapshot();
  });
});

describe('requestsToCsv', () => {
  it('should proceed with non-emprty result', () => {
    expect(
      requestsToCsv([
        { _id: 1, vessel: 1, target: 6, requestDate: '2019-03-24T12:12:00+02:00', securityLevel: 1, gates: [1, 2, 3] },
        { _id: 2, vessel: 1, target: 7, requestDate: '2019-03-24T12:12:00+02:00', securityLevel: 1, gates: [1, 2, 4] },
      ])
    ).toMatchSnapshot();
  });

  it('should proceed with emprty result', () => {
    expect(
      requestsToCsv([
        { _id: 1, vessel: 1, target: 6, requestDate: '2019-03-24T12:12:00+02:00' },
        { _id: 2, vessel: 1, target: 7, requestDate: '2019-03-24T12:12:00+02:00' },
      ])
    ).toMatchSnapshot();
  });
});
