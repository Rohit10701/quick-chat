import { Router, Request, Response } from 'express';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.send('<h1>Welcome to Kafka Microservice</h1>');
});

export default router;