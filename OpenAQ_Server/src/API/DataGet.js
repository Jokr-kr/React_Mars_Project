
import axios from 'axios';
import processData from './DataSort.js';
export default function updatedata(req, res)
{
    let config =
    {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://api.openaq.org/v2/locations/10592?limit=10&page=1&offset=0&sort=desc&parameter=pm25&parameter=pm10&country=NO&order_by=lastUpdated&dumpRaw=false',
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

