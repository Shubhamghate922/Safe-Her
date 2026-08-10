import mongoose from 'mongoose';

const activityLogSchema = new mongoose.Schema(
  {
    action: { type: String, required: true }, // e.g. 'USER_CREATED', 'USER_UPDATED', 'USER_DELETED', 'PATCH_STATUS'
    method: { type: String, required: true }, // e.g. 'POST', 'PUT', 'PATCH', 'DELETE'
    endpoint: { type: String, required: true },
    details: { type: String, default: '' },
    ip: { type: String, default: '127.0.0.1' },
    userRef: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  },
  {
    timestamps: true,
  }
);

const ActivityLog = mongoose.model('ActivityLog', activityLogSchema);
export default ActivityLog;
