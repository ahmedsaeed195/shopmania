const express = require('express');
const Router = express.Router();
const signUp = require('./signUp');
const customer = require('./customer');
const seller = require('./seller');
const admin = require('./admin');
//Default route

Router.get('', (req, res) => {
    res.render('index', { title: 'Shopmania', condition: false });
});
Router.use('/api/admin', admin);
Router.use('/api/signup',signUp);
Router.use('/api/customer', customer);
Router.use('/api/seller',seller);

module.exports = Router;