// Importing necessary parts (Model, DataTypes) from the 'sequelize' library
const { Model, DataTypes } = require('sequelize');
// Importing the database connection from 'connection.js'
const sequelize = require('../config/connection.js');

// Creating a Category class that extends the sequelize Model class
class Category extends Model {}

// Initializing the Category model with the specified column definitions
Category.init(
  {
    // Column definition for 'id'
    id: {
      type: DataTypes.INTEGER, // Specify the data type of the 'id' column as INTEGER
      allowNull: false, // Ensure that the 'id' column cannot have a NULL value, making it a required field
      primaryKey: true, // Designate the 'id' column as the primary key for the table
      autoIncrement: true, // Enable auto-increment for the 'id' column, ensuring unique and sequential values
    },
    // Column definition for 'category_name'
    category_name: {
      type: DataTypes.STRING, // Specify the data type of the 'category_name' column as STRING
      allowNull: false, // Ensure that the 'category_name' column cannot have a NULL value, making it a required field
    }
  },
  {
    sequelize, // Providing the sequelize connection instance
    timestamps: false, // Disabling timestamps (created_at and updated_at columns)
    freezeTableName: true, // Setting the table name to be the same as the model name
    underscored: true, // Using underscores instead of camelCase for automatically added attributes
    modelName: 'category', // Setting the model name to 'category'
  }
);

// Exporting the Category model for use in other parts of the application
module.exports = Category;
