
import connect from "./Connect.js";

export default async function latestEntry()
{
    const connection = await connect();
    var datetime = null;
    try
    {
        const [rows] = await connection.query(`
                SELECT DATE_FORMAT(datetime, '%Y-%m-%d %H:%i:%s') AS latestDatetime
                FROM measurements
                ORDER BY datetime DESC
                LIMIT 1;
            `);
        if (rows.length > 0)
        {
            datetime = rows[0].latestDatetime;
            console.log("Latest entry in database = " + datetime);
        } else
        {
            console.log("No entries found in the database.");
            datetime = null;
        }
    } catch (error)
    {
        console.error("Database query error:", error);
        throw new Error("Failed to retrieve the latest datetime");
    } finally
    {
        await connection.end();
        return datetime;
    }
}