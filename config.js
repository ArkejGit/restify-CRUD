'use strict';

module.exports = {
  ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 3000,
  URL: process.env.BASE_URL || 'http://localhost:3000',
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://arkej123:arkej123@ds253243.mlab.com:53243/restify-crud',
  JWT_SECRET: process.env.JWT_SECRET || 'dev_secret',
};
