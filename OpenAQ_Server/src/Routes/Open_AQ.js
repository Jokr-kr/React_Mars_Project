const API = (app) =>
{
    app.route('/contact')
        .get((req, res) =>
            res.send('Get request succesfull')
        )

        .post((req, res) =>
            res.send('Post request succesfull')
        )

    app.route('/contact/:contactId')
        .put((req, res) =>
            res.send('Put request succesfull')
        )

        .delete((req, res) =>
            res.send('Delete request succesfull')
        )
}
module.exports = API;
