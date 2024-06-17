import { EachMessagePayload, Consumer } from 'kafkajs';
import { Socket } from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';
import { RedisClientType } from 'redis';
import Message from '../models/message';

const processMessage = async ({ topic, partition, message }: EachMessagePayload, redisClient: RedisClientType, socket: Socket) => {
  const messageContent = JSON.parse(message?.value?.toString());
  const messageId = uuidv4(); // Generate unique ID for the message
  console.log(`Received message from topic ${topic}:`, messageContent);

  const { senderId, receiverId, message: msg } = messageContent;

  const completeMessage = {
    messageId,
    senderId,
    receiverId,
    message: msg,
    timestamp: new Date(),
  };

  socket.emit('messageToRoom', completeMessage);

  await redisClient.set(
    `message:${messageId}`,
    JSON.stringify(completeMessage),
    { EX: 960 }
  );
};

export const connectConsumer = async (consumer: Consumer, redisClient: RedisClientType, socket: Socket) => {
  try {
    await consumer.connect();
    console.log("Kafka consumer connected successfully!");
    await consumer.subscribe({ topic: 'messages', fromBeginning: true });
    await consumer.run({ eachMessage: async (payload) => processMessage(payload, redisClient, socket) });
  } catch (error) {
    console.error("Error while connecting Kafka consumer", error);
  }
};
