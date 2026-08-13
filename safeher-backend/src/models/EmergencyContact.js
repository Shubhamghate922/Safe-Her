import mongoose from 'mongoose';

const emergencyContactSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  name: {
    type: String,
    required: [true, 'Contact name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters']
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true,
    match: [/^\+?[\d\s-]{10,15}$/, 'Please enter a valid phone number']
  },
  email: {
    type: String,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  relationship: {
    type: String,
    required: [true, 'Relationship is required'],
    enum: ['Father', 'Mother', 'Brother', 'Sister', 'Husband', 'Wife', 'Friend', 'Colleague', 'Other']
  },
  isPrimary: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  notificationPreference: {
    sms: { type: Boolean, default: true },
    email: { type: Boolean, default: true },
    push: { type: Boolean, default: true }
  },
  lastNotifiedAt: Date
}, {
  timestamps: true
});

// Ensure only one primary contact per user
emergencyContactSchema.pre('save', async function() {
  if (this.isPrimary) {
    await this.constructor.updateMany(
      { userId: this.userId, isPrimary: true, _id: { $ne: this._id } },
      { isPrimary: false }
    );
  }
});

const EmergencyContact = mongoose.model('EmergencyContact', emergencyContactSchema);
export default EmergencyContact;
