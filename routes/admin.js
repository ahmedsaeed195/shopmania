const express = require('express');
const Router = express.Router();
const AdminController = require('../controllers/AdminController');
const loginValidator = require('../middleware/validation/loginValidator');
const customerValidatorUpdate = require('../middleware/validation/customerValidatorUpdate');
const orderValidatorUpdate = require('../middleware/validation/orderValidatorUpdate');
const sellerValidatorUpdate = require('../middleware/validation/sellerValidatorUpdate');
const postValidatorUpdate = require('../middleware/validation/postsValidatorUpdate');
const productValidator = require('../middleware/validation/productValidator');
const productValidatorUpdate = require('../middleware/validation/productValidatorUpdate');
const adminAuth = require('../middleware/authorization/adminAuth');

//admin login
Router.post('', loginValidator, AdminController.login);

//customer
Router.get('/customer/', adminAuth, AdminController.showAllCustomers);
Router.get('/customer/:id', adminAuth, AdminController.showOneCustomer);
Router.put('/customer/:id', adminAuth, customerValidatorUpdate, AdminController.updateCustomer);
Router.delete('/customer/:id', adminAuth, AdminController.destroyCustomer);

//seller
Router.get('/seller/', adminAuth, AdminController.showAllSellers);
Router.get('/seller/:id', adminAuth, AdminController.showOneSeller);
Router.put('/seller/:id', adminAuth, sellerValidatorUpdate, AdminController.updateSeller);
Router.delete('/seller/:id', adminAuth, AdminController.destroySeller);

//order
Router.get('/order/', adminAuth, AdminController.showAllOrders);
Router.get('/order/:id', adminAuth, AdminController.showOneOrder);
Router.put('/order/:id', adminAuth, orderValidatorUpdate, AdminController.updateOrder);
Router.delete('/order/:id', adminAuth, AdminController.destroyOrder);

//post
Router.get('/post/', adminAuth, AdminController.showAllPosts);
Router.get('/post/:id', adminAuth, AdminController.showOnePost);
Router.put('/post/:id', adminAuth, postValidatorUpdate, AdminController.updatePost);
Router.delete('/post/:id', adminAuth, AdminController.destroyPost);

//prodcut
Router.get('/product/', adminAuth, AdminController.showAllProducts);
Router.get('/product/:id', adminAuth, AdminController.showOneProduct);
Router.post('/product', adminAuth, productValidator, AdminController.addProduct);
Router.put('/product/:id', adminAuth, productValidatorUpdate, AdminController.updateProduct);
Router.delete('/product/:id', adminAuth, AdminController.destroyProduct);

module.exports = Router;