import mysql from 'mysql2/promise';
import sequelize from './sequelize.js'; // Import the Sequelize instance
import Article from './models/Article.js';

export const syncDatabase = async () => {
    try {
        // Create a connection to MySQL server (without specifying a database)
        const connection = await mysql.createConnection({
            host: process.env.HOST,
            user: process.env.USER,
            password: process.env.PASSWORD,
            port: process.env.PORT_DATABASE
        });

        // Create database if it doesn't exist
        const createDbQuery = `CREATE DATABASE IF NOT EXISTS \`${process.env.DATABASE}\`;`;
        await connection.query(createDbQuery);
        console.log(`Database ${process.env.DATABASE} created or already exists.`);

        // Close the connection
        await connection.end();

        // Now, sync the Sequelize models with the database
        await sequelize.sync({ force: false });
        console.log('Database & tables synced!');
    } catch (error) {
        console.error('Error syncing database:', error);
    }
};


