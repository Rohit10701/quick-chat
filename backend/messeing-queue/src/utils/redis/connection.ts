import { RedisClientType, createClient } from 'redis';

export const createRedisClient = (): RedisClientType | never => {
  const clientOpts = { url: 'redis://localhost:6379' };
  const client = createClient(clientOpts) as RedisClientType; // Cast to disable type checking

  client.on('error', (err) => console.log('Redis Client Error', err));
  client.on('connect', () => console.log('Redis Client connected'));

  return client;
};
