const mysql = require('mysql2')

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'abc123abc1',
    database: 'tracker'
});

module.exports = db;