const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const healthRoutes = require('./routes/health.routes');
const errorHandler = require('./middlewares/errorHandler');
const config = require('./config');

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan(config.env === 'development' ? 'dev' : 'combined'));

app.use('/health', healthRoutes);

app.use(errorHandler);

module.exports = app;