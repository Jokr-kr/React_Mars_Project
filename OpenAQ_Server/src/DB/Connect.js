import mysql from 'mysql2/promise';
import { config } from 'dotenv';
config();

async function connectToDatabase()
{
    try
    {
        const pool = await mysql.createPool({
            host: process.env.HOST,
            user: process.env.MYSQL_USERNAME,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_CONNECTION,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        });
        console.log('Connected to database pool');

        pool.on('error', (err) =>
        {
            console.error('Database pool error:', err);
            if (err.code === 'PROTOCOL_CONNECTION_LOST')
            {
                console.log('Database connection lost');
            }
        });

        return pool;
    } catch (error)
    {
        console.error('Error connecting to database:', error);
        process.exit(1);
    }
}

export default connectToDatabase;