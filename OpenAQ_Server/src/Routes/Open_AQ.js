const API = (app) =>
{
    app.API('/contact')
        .get((req, res) =>
            res.send('Get request succesfull')
        )

        .post((req, res) =>
            res.send('Post request succesfull')
        )


    app.API('/contact/:contactId')
        .put((req, res) =>
            res.send('Put request succesfull')
        )

        .delete((req, res) =>
            res.send('Delete request succesfull')
        )
}
module.export = API;
