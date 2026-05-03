import { prisma } from '../lib/prisma.js';

export class ExpenseService {
  async create(userId: string, data: { title: string; amount: number; category: 'Groceries' | 'Leisure' | 'Electronics' | 'Utilities' | 'Clothing' | 'Health' | 'Others'; date: string }) {
    return await prisma.expense.create({
      data: {
        ...data,
        userId,
        date: new Date(data.date),
      },
    });
  }
}
