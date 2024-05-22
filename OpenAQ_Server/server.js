//dotenv = your environment file which contains your usernarme, password, api keys etc.)
import { config } from 'dotenv';
config();

import express from 'express';
const app = express();
const port = process.env.PORT || 3000;

//Database
import { initialize } from './src/DB/initialize.js';
initialize();

//endpoints
import routes from './src/Routes/Routes.js';
routes(app);

app.get('/', (req, res) =>
{
    res.send('this is a placeholder');
});

app.listen(port, () =>
{
    console.log(`Server running on http://localhost:${port}`);
});


// OpenAQ //breezometer