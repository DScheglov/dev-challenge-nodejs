const stored = [];

const getStored = () => stored;
const resetStored = () => {
  stored.splice(0, stored.length);
};

const RouteRequestRecord = {
  create: record => {
    stored.push(record);
    return Promise.resolve(1);
  },

  getAllVessels: () => Promise.resolve([
    { vessel: 1, target: 1 },
    { vessel: 2, target: 2 },
  ]),

  getVesselRequests: vessel => Promise.resolve(
    vessel === 1
      ? [
        { vessel: 1, target: 2, result: [], requestDate: new Date('2019-03-22T12:12:12+02:00') },
        { vessel: 1, target: 2, result: [], requestDate: new Date('2019-03-22T12:12:15+02:00') },
      ]
      : []
  ),
};

module.exports = { RouteRequestRecord, getStored, resetStored };
