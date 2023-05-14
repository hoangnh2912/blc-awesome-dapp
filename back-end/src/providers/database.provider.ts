import { logger } from '@constants';
import mongoose from 'mongoose';

async function connectToMongoDB() {
  const { MONGODB_URL, DOCKER_MODE } = process.env;
  console.log('MONGODB_URL', MONGODB_URL);
  console.log('DOCKER_MODE', DOCKER_MODE);
  await mongoose.connect(
    DOCKER_MODE == 'docker' ? `mongodb://db:27017/music` : `${MONGODB_URL}`,
    {},
  );
  logger.info('Connected to database');
}
export { connectToMongoDB };
