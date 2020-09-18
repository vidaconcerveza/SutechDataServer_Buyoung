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
    let block = req.param('block');

    let params = [uid, block];
    
    mysql((conn, err) => {
        conn.query('SELECT * FROM data WHERE uid = ? and block = ?', params, (err, rows, fields) => {
            if(err) res.send(err).status(400);
            res.send(rows).status(200);
        });
        conn.release();
    });
})

router.post('/data', (req, res) => {
    let uid = req.body.uid;
    let block = req.body.block;
    let data = req.body.data;

    let params = [uid, block, data];

    console.log(params);

    mysql((conn, err) => {
        console.log(conn);
        conn.query('INSERT INTO table (uid, block, data) VALUES(?, ?, ?)', params, (err, rows, fields) => {
            if(err) res.send(err).status(400);
            res.send(rows).status(200);
        });
        conn.release();
    });
})

module.exports = router;
