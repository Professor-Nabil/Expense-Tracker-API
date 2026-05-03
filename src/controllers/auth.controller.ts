import type { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/auth.service.js';
import { SignUpSchema, LoginSchema } from '../types/index.js';
import jwt from 'jsonwebtoken';

const authService = new AuthService();

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = SignUpSchema.parse(req.body);
    const user = await authService.register(data.email, data.password);
    res.status(201).json({ userId: user.id, message: 'User created successfully' });
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = LoginSchema.parse(req.body);
    const user = await authService.login(data.email, data.password);
    
    // Check JWT_SECRET
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined');
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};
