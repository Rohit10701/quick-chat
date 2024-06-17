import { createClient, RedisClientType } from 'redis';

export const createRedisClient = (): RedisClientType => {
  const client = createClient({ url: 'redis://localhost:6379' });
  client.on('error', (err) => console.log('Redis Client Error', err));
  client.connect().then(() => console.log('Redis Client connected'));
  return client;
};
