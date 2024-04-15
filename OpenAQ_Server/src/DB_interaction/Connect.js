
const mysql = require('mysql');
require('dotenv').config();
const HOST = process.env.LOCALHOST;
const MySQL_Username = process.env.MYSQL_USERNAME;
const MySQL_Password = process.env.MYSQL_PASSWORD;
const Database_connection = process.env.MYSQL_DB_CONNECTION;


const Connect = mysql.createConnection({
    host: HOST,
    user: MySQL_Username,
    password: MySQL_Password,
    database: Database_connection
});

Connect.connect((error) =>
{
    if (error)
    {
        console.error('Error connecting: ' + error.stack);
        return;
    }
    console.log('Connected to database ' + Connect.threadId);
});

module.exports = Connect;