const app = require('./app');
const config = require('./config');
const connectDB = require('./config/db');
const { connectProducer } = require('./services/kafkaProducer.service');
require('./config/redis');

connectDB()
  .then(() => connectProducer())
  .then(() => {
    app.listen(config.port, () => {
      console.log(`Server running in ${config.env} mode on port ${config.port}`);
    });
  });