import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import { app } from '../../src/app.js';
import { prisma } from '../../src/lib/prisma.js';

describe('Auth E2E', () => {
  beforeAll(async () => {
    // Ensure we start with a clean state
    await prisma.expense.deleteMany();
    await prisma.user.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('should register and login a user', async () => {
    const email = 'e2e@test.com';
    const password = 'password123';

    // 1. Register
    const regRes = await request(app)
      .post('/auth/register')
      .send({ email, password });
    expect(regRes.status).toBe(201);
    expect(regRes.body.userId).toBeDefined();

    // 2. Login
    const loginRes = await request(app)
      .post('/auth/login')
      .send({ email, password });
    expect(loginRes.status).toBe(200);
    expect(loginRes.body.token).toBeDefined();
  });
});
