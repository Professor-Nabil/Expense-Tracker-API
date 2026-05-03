import { describe, it, expect, vi } from 'vitest';
import request from 'supertest';
import { app } from '../../src/app.js';
import { prisma } from '../../src/lib/prisma.js';

vi.mock('../../src/lib/prisma', () => ({
  prisma: {
    user: {
      create: vi.fn(),
      findUnique: vi.fn(),
    },
  },
}));

describe('Auth Routes (Integration)', () => {
  it('POST /auth/register - should create a user', async () => {
    vi.mocked(prisma.user.create).mockResolvedValue({ id: 'u1' } as any);
    
    const res = await request(app)
      .post('/auth/register')
      .send({ email: 'test@test.com', password: 'password123' });

    expect(res.status).toBe(201);
    expect(res.body.userId).toBe('u1');
  });
});
