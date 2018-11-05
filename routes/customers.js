'use strict';

const errors = require('restify-errors');
const Customer = require('../models/Customer');

module.exports = (server) => {
  server.get('/customers', async (req, res, next) => {
    try {
      const customers = await Customer.find({});
      res.send(customers);
      next();
    } catch (err) {
      return next(new errors.InvalidContentError(err));
    }
  });

  server.post('/customers', async (req, res, next) => {
    if (!req.is('application/json')) {
      return next(new errors.InvalidContentError("Expects 'application/json'"));
    }

    const { name, email, balance } = req.body;

    const customer = new Customer({
      name,
      email,
      balance,
    });

    try {
      const newCustomer = await customer.save(); // eslint-disable-line no-unused-vars
      res.send(201);
      next();
    } catch (err) {
      return next(new errors.InternalError(err.message));
    }
  });
};
