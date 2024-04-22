import mysql from 'mysql2/promise';
import { config } from 'dotenv';
config();

async function connectToDatabase()
{
    try
    {
        const connection = await mysql.createConnection({
            host: process.env.HOST,
            user: process.env.MYSQL_USERNAME,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_CONNECTION
        });
        console.log('Connected to database ' + connection.threadId);

        //connection errors
        connection.on('error', (err) =>
        {
            console.error('Database connection error:', err);
            if (err.code === 'PROTOCOL_CONNECTION_LOST')
            {
                console.log('Database connection lost');
            }
        });
        return connection;
    } catch (error)
    {
        console.error('Error connecting to database:', error);
        process.exit(1);
    }
}

export default connectToDatabase;
