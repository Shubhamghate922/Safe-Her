import mongoose from 'mongoose';

const emergencyContactSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: [true, 'Contact name is required'],
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
  },
  email: {
    type: String,
    lowercase: true,
  },
  relationship: {
    type: String,
    required: [true, 'Relationship is required'],
  },
  isPrimary: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

// Ensure only one primary contact per user
emergencyContactSchema.pre('save', async function (next) {
  if (this.isPrimary) {
    await this.constructor.updateMany(
      { userId: this.userId, _id: { $ne: this._id } },
      { $set: { isPrimary: false } }
    );
  }
  next();
});

const EmergencyContact = mongoose.model('EmergencyContact', emergencyContactSchema);
export default EmergencyContact;