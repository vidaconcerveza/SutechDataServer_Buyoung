const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const crypto = require('crypto');
const logger = require('morgan');
const stylus = require('stylus');
const mysql = require('mysql');
const fs = require('fs');
const ejs = require('ejs');
const path = require('path');

const indexRouter = require('./router/index');
//const apiRouter = require('./router/api');

const app = express();
const port = process.env.PORT || 80;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(stylus.middleware(path.join(__dirname, 'public/css')));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: 'sutech_ta8n383m9234@#23add42a@j#gjhdfgwuini)',
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge : 1000 * 60 * 60 }
}));

app.use('/', indexRouter);
//app.use('/api', apiRouter);


app.listen(port, '0.0.0.0', function(){

    console.log('Sutech plc api server is running on ' + port);

});

module.exports = app;