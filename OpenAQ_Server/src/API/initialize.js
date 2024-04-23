import connect from '../DB/Connect.js';
export async function initialize()
{
    console.log(typeof connect)
    const connection = await connect();
    try
    {
        await connection.query(`
            CREATE TABLE IF NOT EXISTS measurements (
                datetime DATETIME PRIMARY KEY,
                location_id INT,
                pm25 DOUBLE,
                pm10 DOUBLE,
                no2 DOUBLE,
                unit VARCHAR(50)
            );
        `);

        console.log("Database and tables initialized successfully.");
    } catch (error)
    {
        console.error("Error during API initialization:", error);
    } finally
    {
        await connection.end();
    }
}
