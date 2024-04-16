//notes are just to keep my self oriented and for Learning

const express = require('express');
const app = express();
const port = 3000;
const API = require('./src/Routes/Open_AQ.js');

API(app);

//Database
const DB = require('./src/DB/Connect.js');

app.get('/', (req, res) =>
{
    res.send('this is just a placeholder');
});

app.listen(port, () =>
{
    console.log(`Server running on http://localhost:${port}`);
});

// OpenAQ //breezometer