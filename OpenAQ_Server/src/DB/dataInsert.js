import connectToDatabase from './Connect.js';
import latestEntry from './latestEntry.js';

export async function insertMeasurements(parameter, measurements, pool)
{
    const sql = `INSERT INTO measurements (datetime, location_id, ${parameter}, unit)
               VALUES ? ON DUPLICATE KEY UPDATE ${parameter} = VALUES(${parameter})`;
    const values = measurements.map(measurement => [measurement.date.utc, measurement.locationId, measurement.value, measurement.unit]);

    const batchSize = 1000;
    for (let i = 0; i < values.length; i += batchSize)
    {
        const batch = values.slice(i, i + batchSize);
        try
        {
            await pool.query(sql, [batch]);
            console.log(`Batch inserted/updated measurements for ${parameter}`);
        } catch (err)
        {
            console.error(`Error batch inserting ${parameter} measurements:`, err);
        }
    }
}

export { latestEntry, connectToDatabase };