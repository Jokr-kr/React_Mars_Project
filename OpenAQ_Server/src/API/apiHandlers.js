import axios from 'axios';
import LatestFullHour from '../Utility/LatestHour.js';

export async function fetchMeasurements(apiParams, attempts = 1)
{
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
            return fetchMeasurements(apiParams, attempts + 1);
        }
        throw error;
    }
}

export async function fetchDataForParameter(parameter, fromTime, rateLimiter, pool)
{
    const Location_id = process.env.LOCATION_ID;
    const ToTime = LatestFullHour();
    let currentPage = 1;
    const limit = 3000;
    let results = [];
    let attempts = 0;
    const maxAttempts = 5;
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
            const data = await rateLimiter.add(() => fetchMeasurements(apiParams));
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