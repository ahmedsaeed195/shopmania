const express = require('express');
const morgan = require('morgan');
const hbs = require('express-handlebars');
const path = require('path');
const Router = require('./routes');
const app = express();
const dotenv = require('dotenv');
dotenv.config({path: './config/.env'});

//Set view engine
app.engine('hbs', hbs({ extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts/' }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

//Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));
app.use('/', Router);

const port = process.env.SHOPMANIA_PORT || 4000;

app.listen(port, () => console.log(`Listening to http://127.0.0.1:${port}`));