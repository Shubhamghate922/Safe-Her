import mongoose from 'mongoose';

const sosAlertSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  message: {
    type: String,
    default: 'SOS Emergency Alert'
  },
  latitude: {
    type: Number,
    required: true
  },
  longitude: {
    type: Number,
    required: true
  },
  address: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['active', 'resolved', 'cancelled', 'false_alarm'],
    default: 'active'
  },
  severity: {
    type: String,
    enum: ['low', 'medium', 'high', 'critical'],
    default: 'high'
  },
  resolvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  resolvedAt: Date,
  cancelledAt: Date,
  cancellationReason: String,
  notifiedContacts: [{
    contactId: mongoose.Schema.Types.ObjectId,
    name: String,
    phone: String,
    notifiedAt: Date,
    acknowledged: { type: Boolean, default: false }
  }],
  responseTime: Number, // in seconds
  notes: String
}, {
  timestamps: true
});

// Compound indexes for queries
sosAlertSchema.index({ userId: 1, createdAt: -1 });
sosAlertSchema.index({ status: 1, createdAt: -1 });
sosAlertSchema.index({ latitude: 1, longitude: 1 });

const SOSAlert = mongoose.model('SOSAlert', sosAlertSchema);
export default SOSAlert;