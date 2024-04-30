import connectToDatabase from './Connect.js';
import latestEntry from './latestEntry.js';

export async function insertMeasurements(parameter, measurements, pool)
{
    const sql = `INSERT INTO measurements (datetime, location_id, ${parameter}, unit)
                 VALUES ? ON DUPLICATE KEY UPDATE ${parameter} = VALUES(${parameter})`;
    const values = measurements.map(measurement => [measurement.date.utc, measurement.locationId, measurement.value, measurement.unit]);
    pool.query(sql, [values], (err, result) =>
    {
        if (err)
        {
            console.error(`Error batch inserting ${parameter} measurements:`, err);
        } else
        {
            console.log(`Batch inserted/updated measurements for ${parameter}`);
        }
    });
}

export { latestEntry, connectToDatabase };