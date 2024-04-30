import fillInnData from "../API/DataFill.js";
const route = (app) =>
{
    app.route('/Data')
        .put((req, res) =>
        {
            fillInnData(req, res);
        })

        .get((req, res) =>
        {
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

