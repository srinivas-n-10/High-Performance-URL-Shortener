const request = require('supertest');
const app = require('../../src/app');

describe('URL routes', () => {
  let token;

  beforeAll(async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'URL Test User',
        email: `urltest${Date.now()}@example.com`,
        password: 'password123'
      });

    token = res.body.data.token;
  });

  test('creates a short url', async () => {
    const res = await request(app)
      .post('/api/url/shorten')
      .set('Authorization', `Bearer ${token}`)
      .send({
        longUrl: 'https://example.com'
      });

    expect(res.status).toBe(201);
    expect(res.body.data.shortCode).toBeDefined();
  });

  test('rejects missing longUrl', async () => {
    const res = await request(app)
      .post('/api/url/shorten')
      .set('Authorization', `Bearer ${token}`)
      .send({});

    expect(res.status).toBe(400);
  });

  test('redirects to the long url', async () => {
    const createRes = await request(app)
      .post('/api/url/shorten')
      .set('Authorization', `Bearer ${token}`)
      .send({
        longUrl: 'https://example.com'
      });

    expect(createRes.status).toBe(201);

    const shortCode = createRes.body.data.shortCode;

    const res = await request(app).get(`/${shortCode}`);

    expect(res.status).toBe(302);
    expect(res.headers.location).toBe('https://example.com');
  });

  test('returns 404 for unknown code', async () => {
    const res = await request(app).get('/doesnotexist123');

    expect(res.status).toBe(404);
  });
});