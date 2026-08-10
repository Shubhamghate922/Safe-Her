import mongoose from 'mongoose';

const contactSharingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  relation: { type: String, required: true },
  status: { type: String, enum: ['Active', 'Paused'], default: 'Active' },
});

const locationHistoryPointSchema = new mongoose.Schema({
  time: { type: String, required: true },
  location: { type: String, required: true },
  accuracy: { type: String, default: '±8m' },
  timestamp: { type: Date, default: Date.now },
});

const locationLogSchema = new mongoose.Schema(
  {
    latitude: {
      type: String,
      default: '19.0760° N',
    },
    longitude: {
      type: String,
      default: '72.8777° E',
    },
    rawLat: {
      type: Number,
      default: 19.0760,
    },
    rawLng: {
      type: Number,
      default: 72.8777,
    },
    accuracy: {
      type: String,
      default: '±8 meters',
    },
    address: {
      type: String,
      default: 'Andheri West, Mumbai, MH',
    },
    isSharingActive: {
      type: Boolean,
      default: true,
    },
    sharedWith: [contactSharingSchema],
    locationHistory: [locationHistoryPointSchema],
  },
  {
    timestamps: true,
  }
);

const LocationLog = mongoose.model('LocationLog', locationLogSchema);
export default LocationLog;
