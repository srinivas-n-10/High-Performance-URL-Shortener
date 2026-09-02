const express = require('express');
const { shortenLimiter } = require('../middlewares/rateLimiter');

const { shorten, getMyUrls } = require('../controllers/url.controller');
const protect = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('/shorten', shortenLimiter, shorten);
router.get('/my-urls', protect, getMyUrls);

module.exports = router;