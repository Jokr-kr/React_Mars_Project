const MySQL_db = require('./DB_Connect')
function TestDB(req, res)
{
    MySQL_db.query('SELECT 1 + 1 AS solution', (err, results) =>
    {
        if (err)
        {
            console.error(err);
            res.status(500).send('Database query failed');
            return;
        }
        res.send(`Database test successful: 1 + 1 = ${results[0].solution}`);
    });
}

module.exports = TestDB;