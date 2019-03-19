const findSumm = require('../algos/find-summ.sw');
const { transduce, push, map, filter } = require('../utils/transduce');

const findLevelGates = target => levelGates => findSumm(levelGates, target);

const toLevelRecord = (gates, index) => ({
  securityLevel: index + 1,
  gates,
});

const isValidLevelRecord = ({ gates }) => Boolean(gates);

const findGates = levels => target => transduce(levels, push, [],
  map(findLevelGates(target)),
  map(toLevelRecord),
  filter(isValidLevelRecord));

module.exports = findGates;
