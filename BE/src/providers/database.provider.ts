import { logger } from '@constants';
import mongoose from 'mongoose';

async function connectToMongoDB() {
  const MONGO_URL="mongodb+srv://trachchung:anhtrung1@testingmongodb.42lyhqt.mongodb.net/?retryWrites=true&w=majority"
  await mongoose.connect(`${MONGO_URL}`, {});
  logger.info('Connected to database');
}
export { connectToMongoDB };
