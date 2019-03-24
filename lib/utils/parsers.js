const parsePositiveInt = str => {
  if (/^[1-9][0-9]*$/.test(str)) return parseInt(str, 10);
  throw new Error(
    `"${str}" is not a positive integer.`
  );
};

const defaultValue = def => value => (
  value == null || value === '' ? def : value
);

const oneOf = (allowedItems, def) => value => (
  allowedItems.includes(value) && value !== undefined
    ? value
    : def
);

const toLowerCase = value => (
  typeof value === 'string' && Boolean(value)
    ? value.toLowerCase()
    : value
);

module.exports = {
  parsePositiveInt,
  defaultValue,
  oneOf,
  toLowerCase,
};
