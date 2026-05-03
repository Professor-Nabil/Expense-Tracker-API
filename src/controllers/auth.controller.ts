import type { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/auth.service.js';
import { SignUpSchema } from '../types/index.js'; // We need to export this

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
