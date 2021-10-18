const express = require('express');
const Router = express.Router();
const signUp = require('../controllers/SignUpController');

Router.post('/customer',signUp.registerCustomer);
Router.post('/seller',signUp.registerSeller);

module.exports = Router;