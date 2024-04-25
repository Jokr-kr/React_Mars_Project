
import axios from 'axios';
import processData from './DataSort.js';
import { config } from 'dotenv';
config();
export default function updatedata(req, res)
{
    var Location_id = process.env.LOCATION_ID;
    let config =
    {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://api.openaq.org/v2/locations/' + Location_id + '?limit=10&page=1&offset=0&sort=asc&parameter=pm25&parameter=pm10&order_by=lastUpdated&dumpRaw=false',
        headers:
        {
            'Accept': 'application/json'
        }
    };

    axios.request(config)
        .then((response) =>
        {
            const data = response.data;
            processData(data, res);
        })
        .catch((error) =>
        {
            console.error(error);
            res.status(500).send('Error while updating data. Please try again later.');
        });
}
