export default async function latestEntry(pool)
{
    let datetime = null;
    try
    {
        const connection = await pool.getConnection();
        const [rows] = await connection.query(`
            SELECT DATE_FORMAT(datetime, '%Y-%m-%d %H:%i:%s') AS latestDatetime
            FROM measurements
            ORDER BY datetime DESC
            LIMIT 1;
        `);
        connection.release();
        if (rows.length > 0)
        {
            datetime = rows[0].latestDatetime;
            console.log("Latest entry in database = " + datetime);
        } else
        {
            console.log("No entries found in the database.");
        }
    } catch (error)
    {
        console.error("Database query error:", error);
        throw new Error("Failed to retrieve the latest datetime");
    }
    return datetime;
}
