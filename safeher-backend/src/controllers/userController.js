import User from '../models/User.js';
import EmergencyContact from '../models/EmergencyContact.js';
import SOSAlert from '../models/SOSAlert.js';
import Notification from '../models/Notification.js';

// @desc    Get all users (admin only)
// @route   GET /api/users
// @access  Private/Admin
export const getUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const search = req.query.search || '';
    const role = req.query.role || '';
    const status = req.query.status || '';

    // Build filter
    const filter = {};
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } }
      ];
    }
    if (role) filter.role = role;
    if (status) filter.status = status;

    const users = await User.find(filter)
      .select('-password -refreshToken')
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await User.countDocuments(filter);

    // Get SOS counts for each user
    const usersWithStats = await Promise.all(users.map(async (user) => {
      const sosCount = await SOSAlert.countDocuments({ userId: user._id });
      const activeSosCount = await SOSAlert.countDocuments({ 
        userId: user._id, 
        status: 'active' 
      });
      const contactCount = await EmergencyContact.countDocuments({ 
        userId: user._id 
      });
      
      return {
        ...user.toObject(),
        sosCount,
        activeSosCount,
        contactCount
      };
    }));

    res.status(200).json({
      success: true,
      data: usersWithStats,
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

// @desc    Get single user
// @route   GET /api/users/:id
// @access  Private
export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select('-password -refreshToken');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Check if user is accessing their own profile or is admin
    if (req.user._id.toString() !== req.params.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view this profile'
      });
    }

    // Get additional stats
    const sosCount = await SOSAlert.countDocuments({ userId: user._id });
    const activeSosCount = await SOSAlert.countDocuments({ 
      userId: user._id, 
      status: 'active' 
    });
    const contacts = await EmergencyContact.find({ userId: user._id });
    const recentSOS = await SOSAlert.find({ userId: user._id })
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json({
      success: true,
      data: {
        ...user.toObject(),
        sosCount,
        activeSosCount,
        contacts,
        recentSOS
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private
export const updateUser = async (req, res) => {
  try {
    const { name, phone, profile, status, role } = req.body;

    // Check if user is updating their own profile or is admin
    if (req.user._id.toString() !== req.params.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this profile'
      });
    }

    // Only admin can update role and status
    const updateData = { name, phone, profile };
    if (req.user.role === 'admin') {
      if (status) updateData.status = status;
      if (role) updateData.role = role;
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).select('-password -refreshToken');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Don't allow admin to delete themselves
    if (req.user._id.toString() === req.params.id) {
      return res.status(400).json({
        success: false,
        message: 'You cannot delete your own account'
      });
    }

    await user.deleteOne();

    // Delete associated data
    await EmergencyContact.deleteMany({ userId: req.params.id });
    await SOSAlert.deleteMany({ userId: req.params.id });
    await Notification.deleteMany({ userId: req.params.id });

    res.status(200).json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get user statistics (admin only)
// @route   GET /api/users/stats
// @access  Private/Admin
export const getUserStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({ status: 'active' });
    const admins = await User.countDocuments({ role: 'admin' });
    const suspended = await User.countDocuments({ status: 'suspended' });

    const sosStats = await SOSAlert.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    const totalSOS = sosStats.reduce((acc, curr) => acc + curr.count, 0);
    const activeSOS = sosStats.find(s => s._id === 'active')?.count || 0;
    const resolvedSOS = sosStats.find(s => s._id === 'resolved')?.count || 0;

    const contacts = await EmergencyContact.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          primary: { 
            $sum: { $cond: ['$isPrimary', 1, 0] } 
          }
        }
      }
    ]);

    const recentUsers = await User.find()
      .select('name email createdAt role status')
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json({
      success: true,
      data: {
        users: {
          total: totalUsers,
          active: activeUsers,
          admins,
          suspended
        },
        sos: {
          total: totalSOS,
          active: activeSOS,
          resolved: resolvedSOS
        },
        contacts: contacts[0] || { total: 0, primary: 0 },
        recentUsers
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};