import pool from './Connect.js';
import { config } from 'dotenv';

config();

export async function initialize()
{

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