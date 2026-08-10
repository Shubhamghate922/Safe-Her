import mongoose from 'mongoose';

const emergencyAlertSchema = new mongoose.Schema(
  {
    date: {
      type: String,
      required: true,
      default: () => new Date().toISOString().split('T')[0],
    },
    time: {
      type: String,
      required: true,
      default: () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
    location: {
      type: String,
      required: true,
      default: 'Andheri West, Mumbai',
    },
    status: {
      type: String,
      enum: ['RESOLVED', 'TEST', 'CANCELLED', 'ACTIVE'],
      default: 'RESOLVED',
    },
    type: {
      type: String,
      enum: ['SOS Alert', 'Check-in Missed', 'Test Alert', 'Location Shared', 'Trip Check-in'],
      default: 'SOS Alert',
    },
    details: {
      type: String,
      default: 'SOS alert triggered. Location shared with trusted contacts.',
    },
    responseTime: {
      type: String,
      default: '2 mins',
    },
    contactsNotified: {
      type: [String],
      default: ['Rohan Gupta', 'Ananya Sharma', 'Priya Singh'],
    },
    coordinates: {
      lat: { type: Number, default: 19.076 },
      lng: { type: Number, default: 72.8777 },
    },
  },
  {
    timestamps: true,
  }
);

const EmergencyAlert = mongoose.model('EmergencyAlert', emergencyAlertSchema);
export default EmergencyAlert;
