const request = require('supertest');
const app = require('../../src/app');

describe('Auth routes', () => {
  test('registers a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Test',
        email: 'test@example.com',
        password: 'password123'
      });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.token).toBeDefined();
  });

  test('rejects registration with missing fields', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ email: 'test@example.com' });

    expect(res.status).toBeGreaterThanOrEqual(400);
  });

  test('logs in with correct credentials', async () => {
    await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Test',
        email: 'login@example.com',
        password: 'password123'
      });

    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'login@example.com',
        password: 'password123'
      });

    expect(res.status).toBe(200);
    expect(res.body.data.token).toBeDefined();
  });
});