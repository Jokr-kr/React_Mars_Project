//dotenv = your environment file which contains your usernarme, password, api keys etc.)
import { config } from 'dotenv';
config();

import express from 'express';
import cors from 'cors';
const app = express();
const port = process.env.PORT || 3000;
app.use(cors());

//Database
import { initialize } from './DB/initialize.js';
initialize();

//endpoints
import routes from './Routes/Routes.js';
routes(app);

app.get('/', (req, res) => { res.send('server running'); });

app.listen(port, () =>
{
    console.log(`Server running on http://${process.env.HOST}:${port}`);
});


// OpenAQ //breezometer