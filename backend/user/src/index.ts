import express from 'express';
import http from 'http';

import { connectDB } from './utils/database/mongo-connection';
import { MONGO_URL } from './config';
import { authRouter } from './routes';

const app = express();
const server = http.createServer(app);

const startServer = async () => {
  await connectDB(MONGO_URL);

  app.use(express.json());
  app.use(`/api/${process.env.VERSION}/auth`, authRouter)

  server.listen(3002, async () => {
    console.log('Listening on *:3002');
  });

  process.on('SIGINT', async () => {
    process.exit();
  });
};

startServer();
