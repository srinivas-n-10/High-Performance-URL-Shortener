const Redis = require('ioredis');
const config = require('./index');

const redisClient = new Redis(config.redisUrl, {
  maxRetriesPerRequest: 1,
  enableOfflineQueue: false,
  retryStrategy: (times) => {
    return Math.min(times * 100, 2000);
  },
});

redisClient.on('connect', () => {
  console.log('Redis connected');
});

redisClient.on('error', (err) => {
  console.error('Redis error:', err.message);
});

module.exports = redisClient;