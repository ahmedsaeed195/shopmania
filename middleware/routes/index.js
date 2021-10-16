const express = require('express')
const Router = express.Router();

//Default route

Router.get('', (req, res) => {
    res.render('index', { title: 'Shopmania', condition: false })
})

module.exports = Router;

