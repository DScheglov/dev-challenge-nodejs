const mongoose = require('./mongoose');

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

function getAllVessels() {
  return this.aggregate()
    .sort({ requestDate: -1 })
    .group({ _id: '$vessel', target: { $first: '$target' } })
    .project({ vessel: '$_id', target: '$target', _id: 0 })
    .exec();
}

function getVesselRequests(vessel) {
  return this.find(
    { vessel },
    {
      _id: 1,
      vessel: 1,
      target: 1,
      requestDate: 1,
      'result.securityLevel': 1,
      'result.gates': 1,
    }
  ).sort({ requestDate: 1 }).exec();
}

function getVesselRequestsFlat(vessel) {
  return this.aggregate()
    .match({ vessel })
    .unwind({ path: '$result', preserveNullAndEmptyArrays: true })
    .project({
      _id: 1,
      vessel: 1,
      target: 1,
      requestDate: 1,
      securityLevel: '$result.securityLevel',
      gates: '$result.gates',
    });
}

RouteRequestRecordSchema.statics.getAllVessels = getAllVessels;
RouteRequestRecordSchema.statics.getVesselRequests = getVesselRequests;
RouteRequestRecordSchema.statics.getVesselRequestsFlat = getVesselRequestsFlat;

const RouteRequestRecord = mongoose.model('RouteRequestRecord', RouteRequestRecordSchema);

module.exports = RouteRequestRecord;
