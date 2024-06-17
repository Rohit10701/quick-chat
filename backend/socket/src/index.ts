import express from 'express';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import routes from './routes';
import { KafkaProducer, RedisClient, SocketHandler } from './services';
import expressApp from './utils/express-app';


const startServer = async () => {
  const kafkaProducer = new KafkaProducer();
  const redisClient = new RedisClient();

  await kafkaProducer.connect();
  await redisClient.connect();

  const app = express();
  const server = http.createServer(app);
  const io = new SocketIOServer(server);

  await expressApp(app)
  app.use(routes);

  const socketHandler = new SocketHandler(io, kafkaProducer, redisClient);
  socketHandler.init();

  const PORT = process.env.PORT || 3000;
  server.listen(PORT, () => {
    console.log(`Listening on *:${PORT}`);
  });

  process.on('SIGINT', async () => {
    await kafkaProducer.disconnect();
    await redisClient.disconnect();
    process.exit();
  });
};

startServer();
