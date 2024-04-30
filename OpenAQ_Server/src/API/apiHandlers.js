import axios from 'axios';
import LatestFullHour from '../Utility/LatestHour.js';

export async function fetchData(parameter, fromTime, rateLimiter)
{
    //setting the variables needed for the API request
    const Location_id = process.env.LOCATION_ID;
    const ToTime = LatestFullHour();
    let currentPage = 1;
    const limit = 3000;
    let results = [];
    let attempts = 0;
    const maxAttempts = 5;

    //continuing until all data is fetched or error occurs
    while (true)
    {
        console.log(`Fetching page ${currentPage} for ${parameter}`);
        const apiParams = {
            format: 'json',
            date_from: fromTime,
            date_to: ToTime,
            limit,
            page: currentPage,
            parameter,
            location_id: Location_id,
            order_by: 'datetime'
        };
        try
        {
            const data = await rateLimiter.add(() => GetMeasurements(apiParams));
            //if there is a response adds it to the response array
            if (data && data.results.length > 0)
            {
                results.push(...data.results);
                if (data.results.length < limit) break;
            } else
            {
                break;
            }
        } catch (error)
        {
            console.error(`Error fetching data for ${parameter}: ${error}`);
            if (++attempts >= maxAttempts) break;
        }
        currentPage++;
    }
    console.log(`Total records fetched for ${parameter}: ${results.length}`);
    return results;
}


export async function GetMeasurements(apiParams, attempts = 1)
{
    //tries sending the api request or retries if error occurs
    try
    {
        const response = await axios.get('https://api.openaq.org/v2/measurements', {
            params: apiParams,
            headers: { 'Accept': 'application/json' },
            timeout: 10000
        });
        return response.data;
    } catch (error)
    {
        if (error.response && error.response.status === 429)
        {
            const retryAfter = error.response.headers['retry-after'] ? parseInt(error.response.headers['retry-after']) : 5 * Math.pow(2, attempts);
            console.log(`Rate limit exceeded, retrying after ${retryAfter} seconds.`);
            await new Promise(resolve => setTimeout(resolve, retryAfter * 1000));
            return GetMeasurements(apiParams, attempts + 1);
        }
        throw error;
    }
}