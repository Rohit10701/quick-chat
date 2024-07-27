
import { Request, Response, NextFunction } from 'express';
import {UserModel} from '../models';

const UserController = {
    getAllUsers: async (req : Request, res : Response, next : NextFunction) => {
      try {
        const users = await UserModel.find();
        res.json(users);
      } catch (error) {
        next(error);
      }
    },
  
    getUserById: async (req : Request, res : Response, next : NextFunction) => {
      try {
        const user = await UserModel.findById(req.params.id);
        res.json(user);
      } catch (error) {
        next(error);
      }
    },
  
    createUser: async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { username, email, password, role } = req.body;
        const newUser = new UserModel({
          username,
          email,
          password,
          role
        });
        await newUser.save();
        res.status(201).json(newUser);
      } catch (error) {
        next(error);
      }
    },
  
    updateUser: async (req: Request, res: Response, next: NextFunction) => {
      try {
        const userId = req.params.id;
        const updateData = req.body;
  
        const updatedUser = await UserModel.findByIdAndUpdate(userId, updateData, { new: true, runValidators: true });
  
        if (!updatedUser) {
          return res.status(404).json({ message: 'User not found' });
        }
  
        res.json(updatedUser);
      } catch (error) {
        next(error);
      }
    },
  };
  
  export default UserController;
  
  
  