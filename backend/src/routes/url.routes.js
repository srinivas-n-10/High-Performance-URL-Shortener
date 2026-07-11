const express = require('express');
const { shorten } = require('../controllers/url.controller');

const router = express.Router();

router.post('/shorten', shorten);

module.exports = router;