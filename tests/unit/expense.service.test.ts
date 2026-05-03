import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ExpenseService } from '../../src/services/expense.service.js';
import { prisma } from '../../src/lib/prisma.js';

vi.mock('../../src/lib/prisma', () => ({
  prisma: {
    expense: {
      create: vi.fn(),
      findMany: vi.fn(),
      delete: vi.fn(),
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

  it('should list expenses with filters', async () => {
    const mockExpenses = [{ id: 'exp-1', title: 'Lunch' }];
    vi.mocked(prisma.expense.findMany).mockResolvedValue(mockExpenses as any);

    const service = new ExpenseService();
    const result = await service.list('user-1', { limit: 10, offset: 0 });

    expect(result).toEqual(mockExpenses);
    expect(prisma.expense.findMany).toHaveBeenCalledWith(expect.objectContaining({
      where: { userId: 'user-1' },
      take: 10,
      skip: 0
    }));
  });

  it('should remove an expense', async () => {
    vi.mocked(prisma.expense.delete).mockResolvedValue({ id: 'exp-1' } as any);

    const service = new ExpenseService();
    const result = await service.remove('exp-1', 'user-1');

    expect(result.id).toBe('exp-1');
    expect(prisma.expense.delete).toHaveBeenCalledWith({
      where: { id: 'exp-1', userId: 'user-1' }
    });
  });

  it('should throw error if expense not found during removal', async () => {
    vi.mocked(prisma.expense.delete).mockRejectedValue(new Error('Record to delete does not exist.'));

    const service = new ExpenseService();
    await expect(service.remove('nonexistent', 'user-1')).rejects.toThrow();
  });
