const mysql = require('mysql2');

const {
    DB_HOST,
    DB_USERNAME,
    DATABASE,
    DATE
} = require('../helper/env');


const connection = mysql.createConnection({
    host: DB_HOST,
    user: DB_USERNAME,
    database: DATABASE,
    dateStrings: DATE
});

module.exports = connection;