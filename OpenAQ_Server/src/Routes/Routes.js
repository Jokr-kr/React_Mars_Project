import fillInnData from "../API/DataFill.js";
const route = (app) =>
{
    app.route('/Data')
        .put((req, res) =>
        {
            /*
            updates the database with the latest data
            or tries to populate it with a years worth if empty
            */
            fillInnData(req, res);
        })

        .get(async (req, res) =>
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
        });


    app.route('/somethingElse')
        .get((req, res) =>
        {
            res.send("nothing here")
        })

        .delete((req, res) =>
        {
            res.send("not yet implemented")
        })
}
export default route;

