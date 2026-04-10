import mongoose from 'mongoose';
import config from './index.js';

export async function connectDB(): Promise<void> {
  try {
    await mongoose.connect(config.mongodbUri);
    console.log('✓ MongoDB connected');
  } catch (error) {
    console.error('✗ MongoDB connection failed:', error);
    process.exit(1);
  }
}
