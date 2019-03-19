const createError = require('http-errors');

const respondWithJson = res => result => res.json(result);

const respondWith500 = res => ({ message }) => res.status(500).json({ error: message });

const queryArgToLocals = (name, caster) => (req, res, next) => {
  try {
    req.locals = req.locals || {};
    req.locals[name] = caster(req.query[name]);
    next();
  } catch (err) {
    next(
      createError(400, err.message)
    );
  }
};

module.exports = {
  respondWithJson,
  respondWith500,
  queryArgToLocals,
};
