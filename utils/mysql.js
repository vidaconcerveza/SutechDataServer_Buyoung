var mysql = require("mysql");

let pool = mysql.createPool({
  host: "localhost",
  port: 3306,
  user: "sutech",
  password: "Qwert!234",
  database: "sutech",
  connectionLimit: 1000,
  waitForConnections: true,
  ssl: false,
});

/*
let pool = mysql.createPool({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Asdfasdf1@',
    database: 'test',
    connectionLimit: 1000,
    waitForConnections: true,
    ssl: false
});
*/

function getConnection(callback) {
  pool.getConnection((err, conn) => {
    if (!err) callback(conn, err);
    else if (err) console.log(err);
  });
}

module.exports = getConnection;
