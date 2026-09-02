const rateLimit = require('express-rate-limit');

const shortenLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
  message: {
    success: false,
    message: 'Too many requests, try again later',
  },
});

module.exports = { shortenLimiter };