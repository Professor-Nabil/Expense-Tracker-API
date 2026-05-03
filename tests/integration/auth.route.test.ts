import { describe, it, expect, vi } from 'vitest';
import request from 'supertest';
import { app } from '../../src/app.js';
import { prisma } from '../../src/lib/prisma.js';
import * as argon2 from 'argon2';

vi.mock('../../src/lib/prisma', () => ({
  prisma: {
    user: {
      create: vi.fn(),
      findUnique: vi.fn(),
    },
  },
}));

vi.mock('argon2', () => ({
  verify: vi.fn(),
  hash: vi.fn(),
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

  it('POST /auth/login - should return token on success', async () => {
    vi.mocked(prisma.user.findUnique).mockResolvedValue({ id: 'u1', password: 'hashedpassword' } as any);
    vi.mocked(argon2.verify).mockResolvedValue(true);

    const res = await request(app)
      .post('/auth/login')
      .send({ email: 'test@test.com', password: 'password123' });

    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
  });
});
