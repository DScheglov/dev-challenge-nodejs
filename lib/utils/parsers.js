const parsePositiveInt = str => {
  if (/^[1-9][0-9]*$/.test(str)) return parseInt(str, 10);
  throw new Error(
    `"${str}" is not a positive integer.`
  );
};

module.exports = { parsePositiveInt };
