import { createClient, RedisClientType } from 'redis';

export class RedisClient {
  private client: RedisClientType;

  constructor() {
    this.client = createClient({
      url: 'redis://localhost:6379',
    });
    this.client.on('error', (err) => console.log('Redis Client Error', err));
  }

  public async connect(): Promise<void> {
    await this.client.connect();
    console.log('Redis client connected');
  }

  public async disconnect(): Promise<void> {
    await this.client.quit();
    console.log('Redis client disconnected');
  }

  public async set(key: string, value: string): Promise<void> {
    await this.client.set(key, value);
  }
}
