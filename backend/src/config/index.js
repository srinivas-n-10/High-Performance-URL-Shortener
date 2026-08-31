require('dotenv').config();

const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 5000,
  mongoUri: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  redisUrl: process.env.REDIS_URL,
  kafkaBroker: process.env.KAFKA_BROKER,
  kafkaClientId: process.env.KAFKA_CLIENT_ID,
  kafkaClickTopic: process.env.KAFKA_CLICK_TOPIC,
};

module.exports = config;