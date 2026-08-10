import express from 'express';
import User from '../models/User.js';
import ActivityLog from '../models/ActivityLog.js';

const router = express.Router();

/**
 * @route   GET /api/users/stats
 * @desc    Get aggregated user statistics from MongoDB for the Dashboard
 * @access  Public
 */
router.get('/stats', async (req, res, next) => {
  try {
    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({ status: 'Active' });
    const pendingUsers = await User.countDocuments({ status: 'Pending' });
    const suspendedUsers = await User.countDocuments({ status: 'Suspended' });
    
    // Aggregation pipeline for average safety score
    const avgScoreResult = await User.aggregate([
      { $group: { _id: null, avgScore: { $avg: '$safetyScore' } } }
    ]);
    const avgSafetyScore = avgScoreResult.length > 0 ? Math.round(avgScoreResult[0].avgScore) : 0;

    // Aggregation for total alerts
    const alertsResult = await User.aggregate([
      { $group: { _id: null, totalAlerts: { $sum: '$alertsCount' } } }
    ]);
    const totalAlerts = alertsResult.length > 0 ? alertsResult[0].totalAlerts : 0;

    const recentLogs = await ActivityLog.find()
      .sort({ createdAt: -1 })
      .limit(6);

    res.status(200).json({
      success: true,
      stats: {
        totalUsers,
        activeUsers,
        pendingUsers,
        suspendedUsers,
        avgSafetyScore,
        totalAlerts,
      },
      recentActivity: recentLogs,
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @route   GET /api/users
 * @desc    Get all users with Search, Filter (req.query), & Pagination
 * @access  Public
 * @demonstrates req.query, MongoDB Schema queries (READ)
 */
router.get('/', async (req, res, next) => {
  try {
    const { search, status, role, page = 1, limit = 10, sortBy = 'createdAt', order = 'desc' } = req.query;

    // Build Mongoose filter query object
    const query = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { city: { $regex: search, $options: 'i' } },
      ];
    }

    if (status && status !== 'All') {
      query.status = status;
    }

    if (role && role !== 'All') {
      query.role = role;
    }

    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;
    const sortOrder = order === 'asc' ? 1 : -1;

    const users = await User.find(query)
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(limitNum);

    const total = await User.countDocuments(query);

    res.status(200).json({
      success: true,
      count: users.length,
      total,
      totalPages: Math.ceil(total / limitNum),
      currentPage: pageNum,
      parsedQueryParams: { search, status, role, page: pageNum, limit: limitNum, sortBy, order },
      data: users,
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @route   GET /api/users/:id
 * @desc    Get single user document by ID
 * @access  Public
 * @demonstrates req.params.id, BSON ObjectId lookup (READ)
 */
router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: `User with MongoDB BSON ObjectId '${req.params.id}' not found.`,
      });
    }

    res.status(200).json({
      success: true,
      receivedParamId: req.params.id,
      data: user,
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @route   POST /api/users
 * @desc    Create a new user document in MongoDB
 * @access  Public
 * @demonstrates req.body, Schema Validation, BSON Document Creation (CREATE)
 */
router.post('/', async (req, res, next) => {
  try {
    const { name, email, role, status, safetyScore, city, emergencyContacts } = req.body;

    // Create user document
    const newUser = await User.create({
      name,
      email,
      role: role || 'Member',
      status: status || 'Active',
      safetyScore: safetyScore !== undefined ? Number(safetyScore) : 95,
      city: city || 'Mumbai',
      emergencyContacts: emergencyContacts || [
        { name: 'Emergency Helpline', phone: '112', relation: 'Official' }
      ],
    });

    // Log action to ActivityLog MongoDB collection
    await ActivityLog.create({
      action: 'USER_CREATED',
      method: 'POST',
      endpoint: '/api/users',
      details: `Created user ${newUser.name} (${newUser.email})`,
      userRef: newUser._id,
    });

    res.status(201).json({
      success: true,
      message: 'User created successfully in MongoDB',
      receivedRequestBody: req.body,
      data: newUser,
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @route   PUT /api/users/:id
 * @desc    Replace / Full update user document in MongoDB
 * @access  Public
 * @demonstrates req.params, req.body, complete document update (UPDATE)
 */
router.put('/:id', async (req, res, next) => {
  try {
    const { name, email, role, status, safetyScore, city, emergencyContacts } = req.body;

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: `User with ID '${req.params.id}' not found for PUT update.`,
      });
    }

    // Overwrite document fields
    user.name = name !== undefined ? name : user.name;
    user.email = email !== undefined ? email : user.email;
    user.role = role !== undefined ? role : user.role;
    user.status = status !== undefined ? status : user.status;
    user.safetyScore = safetyScore !== undefined ? Number(safetyScore) : user.safetyScore;
    user.city = city !== undefined ? city : user.city;
    if (emergencyContacts) user.emergencyContacts = emergencyContacts;

    const updatedUser = await user.save();

    await ActivityLog.create({
      action: 'USER_PUT_UPDATED',
      method: 'PUT',
      endpoint: `/api/users/${req.params.id}`,
      details: `Replaced user document for ${updatedUser.name}`,
      userRef: updatedUser._id,
    });

    res.status(200).json({
      success: true,
      message: 'User document updated via PUT method',
      receivedParamId: req.params.id,
      receivedBody: req.body,
      data: updatedUser,
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @route   PATCH /api/users/:id
 * @desc    Partial update specific user fields (e.g. status, score, city)
 * @access  Public
 * @demonstrates req.params, req.body, partial patch update (PATCH)
 */
router.patch('/:id', async (req, res, next) => {
  try {
    const updates = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: `User with ID '${req.params.id}' not found for PATCH update.`,
      });
    }

    await ActivityLog.create({
      action: 'USER_PATCHED',
      method: 'PATCH',
      endpoint: `/api/users/${req.params.id}`,
      details: `Patched fields [${Object.keys(updates).join(', ')}] for ${updatedUser.name}`,
      userRef: updatedUser._id,
    });

    res.status(200).json({
      success: true,
      message: 'User document partially updated via PATCH method',
      receivedParamId: req.params.id,
      patchedFields: updates,
      data: updatedUser,
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @route   DELETE /api/users/:id
 * @desc    Delete user document from MongoDB
 * @access  Public
 * @demonstrates req.params, document removal (DELETE)
 */
router.delete('/:id', async (req, res, next) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: `User with ID '${req.params.id}' not found for deletion.`,
      });
    }

    await ActivityLog.create({
      action: 'USER_DELETED',
      method: 'DELETE',
      endpoint: `/api/users/${req.params.id}`,
      details: `Deleted user ${deletedUser.name} (${deletedUser.email})`,
    });

    res.status(200).json({
      success: true,
      message: `User '${deletedUser.name}' deleted successfully from MongoDB`,
      receivedParamId: req.params.id,
      deletedId: deletedUser._id,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
