const {
  createShortUrl,
  getUrlByCode
} = require('../../src/services/url.service');

describe('url.service', () => {
  test('createShortUrl generates a 7-character code', async () => {
    const url = await createShortUrl({
      longUrl: 'https://example.com',
      userId: null
    });

    expect(url.shortCode).toHaveLength(7);
    expect(url.longUrl).toBe('https://example.com');
  });

  test('createShortUrl respects a custom alias', async () => {
    const url = await createShortUrl({
      longUrl: 'https://example.com',
      customAlias: 'my-alias',
      userId: null
    });

    expect(url.shortCode).toBe('my-alias');
  });

  test('createShortUrl rejects a duplicate custom alias', async () => {
    await createShortUrl({
      longUrl: 'https://a.com',
      customAlias: 'taken',
      userId: null
    });

    await expect(
      createShortUrl({
        longUrl: 'https://b.com',
        customAlias: 'taken',
        userId: null
      })
    ).rejects.toMatchObject({
      statusCode: 409
    });
  });

  test('getUrlByCode throws 404 for a nonexistent code', async () => {
    await expect(
      getUrlByCode('doesnotexist')
    ).rejects.toMatchObject({
      statusCode: 404
    });
  });
});