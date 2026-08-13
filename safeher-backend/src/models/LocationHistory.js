import mongoose from 'mongoose';

const locationHistorySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  latitude: {
    type: Number,
    required: true
  },
  longitude: {
    type: Number,
    required: true
  },
  accuracy: Number,
  altitude: Number,
  speed: Number,
  heading: Number,
  address: String,
  placeName: String,
  source: {
    type: String,
    enum: ['manual', 'auto', 'sos', 'gps'],
    default: 'auto'
  },
  sharedWith: [{
    contactId: mongoose.Schema.Types.ObjectId,
    name: String,
    sharedAt: { type: Date, default: Date.now }
  }]
}, {
  timestamps: true
});

// Compound index for location queries
locationHistorySchema.index({ userId: 1, createdAt: -1 });
locationHistorySchema.index({ latitude: 1, longitude: 1 });

const LocationHistory = mongoose.model('LocationHistory', locationHistorySchema);
export default LocationHistory;