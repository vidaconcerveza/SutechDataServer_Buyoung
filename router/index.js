const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const probe = require("probe-image-size");
const multer = require("multer");
const crypto = require("crypto");
const fs = require("fs");
const ejs = require("ejs");
const path = require("path");
const moment = require("moment");
const request = require("request");

const mysql = require("../utils/mysql");

const router = express.Router();

router.get("/", (req, res) => {
  res.send({ status: 200 });
});

router.get("/data/:uid", (req, res) => {
  let uid = req.params.uid;
  //let block = req.param('block');

  let params = [uid];

  mysql((conn, err) => {
    conn.query(
      "SELECT * FROM data WHERE uid = ?",
      params,
      (error, rows, fields) => {
        if (error) res.send(error).status(400);
        res.send(rows).status(200);
      }
    );
    conn.release();
  });
});

router.post("/data", (req, res) => {
  let data = req.body;
  let dataSet = "";
  data.map((x) => {
    dataSet += "('" + x.uid + "','" + x.block + "','" + x.data + "'),";
  });
  dataSet = dataSet.slice(0, -1);

  let queryString =
    "INSERT INTO data VALUES " +
    dataSet +
    " AS New ON DUPLICATE KEY UPDATE data=New.data";
  mysql((conn, err) => {
    conn.query(queryString, [], (errors, result, field) => {
      if (errors) res.send(errors).status(400);
      res.send(result);
    });
    conn.release();
  });
});

router.post("/sensor", (req, res) => {
  let uid = req.body.uid;
  let temp1 = req.body.temp1;
  let temp2 = req.body.temp2;
  let humi = req.body.humi;

  console.log(req.body);

  let params = [uid, temp1, temp2, humi, temp1, temp2, humi];

  mysql((conn, err) => {
    conn.query(
      "INSERT INTO sensor (uid, temp1, temp2, humi) VALUES(?,?,?,?) ON DUPLICATE KEY UPDATE temp1 = ?, temp2 = ?, humi = ?",
      params,
      (error, rows, fields) => {
        if (error) res.send(error).status(400);
        res.send(rows).status(200);
      }
    );
    conn.release();
  });
});

router.get("/sensor/:uid", (req, res) => {
  let uid = req.params.uid;
  //let block = req.param('block');

  let params = [uid];

  mysql((conn, err) => {
    conn.query(
      "SELECT * FROM sensor WHERE uid = ?",
      params,
      (error, rows, fields) => {
        if (error) res.send(error).status(400);
        res.send(rows).status(200);
      }
    );
    conn.release();
  });
});

router.get("/all", (req, res) => {
  let data1 = "";
  let data2 = "";
  console.log("all");
  mysql((conn, err) => {
    if (err) res.send(err).status(400);
    conn.query("SELECT * FROM data", (plcerr, plcrow, plcfields) => {
      if (plcerr) res.send(plcerr).status(400);
      data1 = plcrow;
      conn.query(
        "SELECT * FROM sensor",
        (sensorerr, sensorrow, sensorfields) => {
          if (sensorerr) res.send(sensorerr).status(400);
          data2 = sensorrow;
          res
            .send({
              plc: data1,
              sensor: data2,
            })
            .status(200);
        }
      );
    });
    conn.release();
  });
});

module.exports = router;
