import mongoose from 'mongoose';

/**
 * MongoDB User Schema & Document Definition
 * Illustrates BSON Data Types: ObjectId, String, Number, Boolean, Array, Subdocument, Date
 */
const emergencyContactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  relation: { type: String, default: 'Family' },
  status: { type: String, enum: ['Active', 'Pending'], default: 'Active' },
});

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'User name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters long'],
    },
    email: {
      type: String,
      required: [true, 'User email is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      default: '+91 9699 112 233',
    },
    role: {
      type: String,
      enum: ['Admin', 'Member', 'Protected User', 'Supervisor'],
      default: 'Protected User',
    },
    status: {
      type: String,
      enum: ['Active', 'Pending', 'Suspended'],
      default: 'Active',
    },
    memberType: {
      type: String,
      default: 'Premium Member',
    },
    isVerified: {
      type: Boolean,
      default: true,
    },
    safetyScore: {
      type: Number,
      min: [0, 'Score cannot be less than 0'],
      max: [100, 'Score cannot exceed 100'],
      default: 98,
    },
    city: {
      type: String,
      default: 'Mumbai',
    },
    address: {
      type: String,
      default: 'Amravati, MH 444606',
    },
    bloodGroup: {
      type: String,
      default: 'A+ (Positive)',
    },
    medicalNotes: {
      type: String,
      default: 'No known allergies. Asthma inhaler in bag.',
    },
    avatar: {
      type: String,
      default: '',
    },
    trustedContactsCount: {
      type: Number,
      default: 6,
    },
    alertsCount: {
      type: Number,
      default: 12,
    },
    emergencyContacts: [emergencyContactSchema],
    location: {
      lat: { type: Number, default: 19.0760 },
      lng: { type: Number, default: 72.8777 },
      address: { type: String, default: 'Andheri West, Mumbai' },
      updatedAt: { type: Date, default: Date.now },
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.virtual('initials').get(function () {
  if (!this.name) return 'U';
  return this.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();
});

const User = mongoose.model('User', userSchema);
export default User;
