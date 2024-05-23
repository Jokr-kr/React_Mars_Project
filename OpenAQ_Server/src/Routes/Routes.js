import fillInnData from "../API/DataFill.js";
import { getDataByParameter } from "../Chart_Logic/getData.js";
const route = (app) =>
{
    app.route('/Data')
        .put((req, res) =>
        {
            fillInnData(req, res);
        })
        .get(async (req, res) =>
        {
            const { parameter, from, to } = req.query;

            console.log('Received parameters:', { parameter, from, to }); // Log the received parameters

            if (!parameter)
            {
                return res.status(400).send('Measurement parameter is required');
            }

            try
            {
                const data = await getDataByParameter(parameter, from, to);
                console.log('Data fetched from database:', data); // Log the data
                res.json(data);
            } catch (error)
            {
                console.error('Error fetching data:', error);
                res.status(500).send('Server error: ' + error.message);
            }
        });

    app.route('/something/else')
        .get((req, res) => { })
        .delete((req, res) =>
        {
            res.send("not yet implemented");
        });
}

export default route;