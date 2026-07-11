const { UAParser } = require('ua-parser-js');
const geoip = require('geoip-lite');

function parseRequestMeta(req) {
  const ua = new UAParser(req.headers['user-agent']);
  const result = ua.getResult();

  const ip =
    req.headers['x-forwarded-for']?.split(',')[0] ||
    req.socket.remoteAddress;

  const geo = geoip.lookup(ip);

  return {
    device: result.device.type || 'desktop',
    browser: result.browser.name || 'unknown',
    os: result.os.name || 'unknown',
    country: geo?.country || 'unknown',
    referrer: req.headers.referer || 'direct',
  };
}

module.exports = parseRequestMeta;