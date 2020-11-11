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

router.get('/data/:uid', (req, res) => {
    let uid = req.params.uid;
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

router.post('/sensor', (req, res) => {
    let uid = req.body.uid;
    let temp1 = req.body.temp1;
    let temp2 = req.body.temp2;
    let humi = req.body.humi;

    console.log(req.body);

    let params = [uid, temp1, temp2, humi, temp1, temp2, humi];

    mysql((conn, err) => {
        conn.query('INSERT INTO sensor (uid, temp1, temp2, humi) VALUES(?,?,?,?) ON DUPLICATE KEY UPDATE temp1 = ?, temp2 = ?, humi = ?', params, (error, rows, fields) => {
            if(error) res.send(error).status(400);
            res.send(rows).status(200);
        });
        conn.release();
    });
});

router.get('/sensor/:uid', (req, res) => {
    let uid = req.params.uid;
    //let block = req.param('block');

    let params = [uid];
    
    mysql((conn, err) => {
        conn.query('SELECT * FROM sensor WHERE uid = ?', params, (error, rows, fields) => {
            if(error) res.send(error).status(400);
            res.send(rows).status(200);
        });
        conn.release();
    });
})

router.get('/all', (req, res) => {
    let data1 = "";
    let data2 = "";
    console.log("all");
    mysql((conn, err) => {
        if(err) res.send(err).status(400);
        conn.query('SELECT * FROM sensor', (plcerr, plcrow, fields) => {
            console.log("query");
            if(error) res.send(plcerr).status(400);
            console.log("PLC");
            console.log(plcrow);
            data1 = plcrow
            res.send({
                sensor : data1
            }).status(200);
        });
        conn.release();
    });
});

module.exports = router;
