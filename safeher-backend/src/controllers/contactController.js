import EmergencyContact from '../models/EmergencyContact.js';
import Notification from '../models/Notification.js';

// @desc    Get all emergency contacts
// @route   GET /api/contacts
// @access  Private
export const getContacts = async (req, res) => {
  try {
    const contacts = await EmergencyContact.find({ userId: req.user._id })
      .sort({ isPrimary: -1, createdAt: 1 });

    res.status(200).json({
      success: true,
      data: contacts
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Create emergency contact
// @route   POST /api/contacts
// @access  Private
export const createContact = async (req, res) => {
  try {
    const { name, phone, email, relationship, isPrimary, notificationPreference } = req.body;

    // Check if contact with same phone exists
    const existingContact = await EmergencyContact.findOne({
      userId: req.user._id,
      phone
    });

    if (existingContact) {
      return res.status(400).json({
        success: false,
        message: 'Contact with this phone number already exists'
      });
    }

    // Count current contacts
    const contactCount = await EmergencyContact.countDocuments({ userId: req.user._id });
    if (contactCount >= 10) {
      return res.status(400).json({
        success: false,
        message: 'Maximum 10 emergency contacts allowed'
      });
    }

    const contact = await EmergencyContact.create({
      userId: req.user._id,
      name,
      phone,
      email: email || '',
      relationship,
      isPrimary: isPrimary || false,
      notificationPreference: notificationPreference || { sms: true, email: true, push: true }
    });

    // Create notification
    await Notification.create({
      userId: req.user._id,
      title: 'Emergency Contact Added',
      message: `${name} has been added as an emergency contact`,
      type: 'system',
      priority: 'medium'
    });

    res.status(201).json({
      success: true,
      data: contact
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update emergency contact
// @route   PUT /api/contacts/:id
// @access  Private
export const updateContact = async (req, res) => {
  try {
    const { name, phone, email, relationship, isPrimary, notificationPreference, isActive } = req.body;

    const contact = await EmergencyContact.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    // Check if phone is being changed and already exists
    if (phone && phone !== contact.phone) {
      const existing = await EmergencyContact.findOne({
        userId: req.user._id,
        phone,
        _id: { $ne: req.params.id }
      });
      if (existing) {
        return res.status(400).json({
          success: false,
          message: 'Contact with this phone number already exists'
        });
      }
    }

    // Update fields
    if (name) contact.name = name;
    if (phone) contact.phone = phone;
    if (email !== undefined) contact.email = email;
    if (relationship) contact.relationship = relationship;
    if (isPrimary !== undefined) {
      contact.isPrimary = isPrimary;
    }
    if (notificationPreference) {
      contact.notificationPreference = notificationPreference;
    }
    if (isActive !== undefined) {
      contact.isActive = isActive;
    }

    await contact.save();

    res.status(200).json({
      success: true,
      data: contact
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete emergency contact
// @route   DELETE /api/contacts/:id
// @access  Private
export const deleteContact = async (req, res) => {
  try {
    const contact = await EmergencyContact.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    await contact.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Contact deleted successfully'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Set primary contact
// @route   PUT /api/contacts/:id/primary
// @access  Private
export const setPrimaryContact = async (req, res) => {
  try {
    const contact = await EmergencyContact.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    // Set all contacts to non-primary
    await EmergencyContact.updateMany(
      { userId: req.user._id },
      { isPrimary: false }
    );

    contact.isPrimary = true;
    await contact.save();

    res.status(200).json({
      success: true,
      data: contact
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};