import EmergencyContact from '../models/EmergencyContact.js';

// Get all emergency contacts
export const getContacts = async (req, res) => {
  try {
    const contacts = await EmergencyContact.find({ userId: req.user._id });
    
    res.json({
      success: true,
      data: contacts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Add emergency contact
export const addContact = async (req, res) => {
  try {
    const { name, phone, email, relationship, isPrimary } = req.body;

    const contact = await EmergencyContact.create({
      userId: req.user._id,
      name,
      phone,
      email,
      relationship,
      isPrimary,
    });

    res.status(201).json({
      success: true,
      message: 'Emergency contact added successfully',
      data: contact,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update emergency contact
export const updateContact = async (req, res) => {
  try {
    const contact = await EmergencyContact.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found',
      });
    }

    contact.name = req.body.name || contact.name;
    contact.phone = req.body.phone || contact.phone;
    contact.email = req.body.email || contact.email;
    contact.relationship = req.body.relationship || contact.relationship;
    contact.isPrimary = req.body.isPrimary ?? contact.isPrimary;

    const updatedContact = await contact.save();

    res.json({
      success: true,
      message: 'Contact updated successfully',
      data: updatedContact,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete emergency contact
export const deleteContact = async (req, res) => {
  try {
    const contact = await EmergencyContact.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found',
      });
    }

    res.json({
      success: true,
      message: 'Contact deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};