// controllers/authController.ts
import { Request, Response, NextFunction } from 'express';
import {UserModel} from '../models';
import jwt from 'jsonwebtoken';

const generateAccessToken = (user: { id: string }) => {
  return jwt.sign(user, process.env.JWT_SECRET!, { expiresIn: '15m' });
};

const generateRefreshToken = (user: { id: string }) => {
  return jwt.sign(user, process.env.JWT_REFRESH_SECRET!, { expiresIn: '7d' });
};

const AuthController = {
  register: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { username, email, password } = req.body;
      const existingUser = await UserModel.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }

      const newUser = new UserModel({ username, email, password });
      await newUser.save();
      const accessToken = generateAccessToken({ id: newUser._id });
      const refreshToken = generateRefreshToken({ id: newUser._id });
      newUser.refreshToken = refreshToken;
      await newUser.save();
      res.status(201).json({ accessToken, refreshToken });
    } catch (error) {
      next(error);
    }
  },

  login: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const user = await UserModel.findOne({ email });
      if (!user || !(await user.comparePassword(password))) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      const accessToken = generateAccessToken({ id: user._id });
      const refreshToken = generateRefreshToken({ id: user._id });
      user.refreshToken = refreshToken;
      await user.save();
      res.json({ accessToken, refreshToken });
    } catch (error) {
      next(error);
    }
  },

  refreshToken: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { token } = req.body;
      if (!token) {
        return res.status(401).json({ message: 'No token provided' });
      }

      const payload = jwt.verify(token, process.env.JWT_REFRESH_SECRET!) as { id: string; role: string };
      const user = await UserModel.findById(payload.id);
      if (!user || user.refreshToken !== token) {
        return res.status(403).json({ message: 'Invalid refresh token' });
      }

      const newAccessToken = generateAccessToken({ id: user._id });
      const newRefreshToken = generateRefreshToken({ id: user._id });
      user.refreshToken = newRefreshToken;
      await user.save();
      res.json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        return res.status(403).json({ message: 'Refresh token expired' });
      }
      next(error);
    }
  },
  
  logout: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.user;
      const user = await UserModel.findById(id);
      if (user) {
        user.refreshToken = null;
        await user.save();
      }
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  },
};

export default AuthController;
