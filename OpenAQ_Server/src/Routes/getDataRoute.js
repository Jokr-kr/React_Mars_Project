import { getDataByParameter } from "../Chart_Logic/getData.js";
async function getDataRoute(req, res)
{
    const { parameter, from, to } = req.query;

    if (!parameter)
    {
        return res.status(400).send('Measurement parameter is required');
    }

    try
    {
        const data = await getDataByParameter(parameter, from, to);
        res.json(data);
    } catch (error)
    {
        console.error('Error fetching data:', error);
        res.status(500).send('Server error: ' + error.message);
    }
}
export { getDataRoute }