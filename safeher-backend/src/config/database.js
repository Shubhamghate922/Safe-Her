import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI || process.env.MONGODB_URI;
    
    if (!mongoURI) {
      console.error('❌ MongoDB URI not found in environment variables');
      console.log('📝 Please add MONGO_URI to your .env file');
      process.exit(1);
    }

    await mongoose.connect(mongoURI);
    console.log('✅ MongoDB connected successfully');
    return mongoose.connection;
  } catch (error) {
    console.error(`❌ MongoDB connection error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;