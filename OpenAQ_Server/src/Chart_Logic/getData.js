import pool from '../DB/Connect.js'

async function getDataByParameter(parameter, fromDate, toDate)
{
    const validParameters = ['pm25', 'pm10', 'no2'];
    if (!validParameters.includes(parameter.toLowerCase()))
    {
        throw new Error('Invalid parameter specified');
    }

    fromDate = fromDate || '2020-01-01';
    toDate = toDate || new Date().toISOString().slice(0, 10);

    const query = `
        SELECT datetime, ${parameter}, location_id
        FROM measurements
        WHERE datetime BETWEEN ? AND ?
        ORDER BY datetime ASC;`;

    try
    {
        const [results] = await pool.query(query, [fromDate, toDate]);
        return results;
    } catch (error)
    {
        console.error('Database query failed:', error);
        throw new Error('Database query failed: ' + error.message);
    }
}

export { getDataByParameter };