//notes are just to keep my self oriented and for Learning

const mysql = require('mysql');
const axios = require('axios');

const express = require('express');
const app = express();
const port = 3000;

//Main page
app.get('/', (req, res) =>
{
    res.send('Hello World!');
});

//Database
const DB = require('./DB_interaction/DB');
DB.Connect;
app.get('/testdb', DB.TestDB);
app.get('/create', DB.CreateTable);
app.get('/delete', DB.DeleteTable);

//Insight API
const Fetch_Insight = require('./API/Insight');
app.get('/insight/update', Fetch_Insight());


app.listen(port, () =>
{
    console.log(`Server running on http://localhost:${port}`);
});