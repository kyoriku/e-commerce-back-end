// Loading environment variables from a .env file
require('dotenv').config();

// Importing the Sequelize library for interacting with databases
const Sequelize = require('sequelize');

// Creating a Sequelize instance based on the environment variable JAWSDB_URL (for production) or other local database credentials
const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL) // For production, using JawsDB URL provided by hosting services like Heroku
  : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
      host: 'localhost',    // Local database host
      dialect: 'mysql',     // Specifying the MySQL database dialect
      dialectOptions: {
        decimalNumbers: true,
      },
    });

// Exporting the configured Sequelize instance for use in other parts of the application
module.exports = sequelize;
