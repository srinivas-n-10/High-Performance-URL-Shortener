const { createShortUrl, getUrlByCode } = require('../services/url.service');

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

    res.redirect(url.longUrl);

  } catch (err) {
    next(err);
  }
}


module.exports = {
  shorten,
  redirect,
};