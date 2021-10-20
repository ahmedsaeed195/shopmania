const express = require('express');
const Router = express.Router();
const signUp = require('../controllers/SignUpController');
const sellerValidator = require('../middleware/validation/sellerValidator');
const customerValidator = require('../middleware/validation/customerValidator');
const adminValidator = require('../middleware/validation/adminValidator');

//TODO: test customer and seller signup
Router.post('/customer', customerValidator, signUp.registerCustomer);
Router.post('/seller', sellerValidator, signUp.registerSeller);
Router.post('/admin', adminValidator, signUp.registerAdmin);

module.exports = Router;