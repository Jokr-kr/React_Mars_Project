const MySQL_db = require('./Connect');

function createTable()
{
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS test_table (
            id INT AUTO_INCREMENT PRIMARY KEY,
            column1 VARCHAR(255),
            column2 INT
        )
    `;

    // eslint-disable-next-line no-unused-vars
    MySQL_db.query(createTableQuery, (err, _results) =>
    {
        if (err)
        {
            console.error('Error creating table:', err);
            return;
        }
        console.log('Table created successfully');
    });
}

module.exports = createTable;