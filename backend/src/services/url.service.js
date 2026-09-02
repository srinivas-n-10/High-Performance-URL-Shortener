const Url = require('../models/url.model');
const generateShortCode = require('../utils/generateShortCode');
const redisClient = require('../config/redis');

const CACHE_TTL_SECONDS = 3600;

const MAX_RETRIES = 5;

async function createShortUrl({ longUrl, customAlias, userId }) {
  let shortCode;

  if (customAlias) {
    const existing = await Url.findOne({ shortCode: customAlias });

    if (existing) {
      const error = new Error('Custom alias already taken');
      error.statusCode = 409;
      throw error;
    }

    shortCode = customAlias;
  } else {
    shortCode = await generateUniqueCode();
  }

  const url = await Url.create({
    longUrl,
    shortCode,
    owner: userId || null,
    customAlias: !!customAlias,
  });

  return url;
}


async function generateUniqueCode() {
  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    const code = generateShortCode();

    const existing = await Url.findOne({
      shortCode: code
    });

    if (!existing) {
      return code;
    }
  }

  throw new Error('Failed to generate unique short code');
}


async function getUrlByCode(shortCode) {
  const cacheKey = `url:${shortCode}`;

  try {
    let cached = null;

    if (redisClient.status === 'ready') {
      cached = await redisClient.get(cacheKey);
    }

    if (cached) {
      const url = JSON.parse(cached);

      // Don't wait for MongoDB click-count update.
      Url.updateOne(
        { _id: url._id },
        { $inc: { clickCount: 1 } }
      ).exec();

      return url;
    }
  } catch (err) {
    console.error('Redis cache error:', err.message);
  }

  const url = await Url.findOneAndUpdate(
    { shortCode, isActive: true },
    { $inc: { clickCount: 1 } },
    { returnDocument: 'after' }
  );
  

  if (!url) {
    const error = new Error('Short URL not found');
    error.statusCode = 404;
    throw error;
  }

  if (url.expiresAt && url.expiresAt < new Date()) {
    const error = new Error('This short URL has expired');
    error.statusCode = 410;
    throw error;
  }

  try {
    await redisClient.set(
      cacheKey,
      JSON.stringify(url),
      'EX',
      CACHE_TTL_SECONDS
    );
  } catch (err) {
    console.error('Redis cache error:', err.message);
  }

  return url;
}
async function getUrlsByUser(userId, page = 1, limit = 20) {
  const skip = (page - 1) * limit;

  const [urls, total] = await Promise.all([
    Url.find({ owner: userId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),
    Url.countDocuments({ owner: userId }),
  ]);

  return { urls, total, page, limit };
}

module.exports = {
  createShortUrl,
  getUrlByCode,
  getUrlsByUser
};
