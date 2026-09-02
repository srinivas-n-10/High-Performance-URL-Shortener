const request = require('supertest');
const app = require('../../src/app');

describe('Protected routes', () => {
  test('rejects request without token', async () => {
    const res = await request(app)
      .get('/api/url/my-urls');

    expect(res.status).toBe(401);
  });

  test('succeeds with a valid token', async () => {
    const registerRes = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Test',
        email: 'protected@example.com',
        password: 'password123'
      });

    const token = registerRes.body.data.token;

    const res = await request(app)
      .get('/api/url/my-urls')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.data.urls).toEqual([]);
  });
});