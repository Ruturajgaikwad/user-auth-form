const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',          // use your MySQL username
    password: 'Sp9@_VrT#2Lm',          // your MySQL password
    database: 'testdb'     // your database name
});

db.connect((err) => {
    if (err) throw err;
    console.log("MySQL Connected!");
});

module.exports = db;
