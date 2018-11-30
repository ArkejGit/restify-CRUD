'use strict';

const restify = require('restify');
const mongoose = require('mongoose');
const rjwt = require('restify-jwt-community');
const config = require('./config');

const server = restify.createServer();

server.use(restify.plugins.bodyParser());

server.use(rjwt({ secret: config.JWT_SECRET }).unless({ path: ['/auth'] }));

server.listen(config.PORT, () => {
  mongoose.set('useFindAndModify', false);
  mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true });
});

const db = mongoose.connection;

db.on('error', (err) => {
  throw err;
});

db.once('open', () => {
  require('./routes/customers')(server); // eslint-disable-line global-require
  require('./routes/users')(server); // eslint-disable-line global-require
});
