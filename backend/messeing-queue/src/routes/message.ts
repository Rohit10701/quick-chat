import { Router, Request, Response } from 'express';
import { RedisClientType } from 'redis';

const router = Router();

export const createMessageRoutes = (redisClient: RedisClientType) => {
  router.put('/message/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const { message } = req.body;
    try {
      const messageKey = `message:${id}`;
      const existingMessage = await redisClient.get(messageKey);
      if (!existingMessage) {
        return res.status(404).json({ error: 'Message not found or already saved' });
      }

      const updatedMessage = { ...JSON.parse(existingMessage), message };
      await redisClient.set(messageKey, JSON.stringify(updatedMessage), { EX: 900 });

      res.json(updatedMessage);
    } catch (error) {
      res.status(500).json({ error: 'Error updating message' });
    }
  });

  router.delete('/message/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const messageKey = `message:${id}`;
      const existingMessage = await redisClient.get(messageKey);
      if (!existingMessage) {
        return res.status(404).json({ error: 'Message not found or already saved' });
      }

      await redisClient.del(messageKey);

      res.json({ message: 'Message deleted' });
    } catch (error) {
      res.status(500).json({ error: 'Error deleting message' });
    }
  });

  return router;
};

export default createMessageRoutes;
