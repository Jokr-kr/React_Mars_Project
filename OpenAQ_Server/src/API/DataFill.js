import { config } from 'dotenv';
import { insertMeasurements, connectToDatabase, latestEntry } from '../DB/dataInsert.js'
import { fetchData } from './apiHandlers.js';
import RateLimiter from './RateLimiter.js';

config();
const limiter = new RateLimiter(1000);

async function fillInnData(req, res)
{
    const parameters = ['pm10', 'pm25', 'no2'];
    const dataStorage = {};
    const pool = await connectToDatabase();
    let fromTime = await latestEntry(pool);
    fromTime = fromTime || new Date(new Date().setFullYear(new Date().getFullYear() - 1)).toISOString();
    try
    {
        for (const parameter of parameters)
        {
            console.log(`Starting fetch for ${parameter}`);
            dataStorage[parameter] = await fetchData(parameter, fromTime, limiter, pool);
            console.log(`Completed fetch for ${parameter}`);
            if (dataStorage[parameter] && dataStorage[parameter].length)
            {
                insertMeasurements(parameter, dataStorage[parameter], pool);
            }
        }
        console.log('Data fetching complete for all parameters.');
        res.status(200).send('Data fetching and preparation complete for all parameters. Data has been saved to dataStorage.json.');
    } catch (error)
    {
        console.error('Failed to fetch data:', error);
        res.status(500).send('Error fetching data');
    }
}


export default fillInnData;