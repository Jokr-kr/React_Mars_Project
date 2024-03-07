//notes are just to keep my self oriented and for Learning

//load dotenv early to avoid dependancy issues
require('dotenv').config();
const Insight_Key = process.env.INSIGHT_KEY;
const Apod_key = process.env.APOD_KEY;

//its also a good idea to require modules after setting up environment variables,
//in case they are dependent on.env
const mysql = require('mysql');
const axios = require('axios');

const express = require('express');
const app = express();
const port = 3000;

// database handling.
// every interaction has its own file,
// these requirements are located in the file name DB.js
// as to not flood this file with require statements
const DB = require('./DB_interaction/DB')
DB.Connect
app.get('/testdb', DB.TestDB);
app.get('/create', DB.CreateTable)
app.get('/Delete', DB.DeleteTable)

// '/' represents what comes after the portnumber
app.get('/', (req, res) =>
{
    res.send('Hello World!');
});

// starting server after everything else does not need explanation
app.listen(port, () =>
{
    console.log(`Server running on http://localhost:${port}`);
});