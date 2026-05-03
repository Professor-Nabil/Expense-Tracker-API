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
      update: vi.fn(),
    },
  },
}));

describe('Expense Routes (Integration)', () => {
  const token = jwt.sign({ id: 'user-1' }, process.env.JWT_SECRET as string);

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

  it('PUT /expenses/:id - should update expense', async () => {
    vi.mocked(prisma.expense.update).mockResolvedValue({ id: 'e1', title: 'Dinner' } as any);
    
    const res = await request(app)
      .put('/expenses/e1')
      .set('Authorization', `Bearer ${token}`)
      .send({ 
        title: 'Dinner', 
        amount: 20.0, 
        category: 'Leisure', 
        date: new Date().toISOString() 
      });

    expect(res.status).toBe(200);
    expect(res.body.title).toBe('Dinner');
  });

  it('DELETE /expenses/:id - should delete expense', async () => {
    vi.mocked(prisma.expense.delete).mockResolvedValue({ id: 'e1' } as any);
    
    const res = await request(app)
      .delete('/expenses/e1')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
  });
});
