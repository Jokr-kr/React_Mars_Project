import { config } from 'dotenv';
import pool from '../DB/Connect.js';
import { insertMeasurements, latestEntry } from '../DB/dataInsert.js'
import { fetchData } from './apiHandlers.js';
import RateLimiter from './RateLimiter.js';

config();
const limiter = new RateLimiter(1000);

const parameters = [
    process.env.PARAMETER_1,
    process.env.PARAMETER_2,
    process.env.PARAMETER_3,
    process.env.PARAMETER_4,
    process.env.PARAMETER_5
].filter(param => param); // Filter out any empty parameters

async function fillInnData(req, res)
{
    const dataStorage = {};
    let fromTime = await latestEntry(pool);
    fromTime = fromTime || new Date(new Date().setFullYear(new Date().getFullYear() - 1)).toISOString();

    try
    {
        for (const parameter of parameters)
        {
            console.log(`Starting fetch for ${parameter}`);
            dataStorage[parameter] = await fetchData(parameter, fromTime, limiter);
            console.log(`Completed fetch for ${parameter}`);
            if (dataStorage[parameter] && dataStorage[parameter].length)
            {
                await insertMeasurements(parameter, dataStorage[parameter], pool);
            }
        }
        console.log('Data fetching complete for all parameters.');
        res.status(200).send('Data fetching and preparation complete for all parameters.');
    } catch (error)
    {
        console.error('Failed to fetch data:', error);
        res.status(500).send('Error fetching data');
    }
}

export { fillInnData };