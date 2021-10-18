const express = require('express');
const Router = express.Router();
const CustomerController = require('../controllers/CustomerController');

Router.get('/',CustomerController.showAll);
Router.get('/:id',CustomerController.showOne);
Router.post('/',CustomerController.login);
Router.post('/order',CustomerController.makeOrder);
Router.put('/:id',CustomerController.updateCustomer);
Router.put('/order/:id',CustomerController.updateOrder);
Router.delete('/order/:id',CustomerController.destroyOrder);

module.exports = Router;