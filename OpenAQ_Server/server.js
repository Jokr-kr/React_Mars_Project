//notes are just to keep my self oriented and for Learning

const express = require('express');
const app = express();
const port = 3000;


//Main page
app.get('/', (req, res) =>
{
    res.send('this is just a placeholder');
});


//Database
const DB = require('./DB_interaction/DB');
DB.Connect;
app.get('/testdb', DB.TestDB);
app.get('/create', DB.CreateTable);
app.get('/delete', DB.DeleteTable);


//Insight API
const Fetch_Insight = require('./API/Insight/Insight');
app.get('/insight/update', Fetch_Insight());


app.listen(port, () =>
{
    console.log(`Server running on http://localhost:${port}`);
});


// OpenAQ //breezometer