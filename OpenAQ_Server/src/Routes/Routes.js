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

        .get((req, res) =>
        {
            /*
            sends data from the database to client
            */
            res.send("currently nothing to get")
        })

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

