// app
const express = require('express');
const app = express();

// Env variables
const config = require('./config');

// logging variables
for (const key in config) {
  if (config[key]) {
    console.log(key); //eslint-disable-line
    console.table(config[key]); //eslint-disable-line
  }
}
// Middlewares
const logger = require('./middlewares/logHandler');
const notFound = require('./middlewares/notFoundHandler');
const errorHandler = require('./middlewares/errorHandler');

// Routes
const general = require('./api/routes');

// BodyParser
app.use(
  express.json({
    limit: '100mb',
  })
);

// Headers

// Cookies

// Logger middleware
app.use(logger);

// Routes
if (!config.server.maintenance) {
  app.use(general);
}

// Catch 404
app.use(notFound);

// Error Handler
app.use(errorHandler);

module.exports = app;
