const { compose } = require('./fn');

const map = mapper => reducer => (accumulator, item, index, arr) => reducer(
  accumulator, mapper(item, index, arr), index, arr
);

const filter = predicate => reducer => (accumulator, item, index, arr) => (
  predicate(item, index, arr)
    ? reducer(accumulator, item, index, arr)
    : accumulator
);

const push = (list, item) => {
  list.push(item);
  return list;
};

const transduce = (list, reducer, initialValue, ...transducers) => list.reduce(
  compose(...transducers)(reducer), initialValue
);

module.exports = {
  map,
  filter,
  push,
  transduce,
};
