const mongoose = require('../mongoose');

const { Schema } = mongoose;

const RouteRequestRecordSchema = new Schema({
  vessel: { type: Number, required: true, index: true },
  target: { type: Number, required: true, index: true },
  requestDate: { type: Date, default: Date.now, index: true },
  result: {
    type: [{ securityLevel: Number, gates: [Number] }],
    required: true,
  },
});

const RouteRequestRecord = mongoose.model('RouteRequestRecord', RouteRequestRecordSchema);

module.exports = RouteRequestRecord;
