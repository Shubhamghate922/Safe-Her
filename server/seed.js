// server/seed.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import EmergencyContact from './models/EmergencyContact.js';
import SOSAlert from './models/SOSAlert.js';
import Notification from './models/Notification.js';
import connectDB from './config/db.js';

dotenv.config();

const seedDatabase = async () => {
  try {
    await connectDB();
    
    // 1. Clear existing data
    await User.deleteMany({});
    await EmergencyContact.deleteMany({});
    await SOSAlert.deleteMany({});
    await Notification.deleteMany({});
    console.log('🧹 Cleared old data');

    // 2. Create Users (Using Mongoose so passwords get hashed automatically!)
    const users = await User.create([
      {
        name: "Priya Sharma",
        email: "priya.sharma@example.com",
        phone: "+919876543211",
        password: "123456", // Mongoose will hash this automatically
        address: "Andheri West, Mumbai",
        emergencyEnabled: true,
        role: "user"
      },
      {
        name: "Admin User",
        email: "admin@gmail.com",
        phone: "+919876543213",
        password: "123456", 
        address: "SafeHer Headquarters, Mumbai",
        emergencyEnabled: true,
        role: "admin"
      },
      {
        name: "Shreya Gupta",
        email: "shreya.gupta@example.com",
        phone: "+919876543210",
        password: "123456",
        address: "Dastur Nagar, Amravati",
        emergencyEnabled: true,
        role: "user"
      }
    ]);

    console.log(`✅ Created ${users.length} users with hashed passwords`);

    // 3. Add Emergency Contacts (Link to user IDs)
    const priya = users.find(u => u.email === 'priya.sharma@example.com');
    const shreya = users.find(u => u.email === 'shreya.gupta@example.com');

    await EmergencyContact.create([
      { userId: priya._id, name: "Anita Sharma", phone: "+919800001238", relationship: "Mother", isPrimary: true },
      { userId: shreya._id, name: "Ravi Doe", phone: "+919800001234", relationship: "Father", isPrimary: true }
    ]);

    console.log('✅ Emergency contacts added');
    process.exit(0);

  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
};

seedDatabase();