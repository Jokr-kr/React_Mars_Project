
import axios from 'axios';
import { config } from 'dotenv'
config();

export default function firstMeasurement()
{
    var Location_id = process.env.LOCATION_ID;
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://api.openaq.org/v2/locations/' + Location_id + '?limit=100&page=1&offset=0&sort=desc&order_by=lastUpdated',
        headers: {
            'Accept': 'application/json'
        }
    };
    return axios.request(config);
}