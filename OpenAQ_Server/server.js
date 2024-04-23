//dotenv = your environment file which contains your usernarme, password, api keys etc.)
import { config } from 'dotenv';
config();
import express from 'express';
const app = express();
const port = process.env.PORT || 3000;

//Database
import { initialize } from './src/API/initialize.js';
initialize();

//API
import routes from './src/Routes/Routes.js';
routes(app);

app.get('/', (req, res) =>
{
    res.send('this is just a placeholder');
});

app.listen(port, () =>
{
    console.log(`Server running on http://localhost:${port}`);
});

const Shutdown = () =>
{
    console.log('Shutting down...');
    server.close(() =>
    {
        console.log('server closed.');
        connection.end((err) =>
        {
            if (err)
            {
                console.error('Error closing the database connection', err);
            } else
            {
                console.log('Database connection closed.');
            }
            process.exit(err ? 1 : 0);
        });
    });
};

process.on('SIGINT', Shutdown);
process.on('SIGTERM', Shutdown);

// OpenAQ //breezometer