import axios from 'axios';
import latestEntry from '../DB/latestEntry.js';
import LatestFullHour from '../Utility/LatestHour.js'
import firstMeasurement from './FirstMeasurement.js'
import { config } from 'dotenv'
config();

export default async function fillInnData(req, res)
{
    var Location_id = process.env.LOCATION_ID;

    //check last entry datetime in database
    var from = await latestEntry();

    if (from == null)
    {
        try
        {
            //if there are no entries, get the datetime of the first measurement the API did (this might give a lot of data)
            from = await firstMeasurement();
        } catch (error)
        {
            //if an error occurs, set time to one year ago
            const oneYear = new Date();
            oneYear.setFullYear(oneYear.getFullYear() - 1);
            const isoDateString = oneYear.toISOString();
            from = isoDateString;
            console.log("This request could not be handled, trying to get 1 year of data");
        }
    }
    let config =
    {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://api.openaq.org/v2/measurements?format=Json&date_from=' + from + '&date_to=' + LatestFullHour() + '&limit=100&page=1&offset=0&sort=desc&location_id=' + Location_id + '&order_by=datetime',
        headers:
        {
            'Accept': 'application/json'
        }
    };

    try
    {
        const response = await axios.request(config);
        console.log(response.data);
        res.send(response.data);
    }
    catch (error)
    {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
}
