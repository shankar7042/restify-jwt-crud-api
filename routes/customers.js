const errors = require('restify-errors');
const rjwt = require('restify-jwt-community');
const Customer = require('../models/Customer');
const config = require('../config');

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

  //Get Single Customer
  server.get('/customers/:id', async (req, res, next) => {
    try {
      const customers = await Customer.findById(req.params.id);
      res.send(customers);
      next();
    } catch (err) {
      return next(
        new errors.ResourceNotFoundError(
          `There is no customer with id ${req.params.id}`
        )
      );
    }
  });

  server.post(
    '/customers',
    rjwt({ secret: config.JWT_SECRET }),
    async (req, res, next) => {
      //Check for JSON
      if (!req.is('application/json')) {
        return next(
          new errors.InvalidContentError("Expects 'aplication/json'")
        );
      }

      const { name, email, balance } = req.body;

      const customer = new Customer({
        name,
        email,
        balance
      });

      try {
        const newCustomer = await customer.save();
        res.send(201);
        next();
      } catch (err) {
        return next(new errors.InternalError(err.message));
      }
    }
  );

  //Update Customer
  server.put(
    '/customers/:id',
    rjwt({ secret: config.JWT_SECRET }),
    async (req, res, next) => {
      //Check for JSON
      if (!req.is('application/json')) {
        return next(
          new errors.InvalidContentError("Expects 'aplication/json'")
        );
      }

      try {
        const customer = await Customer.findOneAndUpdate(
          { _id: req.params.id },
          req.body
        );
        res.send(200);
        next();
      } catch (err) {
        return next(
          new errors.ResourceNotFoundError(
            `There is no customer with id ${req.params.id}`
          )
        );
      }
    }
  );

  //Delete customer

  server.del(
    '/customers/:id',
    rjwt({ secret: config.JWT_SECRET }),
    async (req, res, next) => {
      try {
        const customer = await Customer.findOneAndRemove({
          _id: req.params.id
        });
        res.send(204);
        next();
      } catch (err) {
        return next(
          new errors.ResourceNotFoundError(
            `There is no customer with id ${req.params.id}`
          )
        );
      }
    }
  );
};
