import jwt from 'jsonwebtoken';

export const generateAccessToken = (user: { id: string }) => {
    return jwt.sign(user, process.env.JWT_SECRET!, { expiresIn: '15m' });
  };
  
export const generateRefreshToken = (user: { id: string }) => {
    return jwt.sign(user, process.env.JWT_REFRESH_SECRET!, { expiresIn: '7d' });
  };