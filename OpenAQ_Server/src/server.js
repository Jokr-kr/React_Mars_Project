import express from 'express';
import { config } from 'dotenv';
import { initialize } from './DB/initialize.js';
import routes from './Routes/Routes.js';
import cors from 'cors';  // Import the cors package

config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());  // Use the cors middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

routes(app);

app.listen(port, () =>
{
    console.log(`Server running on http://${process.env.HOST}:${port}`);
    initialize();
});

//breezometer