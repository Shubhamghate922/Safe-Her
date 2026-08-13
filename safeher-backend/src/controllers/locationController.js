import LocationHistory from '../models/LocationHistory.js';
import EmergencyContact from '../models/EmergencyContact.js';
import Notification from '../models/Notification.js';
import User from '../models/User.js';

// @desc    Save location update
// @route   POST /api/location
// @access  Private
export const saveLocation = async (req, res) => {
  try {
    const { latitude, longitude, accuracy, altitude, speed, heading, address, placeName, source } = req.body;

    if (!latitude || !longitude) {
      return res.status(400).json({
        success: false,
        message: 'Latitude and longitude are required'
      });
    }

    const location = await LocationHistory.create({
      userId: req.user._id,
      latitude,
      longitude,
      accuracy: accuracy || null,
      altitude: altitude || null,
      speed: speed || null,
      heading: heading || null,
      address: address || '',
      placeName: placeName || '',
      source: source || 'auto'
    });

    // Update user's last active
    await User.findByIdAndUpdate(req.user._id, { lastActive: new Date() });

    res.status(201).json({
      success: true,
      data: location
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get location history
// @route   GET /api/location/history
// @access  Private
export const getLocationHistory = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const filter = { userId: req.user._id };

    const locations = await LocationHistory.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await LocationHistory.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: locations,
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

// @desc    Get latest location
// @route   GET /api/location/latest
// @access  Private
export const getLatestLocation = async (req, res) => {
  try {
    const location = await LocationHistory.findOne({ userId: req.user._id })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: location || null
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Share location with contacts
// @route   POST /api/location/share
// @access  Private
export const shareLocation = async (req, res) => {
  try {
    const { contactIds, duration } = req.body;

    if (!contactIds || contactIds.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'At least one contact ID is required'
      });
    }

    const contacts = await EmergencyContact.find({
      _id: { $in: contactIds },
      userId: req.user._id,
      isActive: true
    });

    if (contacts.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No valid contacts found'
      });
    }

    // Get latest location
    const location = await LocationHistory.findOne({ userId: req.user._id })
      .sort({ createdAt: -1 });

    if (!location) {
      return res.status(404).json({
        success: false,
        message: 'No location data available'
      });
    }

    // Update location with shared contacts
    for (const contact of contacts) {
      location.sharedWith.push({
        contactId: contact._id,
        name: contact.name,
        sharedAt: new Date()
      });
    }
    await location.save();

    // Notify user
    await Notification.create({
      userId: req.user._id,
      title: 'Location Shared',
      message: `Your location has been shared with ${contacts.length} contacts`,
      type: 'location_share',
      priority: 'medium'
    });

    // Notify contacts (in production, send SMS/email)
    for (const contact of contacts) {
      await Notification.create({
        userId: req.user._id,
        title: `Location Shared: ${req.user.name}`,
        message: `${req.user.name} has shared their location with you.`,
        type: 'location_share',
        priority: 'high',
        data: {
          contactId: contact._id,
          latitude: location.latitude,
          longitude: location.longitude,
          address: location.address
        }
      });
    }

    res.status(200).json({
      success: true,
      message: `Location shared with ${contacts.length} contacts`,
      data: {
        sharedWith: contacts.map(c => ({ id: c._id, name: c.name })),
        location: {
          latitude: location.latitude,
          longitude: location.longitude,
          address: location.address
        }
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};
