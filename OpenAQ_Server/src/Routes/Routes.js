import DataFill from "../API/DataFill.js";
import updatedata from "../API/DataGet.js";
import test from "./test.js";
const route = (app) =>
{
    app.route('/Data')
        .get((req, res) =>
        {
            res.send('Get request succesfull')
        })

        .post((req, res) =>
        {
            updatedata(req, res);
        })

    app.route('/fillDatabase')
        .get((req, res) =>
        {
            DataFill(req, res);
        })

        .delete((req, res) =>
        {
            test(res)
            console.log('test complete')
        })
}
export default route;

