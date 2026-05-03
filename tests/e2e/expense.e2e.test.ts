import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import { app } from '../../src/app.js';
import { prisma } from '../../src/lib/prisma.js';

describe('Expense E2E', () => {
  let token: string;

  beforeAll(async () => {
    await prisma.expense.deleteMany();
    await prisma.user.deleteMany();

    // Setup: Register and Login to get a token
    const email = 'e2e-expense@test.com';
    const password = 'password123';
    await request(app).post('/auth/register').send({ email, password });
    const loginRes = await request(app).post('/auth/login').send({ email, password });
    token = loginRes.body.token;
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('should create and list expenses', async () => {
    // 1. Create
    const createRes = await request(app)
      .post('/expenses')
      .set('Authorization', `Bearer ${token}`)
      .send({ 
        title: 'Dinner', 
        amount: 25.0, 
        category: 'Leisure', 
        date: new Date().toISOString() 
      });
    expect(createRes.status).toBe(201);

    // 2. List
    const listRes = await request(app)
      .get('/expenses')
      .set('Authorization', `Bearer ${token}`);
    expect(listRes.status).toBe(200);
    expect(Array.isArray(listRes.body)).toBe(true);
    expect(listRes.body.length).toBe(1);
    expect(listRes.body[0].title).toBe('Dinner');
  });
});
