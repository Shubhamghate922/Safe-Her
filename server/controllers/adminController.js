import User from '../models/User.js';
import SOSAlert from '../models/SOSAlert.js';
import Notification from '../models/Notification.js';
import EmergencyContact from '../models/EmergencyContact.js';

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    
    res.json({
      success: true,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all SOS alerts
export const getAllSOSAlerts = async (req, res) => {
  try {
    const sosAlerts = await SOSAlert.find()
      .populate('userId', 'name email phone')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: sosAlerts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get active SOS alerts
export const getActiveSOSAlerts = async (req, res) => {
  try {
    const sosAlerts = await SOSAlert.find({ status: 'ACTIVE' })
      .populate('userId', 'name email phone')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: sosAlerts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get statistics
export const getStatistics = async (req, res) => {
  try {
    const [
      totalUsers,
      activeUsers,
      totalSOSAlerts,
      activeSOSAlerts,
      resolvedSOSAlerts,
      cancelledSOSAlerts,
      totalNotifications,
      unreadNotifications,
      totalContacts,
      avgContactsPerUser,
    ] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ emergencyEnabled: true }),
      SOSAlert.countDocuments(),
      SOSAlert.countDocuments({ status: 'ACTIVE' }),
      SOSAlert.countDocuments({ status: 'RESOLVED' }),
      SOSAlert.countDocuments({ status: 'CANCELLED' }),
      Notification.countDocuments(),
      Notification.countDocuments({ isRead: false }),
      EmergencyContact.countDocuments(),
      EmergencyContact.aggregate([
        {
          $group: {
            _id: '$userId',
            count: { $sum: 1 },
          },
        },
        {
          $group: {
            _id: null,
            avg: { $avg: '$count' },
          },
        },
      ]),
    ]);

    res.json({
      success: true,
      data: {
        totalUsers,
        activeUsers,
        totalSOSAlerts,
        activeSOSAlerts,
        resolvedSOSAlerts,
        cancelledSOSAlerts,
        totalNotifications,
        unreadNotifications,
        totalContacts,
        avgContactsPerUser: avgContactsPerUser[0]?.avg || 0,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Resolve SOS alert (admin)
export const adminResolveSOS = async (req, res) => {
  try {
    const sosAlert = await SOSAlert.findById(req.params.id);

    if (!sosAlert) {
      return res.status(404).json({
        success: false,
        message: 'SOS alert not found',
      });
    }

    sosAlert.status = 'RESOLVED';
    sosAlert.resolvedAt = new Date();
    await sosAlert.save();

    res.json({
      success: true,
      message: 'SOS alert resolved by admin',
      data: sosAlert,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};