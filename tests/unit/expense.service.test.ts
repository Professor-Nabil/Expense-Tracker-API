import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ExpenseService } from '../../src/services/expense.service.js';
import { prisma } from '../../src/lib/prisma.js';

vi.mock('../../src/lib/prisma', () => ({
  prisma: {
    expense: {
      create: vi.fn(),
    },
  },
}));

describe('ExpenseService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should create a new expense', async () => {
    const mockExpense = {
      id: 'exp-1',
      userId: 'user-1',
      title: 'Lunch',
      amount: 15.5,
      category: 'Leisure',
      date: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    vi.mocked(prisma.expense.create).mockResolvedValue(mockExpense as any);

    const service = new ExpenseService();
    const result = await service.create('user-1', {
      title: 'Lunch',
      amount: 15.5,
      category: 'Leisure',
      date: new Date().toISOString(),
    });

    expect(result).toEqual(mockExpense);
  });
});
