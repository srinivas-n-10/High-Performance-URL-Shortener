const parseRequestMeta = require('../utils/parseRequestMeta');
const {
  createShortUrl,
  getUrlByCode,
  getUrlsByUser
} = require('../services/url.service');
const { publishClickEvent } = require('../services/kafkaProducer.service');

async function shorten(req, res, next) {
  try {
    const { longUrl, customAlias } = req.body;

    if (!longUrl) {
      const error = new Error('longUrl is required');
      error.statusCode = 400;
      throw error;
    }

    const url = await createShortUrl({
      longUrl,
      customAlias,
      userId: req.userId || null,
    });

    res.status(201).json({
      success: true,
      data: {
        shortCode: url.shortCode,
        longUrl: url.longUrl,
        shortUrl: `${req.protocol}://${req.get('host')}/${url.shortCode}`,
      },
    });

  } catch (err) {
    next(err);
  }
}


async function redirect(req, res, next) {
  try {
    const { shortCode } = req.params;

    const url = await getUrlByCode(shortCode);

    const meta = parseRequestMeta(req);

    publishClickEvent({
      urlId: url._id,
      ...meta,
      timestamp: new Date(),
    }).catch((err) =>
      console.error('Failed to publish click event:', err.message)
    );

    res.redirect(url.longUrl);
  } catch (err) {
    next(err);
  }
}
async function getMyUrls(req, res, next) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;

    const result = await getUrlsByUser(req.userId, page, limit);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  shorten,
  redirect,
  getMyUrls
};