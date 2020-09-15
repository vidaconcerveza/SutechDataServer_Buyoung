var mysql = require('mysql');

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

function getConnection(callback){
    pool.getConnection((err, conn) => {
        if(!err) callback(conn, err);
    });
}

module.exports = getConnection;