import SOSAlert from '../models/SOSAlert.js';
import User from '../models/User.js';
import EmergencyContact from '../models/EmergencyContact.js';
import Notification from '../models/Notification.js';
import LocationHistory from '../models/LocationHistory.js';

// @desc    Create SOS alert
// @route   POST /api/sos
// @access  Private
export const createSOSAlert = async (req, res) => {
  try {
    const { latitude, longitude, address, message, severity } = req.body;

    if (!latitude || !longitude) {
      return res.status(400).json({
        success: false,
        message: 'Latitude and longitude are required'
      });
    }

    // Create SOS alert
    const sosAlert = await SOSAlert.create({
      userId: req.user._id,
      message: message || 'SOS Emergency Alert',
      latitude,
      longitude,
      address: address || '',
      severity: severity || 'high',
      status: 'active'
    });

    // Get user's emergency contacts
    const contacts = await EmergencyContact.find({
      userId: req.user._id,
      isActive: true
    });

    // Log location history
    await LocationHistory.create({
      userId: req.user._id,
      latitude,
      longitude,
      address: address || '',
      source: 'sos'
    });

    // Notify contacts
    const notifiedContacts = [];
    for (const contact of contacts) {
      // In production, send SMS/email here
      // For now, just create notification
      await Notification.create({
        userId: req.user._id,
        title: `SOS Alert: ${req.user.name}`,
        message: `Emergency alert triggered. Location: ${address || `${latitude}, ${longitude}`}`,
        type: 'sos_alert',
        priority: 'urgent',
        data: {
          sosId: sosAlert._id,
          contactId: contact._id,
          latitude,
          longitude,
          address
        }
      });

      notifiedContacts.push({
        contactId: contact._id,
        name: contact.name,
        phone: contact.phone,
        notifiedAt: new Date()
      });
    }

    // Update notified contacts
    sosAlert.notifiedContacts = notifiedContacts;
    await sosAlert.save();

    // Create notification for user
    await Notification.create({
      userId: req.user._id,
      title: 'SOS Alert Sent',
      message: `Your SOS alert has been sent to ${contacts.length} contacts`,
      type: 'sos_alert',
      priority: 'high',
      data: { sosId: sosAlert._id }
    });

    res.status(201).json({
      success: true,
      data: sosAlert,
      contactsNotified: contacts.length
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get SOS history
// @route   GET /api/sos/history
// @access  Private
export const getSOSHistory = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const status = req.query.status || '';

    const filter = { userId: req.user._id };
    if (status) filter.status = status;

    // Admin can see all SOS alerts
    if (req.user.role === 'admin') {
      delete filter.userId;
    }

    const alerts = await SOSAlert.find(filter)
      .populate('userId', 'name email phone')
      .populate('resolvedBy', 'name email')
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await SOSAlert.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: alerts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get single SOS alert
// @route   GET /api/sos/:id
// @access  Private
export const getSOSAlert = async (req, res) => {
  try {
    const alert = await SOSAlert.findById(req.params.id)
      .populate('userId', 'name email phone')
      .populate('resolvedBy', 'name email');

    if (!alert) {
      return res.status(404).json({
        success: false,
        message: 'SOS alert not found'
      });
    }

    // Check authorization
    if (alert.userId._id.toString() !== req.user._id.toString() && 
        req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view this alert'
      });
    }

    res.status(200).json({
      success: true,
      data: alert
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Resolve SOS alert (admin only)
// @route   PUT /api/sos/:id/resolve
// @access  Private/Admin
export const resolveSOSAlert = async (req, res) => {
  try {
    const alert = await SOSAlert.findById(req.params.id);

    if (!alert) {
      return res.status(404).json({
        success: false,
        message: 'SOS alert not found'
      });
    }

    if (alert.status === 'resolved') {
      return res.status(400).json({
        success: false,
        message: 'Alert already resolved'
      });
    }

    alert.status = 'resolved';
    alert.resolvedBy = req.user._id;
    alert.resolvedAt = new Date();
    alert.responseTime = (new Date() - alert.createdAt) / 1000;
    await alert.save();

    // Notify user
    await Notification.create({
      userId: alert.userId,
      title: 'SOS Alert Resolved',
      message: `Your SOS alert has been resolved by ${req.user.name}`,
      type: 'sos_resolved',
      priority: 'high',
      data: { sosId: alert._id }
    });

    res.status(200).json({
      success: true,
      data: alert
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Cancel SOS alert
// @route   PUT /api/sos/:id/cancel
// @access  Private
export const cancelSOSAlert = async (req, res) => {
  try {
    const alert = await SOSAlert.findById(req.params.id);

    if (!alert) {
      return res.status(404).json({
        success: false,
        message: 'SOS alert not found'
      });
    }

    // Only the user who created the alert or admin can cancel
    if (alert.userId.toString() !== req.user._id.toString() && 
        req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to cancel this alert'
      });
    }

    if (alert.status === 'resolved') {
      return res.status(400).json({
        success: false,
        message: 'Cannot cancel a resolved alert'
      });
    }

    alert.status = 'cancelled';
    alert.cancelledAt = new Date();
    alert.cancellationReason = req.body.reason || 'Cancelled by user';
    await alert.save();

    // Notify user
    await Notification.create({
      userId: req.user._id,
      title: 'SOS Alert Cancelled',
      message: 'Your SOS alert has been cancelled',
      type: 'system',
      priority: 'medium'
    });

    res.status(200).json({
      success: true,
      data: alert
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};