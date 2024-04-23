import connect from "../DB/Connect.js";
export default async function add2Db(dateTime, locationId, pm10, pm25, no2, res)
{
    const connection = await connect();
    try
    {
        await connection.query(`
            INSERT INTO measurements(dateTime, location_id, pm25, pm10, no2, unit)
            VALUES (?, ?, ?, ?, ?, 'µg/m³')`, [dateTime, locationId, pm25, pm10, no2])
        console.log("Data updated successfully");
        res.send('The data is now up to date.');
    }
    catch (error)
    {
        if (error.code === 'ER_DUP_ENTRY')
        {
            console.error("Duplicate entry error:", error.message);
            res.send('The data is already up to date.');
        } else
        {
            console.error("Error while updating database:", error.message);
            res.status(500).send('Error while updating data. Please try again later.');
        }
    }
}