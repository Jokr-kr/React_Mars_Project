import { fillInnData } from "../api/DataFill.js";
import getDataRoute from "./getDataRoute.js";

const route = (app) =>
{
    app.route('/')
        .get((req, res) =>
        {
            res.send('Server is running')
        })
    app.route('/Data')
        .put((req, res) => { fillInnData(req, res); })
        .get(async (req, res) => { getDataRoute(req, res); })

    app.route('/for/later')
        .get((req, res) => { })
        .post((req, res) => { })
        .put((req, res) => { })
        .delete((req, res) => { });
}

export default route;