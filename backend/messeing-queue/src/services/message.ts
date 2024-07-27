import { RedisClientType } from 'redis';
import Message, { IMessage } from '../models/message';

export const saveMessageToDB = async (messages: IMessage[]) => {
  try {
    await Message.insertMany(messages);
  } catch (error) {
    console.error('Error saving message to MongoDB:', error);
  }
};

export const flushMessagesToDB = async (redisClient: RedisClientType) => {
  try {
    const keys = await redisClient.keys('message:*');
    if (keys.length === 0) return;

    const messages: IMessage[] = [];
    for (const key of keys) {
      const message = await redisClient.get(key);
      if (message) {
        messages.push(JSON.parse(message));
        await redisClient.del(key);
      }
    }

    await saveMessageToDB(messages);
    console.log('Flushed messages to DB:', messages);
  } catch (error) {
    console.error('Error flushing messages to DB:', error);
  }
};
