import { logger } from '@constants';
import mongoose from 'mongoose';

async function connectToMongoDB() {
  try {
    const { MONGODB_URL } = process.env;
    mongoose.set('strictQuery', true);
    await mongoose.connect(`${MONGODB_URL}`, {});
    logger.info('Connected to database');
  } catch (error: any) {
    console.log(`error: ${error.message}`);
  }
}
export { connectToMongoDB };
