import pool from './Connect.js';
import { config } from 'dotenv';

config();

export async function initialize()
{
    console.log("Database Host:", process.env.HOST);
    console.log("Database User:", process.env.MYSQL_USERNAME);
    console.log("Database Name:", process.env.MYSQL_DATABASE);

    try
    {
        await pool.query(`
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
    }
}