const express = require('express');

const { shorten, getMyUrls } = require('../controllers/url.controller');
const protect = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('/shorten', shorten);
router.get('/my-urls', protect, getMyUrls);

module.exports = router;