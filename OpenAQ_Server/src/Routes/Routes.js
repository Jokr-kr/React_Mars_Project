import updatedata from "../API/DataGet.js";
const route = (app) =>
{
    app.route('/Data')
        .get((req, res) =>
        {
            res.send('Get request succesfull')
        }
        )

        .post((req, res) =>
        {
            updatedata(req, res);
        }
        )

    app.route('/contact/:contactId')
        .put((req, res) =>
            res.send('Put request succesfull')
        )

        .delete((req, res) =>
            res.send('Delete request succesfull')
        )
}
export default route;

