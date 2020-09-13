const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const probe = require('probe-image-size');
const multer = require('multer');
const crypto = require('crypto');
const fs = require('fs');
const ejs = require('ejs');
const path = require('path');
const mysql = require('mysql');
const moment = require('moment');
const request = require('request');

const router = express.Router();

let pool = mysql.createPool({
    host: 'plc-database-1.c1ni51ek7fq5.us-east-2.rds.amazonaws.com',
    port: 3306,
    user: 'admin',
    password: 'Qwert!234',
    database: 'bin',
    connectionLimit: 1000,
    waitForConnections: true,
    ssl: true
});


router.get('/', (req, res) => {
    res.send({status : 200});
});

router.get('/:uid', (req, res) => {
    res.send({});
});

module.exports = router;
