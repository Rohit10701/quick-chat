import express from 'express';
import http from 'http';
import { io } from 'socket.io-client';

import { setupCronJob } from './utils/cron';
import { connectDB } from './utils/database/mongo-connection';
import { createRedisClient } from './utils/redis/connection';
import { createKafkaConsumer } from './utils/kafka/connection';
import { MONGO_URL } from './config';
import createMessageRoutes from './routes/message';
import { connectConsumer } from './services/kafkaConsumer';


const app = express();
const server = http.createServer(app);
const socket = io('ws://localhost:3000');

const startServer = async () => {
  await connectDB(MONGO_URL);
  const redisClient = createRedisClient();
  const kafkaConsumer = createKafkaConsumer('messaging-app', ['localhost:9092'], 'message-consumers');

  app.use(express.json());
  app.use('/api', createMessageRoutes(redisClient));

  setupCronJob(redisClient);

  server.listen(3001, async () => {
    console.log('Listening on *:3001');
    await connectConsumer(kafkaConsumer, redisClient, socket);
  });

  process.on('SIGINT', async () => {
    await kafkaConsumer.disconnect();
    process.exit();
  });
};

startServer();
