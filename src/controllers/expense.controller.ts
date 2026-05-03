import type { Request, Response, NextFunction } from 'express';
import { ExpenseService } from '../services/expense.service.js';
import { ExpenseSchema } from '../types/index.js';

const expenseService = new ExpenseService();

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = ExpenseSchema.parse(req.body);
    const userId = (req as any).user.id;
    const expense = await expenseService.create(userId, data);
    res.status(201).json(expense);
  } catch (error) {
    next(error);
  }
};

export const list = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user.id;
    const limit = parseInt(req.query.limit as string) || 10;
    const offset = parseInt(req.query.offset as string) || 0;
    const expenses = await expenseService.list(userId, { limit, offset });
    res.status(200).json(expenses);
  } catch (error) {
    next(error);
  }
};

export const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user.id;
    const { id } = req.params;
    if (typeof id !== 'string') {
        throw new Error('Invalid expense ID');
    }
    await expenseService.remove(id, userId);
    res.status(200).json({ message: 'Expense deleted successfully' });
  } catch (error) {
    next(error);
  }
};
