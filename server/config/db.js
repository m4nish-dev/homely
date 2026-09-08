import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`\x1b[36mMongoDB Connected: ${conn.connection.host}\x1b[0m`);
  } catch (error) {
    console.error(`\x1b[31mError connecting to MongoDB: ${error.message}\x1b[0m`);
    process.exit(1);
  }
};

// Listen for Mongoose disconnect events
mongoose.connection.on('disconnected', () => {
  console.warn('\x1b[33mMongoDB disconnected. Warning!\x1b[0m');
});

// Handle SIGINT gracefully (close connection on Ctrl+C)
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('\x1b[33mMongoDB connection closed due to app termination (SIGINT)\x1b[0m');
  process.exit(0);
});

export default connectDB;