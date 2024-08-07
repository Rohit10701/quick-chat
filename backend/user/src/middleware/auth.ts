import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

declare module 'express-serve-static-core' {
  interface Request {
    user: { id: string };
  }
}

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    console.log(decoded)
    req.user = decoded as { id: string };
    next();
  } catch (error) {
    console.log(error)
    res.status(400).json({ message: 'Invalid token.' });
  }
};

export default authMiddleware;
