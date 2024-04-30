import mysql from 'mysql2/promise';
import { config } from 'dotenv';
config();

export default async function test()
{
    try
    {
        const connection = await mysql.createConnection({
            host: process.env.HOST,
            user: process.env.MYSQL_USERNAME,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_CONNECTION
        });
        console.log('Connected to MySQL database');
        const [rows] = await connection.execute('SELECT 1');
        console.log('Query result:', rows);
        await connection.end();
    } catch (error)
    {
        console.error('Error connecting to MySQL database:', error);
    }
}

