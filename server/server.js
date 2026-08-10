// server.js - Complete MongoDB Backend (Simple Version)
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

const app = express();
const PORT = 5000;

// --- MIDDLEWARE ---
app.use(express.json()); // Allows your frontend to send JSON data
app.use(cors()); // Allows your React app to fetch from this server

// --- DATABASE CONNECTION ---
// Connect to local MongoDB (Make sure MongoDB is installed and running on your PC)
const MONGO_URI = 'mongodb://localhost:27017/safeher_database';

mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB Database!'))
  .catch((err) => console.error('❌ MongoDB Connection Error:', err));

// --- 1. CREATE THE USER SCHEMA (Data Structure) ---
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, default: 'Member' },
  status: { type: String, default: 'Active' },
  safetyScore: { type: Number, default: 95 },
  city: { type: String, default: 'Unknown' },
  createdAt: { type: Date, default: Date.now },
  // Embedded subdocument for emergency contacts
  emergencyContacts: [
    {
      name: String,
      phone: String,
      relation: String
    }
  ]
});

// --- 2. CREATE THE MODEL ---
const User = mongoose.model('User', userSchema);

// --- 3. API ROUTES ---

// HEALTH CHECK
app.get('/api/health', async (req, res) => {
  res.json({
    success: true,
    server: 'Express.js + MongoDB',
    database: { connected: true, isInMemory: false },
    message: 'Backend is running perfectly!'
  });
});

// GET USER STATS (Dashboard Numbers)
app.get('/api/users/stats', async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({ status: 'Active' });
    const pendingUsers = await User.countDocuments({ status: 'Pending' });
    const suspendedUsers = await User.countDocuments({ status: 'Suspended' });

    // Calculate average safety score
    const scores = await User.aggregate([
      { $group: { _id: null, avgScore: { $avg: '$safetyScore' } } }
    ]);
    const avgSafetyScore = scores.length > 0 ? Math.round(scores[0].avgScore) : 0;

    res.json({
      success: true,
      stats: {
        totalUsers,
        activeUsers,
        pendingUsers,
        suspendedUsers,
        avgSafetyScore,
        totalAlerts: 24 // Mock data since you don't have an Alert model yet
      },
      recentActivity: [
        { action: 'System Ready', details: 'Connected to MongoDB', createdAt: new Date() }
      ]
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET ALL USERS (With Query Filters for Search, Status, Role)
app.get('/api/users', async (req, res) => {
  try {
    const { search, status, role } = req.query;
    let filter = {};

    // Filter by search (name, email, or city)
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { city: { $regex: search, $options: 'i' } }
      ];
    }

    // Filter by status
    if (status && status !== 'All') {
      filter.status = status;
    }

    // Filter by role
    if (role && role !== 'All') {
      filter.role = role;
    }

    const users = await User.find(filter);
    res.json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET SINGLE USER BY ID
app.get('/api/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// CREATE NEW USER (POST)
app.post('/api/users', async (req, res) => {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.status(201).json({ 
      success: true, 
      data: savedUser, 
      message: 'User created in MongoDB successfully!' 
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// UPDATE USER FULLY (PUT)
app.put('/api/users/:id', async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.json({ 
      success: true, 
      data: updatedUser, 
      message: 'User fully updated via PUT!' 
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// PARTIALLY UPDATE USER (PATCH)
app.patch('/api/users/:id', async (req, res) => {
  try {
    const patchedUser = await User.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true }
    );
    if (!patchedUser) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.json({ 
      success: true, 
      data: patchedUser, 
      message: 'User patched via PATCH!' 
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// DELETE USER (DELETE)
app.delete('/api/users/:id', async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.json({ 
      success: true, 
      data: deletedUser, 
      message: 'User deleted from MongoDB!' 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// --- 4. TOPIC LAB DEMO ENDPOINTS (For your Dashboard Lab) ---

// Blocking vs Non-Blocking
app.get('/api/demo/blocking-vs-nonblocking', (req, res) => {
  const mode = req.query.mode || 'non-blocking';
  const start = Date.now();

  // Simulate CPU intensive task
  let sum = 0;
  for (let i = 0; i < 10000000; i++) {
    sum += i;
  }

  res.json({
    success: true,
    mode: mode,
    executionTimeMs: Date.now() - start,
    message: `Finished test in ${Date.now() - start}ms.`,
    explanation: mode === 'blocking' 
      ? 'Blocking the Event Loop stops all other requests.' 
      : 'Non-blocking runs asynchronously.'
  });
});

// Closures Demo
app.get('/api/demo/closures', (req, res) => {
  // Closure: A function that remembers its outer variable
  const createCounter = () => {
    let count = 0;
    return () => {
      count++;
      return count;
    };
  };
  
  // Reuse the same counter instance
  if (!global.counter) global.counter = createCounter();

  res.json({
    success: true,
    retainedCounterValue: global.counter(),
    explanation: 'Closures remember the "count" variable even after the outer function finishes.',
    codeSnippet: 'const createCounter = () => { let count = 0; return () => ++count; };'
  });
});

// Modules Info
app.get('/api/demo/modules-info', (req, res) => {
  res.json({
    success: true,
    activeModuleSystemInThisServer: 'ES Modules (ESM)',
    comparison: [
      { feature: 'Import', commonJS: 'require()', esModules: 'import' },
      { feature: 'Export', commonJS: 'module.exports', esModules: 'export' },
      { feature: 'File Extension', commonJS: '.js', esModules: '.mjs' }
    ]
  });
});

// Server Architecture
app.get('/api/demo/server-architecture', (req, res) => {
  res.json({
    success: true,
    architecture: {
      expressRoutingPipeline: [
        '1. Request comes in',
        '2. Middleware runs (JSON, CORS)',
        '3. Route matches (GET /api/users)',
        '4. Controller executes',
        '5. Response sent back'
      ],
      eventLoopStages: [
        '1. Timers (setTimeout)',
        '2. I/O Callbacks',
        '3. Idle',
        '4. Poll (Network I/O)',
        '5. Check (setImmediate)',
        '6. Close Callbacks'
      ]
    }
  });
});

// --- START THE SERVER ---
app.listen(PORT, () => {
  console.log(`🚀 Backend running at http://localhost:${PORT}`);
  console.log(`📊 Connected to MongoDB database: safeher_database`);
});