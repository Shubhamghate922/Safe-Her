import SOSAlert from '../models/SOSAlert.js';
import User from '../models/User.js';
import EmergencyContact from '../models/EmergencyContact.js';
import Notification from '../models/Notification.js';
import { sendSOSAlertEmail } from '../services/emailService.js';
import { sendSOSAlertSMS } from '../services/smsService.js';
import { generateLocationLink, getAddressFromCoordinates } from '../services/locationService.js';

// Create SOS alert
export const createSOSAlert = async (req, res) => {
  try {
    const { latitude, longitude, message } = req.body;
    const userId = req.user._id;

    // Get user
    const user = await User.findById(userId);

    // Get location address
    const address = await getAddressFromCoordinates(latitude, longitude);

    // Create SOS alert
    const sosAlert = await SOSAlert.create({
      userId,
      latitude,
      longitude,
      address,
      message: message || 'SOS Emergency Alert',
      status: 'ACTIVE',
    });

    // Get emergency contacts
    const contacts = await EmergencyContact.find({ userId });

    // Generate location link
    const locationLink = generateLocationLink(latitude, longitude);

    // Notify emergency contacts
    const notificationPromises = [];

    for (const contact of contacts) {
      // Create notification
      const notification = new Notification({
        userId: contact.userId,
        sosId: sosAlert._id,
        title: '🚨 SOS Emergency Alert',
        message: `${user.name} needs your help! Location: ${locationLink}`,
        type: 'SOS',
      });
      notificationPromises.push(notification.save());

      // Send email
      if (contact.email) {
        await sendSOSAlertEmail(contact.email, user.name, locationLink);
      }

      // Send SMS
      if (contact.phone) {
        await sendSOSAlertSMS(contact.phone, user.name, locationLink);
      }
    }

    await Promise.all(notificationPromises);

    res.status(201).json({
      success: true,
      message: 'SOS alert created and notifications sent',
      data: {
        sosAlert,
        contactsNotified: contacts.length,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get SOS history
export const getSOSHistory = async (req, res) => {
  try {
    const sosAlerts = await SOSAlert.find({ userId: req.user._id })
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

// Get single SOS alert
export const getSOSAlert = async (req, res) => {
  try {
    const sosAlert = await SOSAlert.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!sosAlert) {
      return res.status(404).json({
        success: false,
        message: 'SOS alert not found',
      });
    }

    res.json({
      success: true,
      data: sosAlert,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Resolve SOS alert
export const resolveSOSAlert = async (req, res) => {
  try {
    const sosAlert = await SOSAlert.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

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
      message: 'SOS alert resolved',
      data: sosAlert,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};