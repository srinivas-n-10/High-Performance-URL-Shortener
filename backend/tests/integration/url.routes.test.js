const request = require('supertest');
const app = require('../../src/app');

describe('URL routes', () => {
  test('creates a short url', async () => {
    const res = await request(app)
      .post('/api/url/shorten')
      .send({ longUrl: 'https://example.com' });

    expect(res.status).toBe(201);
    expect(res.body.data.shortCode).toBeDefined();
  });

  test('rejects missing longUrl', async () => {
    const res = await request(app)
      .post('/api/url/shorten')
      .send({});

    expect(res.status).toBe(400);
  });

  test('redirects to the long url', async () => {
    const createRes = await request(app)
      .post('/api/url/shorten')
      .send({ longUrl: 'https://example.com' });

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