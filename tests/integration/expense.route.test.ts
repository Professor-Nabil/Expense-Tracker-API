import { describe, it, expect, vi } from 'vitest';
import request from 'supertest';
import { app } from '../../src/app.js';
import { prisma } from '../../src/lib/prisma.js';
import jwt from 'jsonwebtoken';

vi.mock('../../src/lib/prisma', () => ({
  prisma: {
    expense: {
      create: vi.fn(),
      findMany: vi.fn(),
      delete: vi.fn(),
    },
  },
}));

describe('Expense Routes (Integration)', () => {
  const token = jwt.sign({ id: 'user-1' }, 'testsecret');

  it('POST /expenses - should create expense', async () => {
    vi.mocked(prisma.expense.create).mockResolvedValue({ id: 'e1' } as any);
    
    const res = await request(app)
      .post('/expenses')
      .set('Authorization', `Bearer ${token}`)
      .send({ 
        title: 'Lunch', 
        amount: 15.5, 
        category: 'Leisure', 
        date: new Date().toISOString() 
      });

    expect(res.status).toBe(201);
  });
});
