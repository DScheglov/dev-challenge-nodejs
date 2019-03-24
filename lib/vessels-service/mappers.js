const { toCsv } = require('../utils');

const GATES_COUNT = 99;

const gateList = () => Array.from({ length: GATES_COUNT });

const vesselsHeader = [
  'Vessel', 'Last Target'
];

const toVesselRecord = ({ vessel, target }) => [vessel, target];

const vesselsToCsv = vessels => toCsv(
  [vesselsHeader, ...vessels.map(toVesselRecord)]
);

const requestsHeaders = [
  'Request Id', 'Vessel', 'Target', 'Request Date', 'Security Level',
  ...gateList().map(
    (_, index) => `Gate #${index + 1}`
  )
];

const flagOn = (flags, gate) => {
  flags[gate - 1] = 1; // eslint-disable-line no-param-reassign
  return flags;
};

const flagsOf = gates => (
  gates != null
    ? gates.reduce(flagOn, gateList())
    : gateList()
);

const toRequestRecord = ({ _id, vessel, target, requestDate, securityLevel, gates }) => [
  _id, vessel, target, requestDate, securityLevel, ...flagsOf(gates)
];

const requestsToCsv = results => toCsv(
  [requestsHeaders, ...results.map(toRequestRecord)]
);

module.exports = {
  requestsToCsv,
  vesselsToCsv,
};
