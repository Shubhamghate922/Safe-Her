import mongoose from 'mongoose';

const sosAlertSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    default: 'Location not available',
  },
  status: {
    type: String,
    enum: ['ACTIVE', 'RESOLVED', 'CANCELLED'],
    default: 'ACTIVE',
  },
  message: {
    type: String,
    default: 'SOS Emergency Alert',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  resolvedAt: {
    type: Date,
    default: null,
  },
});

const SOSAlert = mongoose.model('SOSAlert', sosAlertSchema);
export default SOSAlert;