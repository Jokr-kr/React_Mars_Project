
import mysql from 'mysql2';
import { config } from 'dotenv';
config();
const Connect = mysql.createConnection(
    {
        host: process.env.HOST,
        user: process.env.MYSQL_USERNAME,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_CONNECTION
    }
);

Connect.connect((error) =>
{
    if (error)
    {
        console.error('Error connecting: ' + error.stack);
        process.exit(1);
    }
    console.log('Connected to database ' + Connect.threadId);
});
// errors after initial connection
Connect.on('error', (err) =>
{
    console.error('Database connection error:', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST')
    {
        console.log("database connection lost");
    }
});

export default Connect;

