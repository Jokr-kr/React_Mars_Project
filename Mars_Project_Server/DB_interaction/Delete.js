const MySQL_db = require('./DB_Connect');

function createTable()
{
    const createTableQuery = `DROP TABLE IF EXISTS test_table;`

    MySQL_db.query(createTableQuery, (err, results) =>
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