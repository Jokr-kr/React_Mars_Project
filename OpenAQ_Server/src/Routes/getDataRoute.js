import { getDataByParameter } from '../Chart_Logic/getData.js';

export async function getDataRoute(req, res)
{
    const { parameter, from, to } = req.query;

    if (!parameter)
    {
        return res.status(400).send('Measurement parameter is required');
    }

    try
    {
        const parameters = parameter.split(',');
        let data = [];

        for (const param of parameters)
        {
            console.log(`Fetching data for parameter: ${param}, from: ${from}, to: ${to}`);
            const paramData = await getDataByParameter(param, from, to);
            console.log(`Data for parameter ${param}:`, paramData);
            data = data.concat(paramData);
        }

        res.json(data);
    } catch (error)
    {
        console.error('Error fetching data:', error.message);
        res.status(500).send('Server error: ' + error.message);
    }
}

export default getDataRoute;