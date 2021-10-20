const express = require('express');
const Router = express.Router();
const CustomerController = require('../controllers/CustomerController');
const loginValidator = require('../middleware/validation/loginValidator');
const customerValidatorUpdate = require('../middleware/validation/customerValidatorUpdate');
const orderValidator = require('../middleware/validation/orderValidator');
const orderValidatorUpdate = require('../middleware/validation/orderValidatorUpdate');
const customerAuth = require('../middleware/authorization/customerAuth');


//TODO: test customer and order routes
//customer
Router.get('/:id', CustomerController.showOne);
Router.post('/', loginValidator, CustomerController.login);
Router.put('/:id', customerAuth, customerValidatorUpdate, CustomerController.updateCustomer);

//order
Router.post('/order', customerAuth, orderValidator, CustomerController.makeOrder);
Router.put('/order/:id', customerAuth, orderValidatorUpdate, CustomerController.updateOrder);
Router.delete('/order/:id', customerAuth, CustomerController.destroyOrder);

module.exports = Router;