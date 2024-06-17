import cron from 'node-cron';
import { RedisClientType } from 'redis';
import { flushMessagesToDB } from '../services/message';

export const setupCronJob = (redisClient: RedisClientType) => {
  cron.schedule('*/3 * * * *', () => flushMessagesToDB(redisClient));
};
