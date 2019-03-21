/* eslint-disable import/no-extraneous-dependencies */
const { Mockgoose } = require('mockgoose');
const mongoose = require('mongoose');

const mockgoose = new Mockgoose(mongoose);

const prepare = () => mockgoose.prepareStorage();

const connect = done => prepare()
  .then(
    () => mongoose.connect('', done)
  );

const disconnect = () => mockgoose.shutdown();

const reset = () => mockgoose.helper.reset();

module.exports = { connect, disconnect, prepare, reset };
