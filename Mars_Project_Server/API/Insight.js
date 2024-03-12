
require('dotenv').config();
const Insight_Key = process.env.INSIGHT_KEY;
const axios = require('axios');

const Insight_Url = `https://api.nasa.gov/insight_weather/?api_key=${Insight_Key}&feedtype=json&ver=1.0`;
const Insight_Demo_Url = `https://api.nasa.gov/insight_weather/?api_key=DEMO_KEY&feedtype=json&ver=1.0`;


function Fetch_Insight()
{
    return async (req, res) =>
    {
        try
        {
            const data = await Insight();
            res.json(data);
        } catch (error)
        {
            res.status(500).json({ error: error.message });
        }
    };
}

module.exports = Fetch_Insight;

async function Insight()
{
    try
    {
        //const response = await axios.get(Insight_Demo_Url);
        const response = await axios.get(Insight_Url);

        const responseData = response.data;
        return responseData;

    } catch (error)
    {
        console.error('Error fetching data:', error);
        throw new Error('Failed to fetch data from API');
    }
}

