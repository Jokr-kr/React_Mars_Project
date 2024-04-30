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
    //looks for data in database
    const pool = await connectToDatabase();
    let fromTime = await latestEntry(pool);
    //if the database is empty set date 1 year back
    fromTime = fromTime || new Date(new Date().setFullYear(new Date().getFullYear() - 1)).toISOString();
    try
    {
        //fetching data one parameter at a time
        for (const parameter of parameters)
        {
            console.log(`Starting fetch for ${parameter}`);
            dataStorage[parameter] = await fetchData(parameter, fromTime, limiter);
            console.log(`Completed fetch for ${parameter}`);
            //if the response has data its inserted into the database
            if (dataStorage[parameter] && dataStorage[parameter].length)
            {
                insertMeasurements(parameter, dataStorage[parameter], pool);
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


export default fillInnData;