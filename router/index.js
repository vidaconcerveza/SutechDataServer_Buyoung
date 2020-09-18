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
const moment = require('moment');
const request = require('request');

const mysql = require('../utils/mysql');

const router = express.Router();

router.get('/', (req, res) => {
    res.send({status : 200});
});

router.get('/:uid', (req, res) => {
    res.send({});
});

router.get('/data', (req, res) => {
    let uid = req.param('uid');
    //let block = req.param('block');

    let params = [uid];
    
    mysql((conn, err) => {
        conn.query('SELECT * FROM data WHERE uid = ?', params, (error, rows, fields) => {
            if(error) res.send(error).status(400);
            res.send(rows).status(200);
        });
        conn.release();
    });
})

router.post('/data', (req, res) => {
    let uid = req.body.uid;
    let block = req.body.block;
    let data = req.body.data;

    let params = [uid, block, data, data];

    console.log(params);

    mysql((conn, err) => {
        conn.query('INSERT INTO data (uid, block, data) VALUES(?, ?, ?) ON DUPLICATE KEY UPDATE data = ?', params, (error, rows, fields) => {
            if(error) res.send(error).status(400);
            res.send(rows).status(200);
        });
        conn.release();
    });
})

module.exports = router;
