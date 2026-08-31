const app = require('./app');
const config = require('./config');
const connectDB = require('./config/db');
require('./config/redis');

connectDB().then(() => {
  app.listen(config.port, () => {
    console.log(`Server running in ${config.env} mode on port ${config.port}`);
  });
});