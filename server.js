const express = require('express'); // Importing the 'express' library to create a web server
const routes = require('./routes'); // Importing the 'routes' module, which contains the route definitions
const sequelize = require('./config/connection'); // Importing the sequelize connection instance

const app = express(); // Creating an instance of the express application
const PORT = process.env.PORT || 3001; // Setting the port to either the environment variable PORT or defaulting to 3001

app.use(express.json()); // Middleware to parse incoming JSON requests
app.use(express.urlencoded({ extended: true })); // Middleware to parse incoming URL-encoded requests with extended options

app.use(routes); // Using the defined routes in the application

// Synchronizing the sequelize models with the database. If 'force' is set to true,
// it would drop the existing tables and recreate them (use with caution in production).
sequelize.sync({ force: false }).then(() => {
  // Starting the express application to listen on the specified port
  app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
});
