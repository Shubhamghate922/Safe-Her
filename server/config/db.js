import mongoose from 'mongoose';

export const connectDB = async () => {
  const primaryUri = process.env.MONGO_URI || 'mongodb://localhost:27017/user_dashboard';
  
  try {
    // Attempt standard connection to MongoDB daemon
    console.log(`📡 Connecting to MongoDB at: ${primaryUri}...`);
    const conn = await mongoose.connect(primaryUri, {
      serverSelectionTimeoutMS: 2500, // Quick timeout to fallback if daemon isn't running
    });

    console.log(`✅ MongoDB Connected Successfully: ${conn.connection.host}/${conn.connection.name}`);
    return { isInMemory: false, host: conn.connection.host, database: conn.connection.name, uri: primaryUri };
  } catch (error) {
    console.warn(`⚠️ Local MongoDB daemon unreachable at ${primaryUri} (${error.message}).`);
    console.log(`⚡ Launching high-performance MongoMemoryServer fallback for seamless dev execution...`);

    try {
      const { MongoMemoryServer } = await import('mongodb-memory-server');
      const mongoServer = await MongoMemoryServer.create();
      const memUri = mongoServer.getUri();

      const conn = await mongoose.connect(memUri);
      console.log(`🚀 In-Memory MongoDB Started & Connected Successfully at: ${memUri}`);
      return { isInMemory: true, host: conn.connection.host, database: 'user_dashboard_inmemory', uri: memUri };
    } catch (memErr) {
      console.error(`❌ Failed to start In-Memory MongoDB:`, memErr);
      process.exit(1);
    }
  }
};
