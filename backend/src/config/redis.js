const Redis = require('ioredis');
const config = require('./index');

const redisClient = new Redis(config.redisUrl, {
  lazyConnect: true,
  retryStrategy: () => null,
});

redisClient.on('error', (err) => {
  if (config.env !== 'test') {
    console.error('Redis error:', err.message);
  }
});

module.exports = redisClient;