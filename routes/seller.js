const express = require('express');
const Router = express.Router();
const SellerController = require('../controllers/SellerController');
const loginValidator = require('../middleware/validation/loginValidator');
const sellerValidatorUpdate = require('../middleware/validation/sellerValidatorUpdate');
const postValidator = require('../middleware/validation/postsValidator');
const postValidatorUpdate = require('../middleware/validation/postsValidatorUpdate');
const sellerAuth = require('../middleware/authorization/sellerAuth');

//TODO: test seller and post routes
//seller
Router.get('/:id', SellerController.showOne);
Router.post('/',loginValidator, SellerController.login);
Router.put('/:id', sellerAuth, sellerValidatorUpdate, SellerController.updateSeller);

//post
Router.post('/post', sellerAuth, postValidator, SellerController.createPost);
Router.put('/post/:id', sellerAuth, postValidatorUpdate, SellerController.updatePost);
Router.delete('/post/:id', sellerAuth, SellerController.destroyPost);

module.exports = Router;