
const mysql = require('mysql');
require('dotenv').config();
const MySQL_Username = process.env.MYSQL_USERNAME;
const MySQL_Password = process.env.MYSQL_PASSWORD;
const Database_Name = process.env.MYSQL_DB_NAME

const Connect = mysql.createConnection({
    host: 'localhost',
    user: MySQL_Username,
    password: MySQL_Password,
    database: Database_Name
});

Connect.connect((error) =>
{
    if (error)
    {
        console.error('Error connecting: ' + error.stack);
        return;
    }
    console.log('Connected as id ' + Connect.threadId);
});

module.exports = Connect;