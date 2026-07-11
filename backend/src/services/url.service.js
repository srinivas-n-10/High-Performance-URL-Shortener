const Url = require('../models/url.model');
const generateShortCode = require('../utils/generateShortCode');

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
  const url = await Url.findOne({
    shortCode,
    isActive: true
  });

  if (!url) {
    const error = new Error('Short URL not found');
    error.statusCode = 404;
    throw error;
  }

  return url;
}


module.exports = {
  createShortUrl,
  getUrlByCode
};