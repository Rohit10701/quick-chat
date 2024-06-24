import { Router } from 'express';
import { AuthController } from '../controllers';
import { authMiddleware } from '../middleware';


const authRouter = Router();
authRouter.post('/register', AuthController.register);
authRouter.post('/login', AuthController.login);
authRouter.post('/refresh-token', AuthController.refreshToken);
authRouter.post('/logout', authMiddleware, AuthController.logout);

export default authRouter;
