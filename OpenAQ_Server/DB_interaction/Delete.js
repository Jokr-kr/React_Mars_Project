const MySQL_db = require('./Connect');

function createTable()
{
    const createTableQuery = `DROP TABLE IF EXISTS test_table;`

    // eslint-disable-next-line no-unused-vars
    MySQL_db.query(createTableQuery, (err, _results) =>
    {
        if (err)
        {
            console.error('Error Deleting table:', err);
            return;
        }
        console.log('Table Deleted successfully');
    });
}

module.exports = createTable;