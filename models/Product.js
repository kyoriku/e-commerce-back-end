// Importing necessary parts (Model, DataTypes) from the 'sequelize' library
const { Model, DataTypes } = require('sequelize');
// Importing the database connection from 'connection.js'
const sequelize = require('../config/connection');

// Creating a Product class that extends the sequelize Model class
class Product extends Model {}

// Initializing the Product model with the specified column definitions and rules
Product.init(
  {
    // Column definition for 'id'
    id: {
      type: DataTypes.INTEGER, // Specify the data type of the 'id' column as INTEGER
      allowNull: false, // Ensure that the 'id' column cannot have a NULL value, making it a required field
      primaryKey: true, // Designate the 'id' column as the primary key for the table
      autoIncrement: true, // Enable auto-increment for the 'id' column, ensuring unique and sequential values
    },
    // Column definition for 'product_name'
    product_name: {
      type: DataTypes.STRING, // Specify the data type of the 'product_name' column as STRING
      allowNull: false, // Ensure that the 'product_name' column cannot have a NULL value, making it a required field
    },
    // Column definition for 'price'
    price: {
      type: DataTypes.DECIMAL, // Specify the data type of the 'price' column as DECIMAL
      allowNull: false, // Ensure that the 'price' column cannot have a NULL value, making it a required field
      validate: {
        isDecimal: true, // Validation rule to ensure 'price' is a decimal value
      },
    },
    // Column definition for 'stock'
    stock: {
      type: DataTypes.INTEGER, // Specify the data type of the 'stock' column as INTEGER
      allowNull: false, // Ensure that the 'stock' column cannot have a NULL value, making it a required field
      defaultValue: 10, // Default value for 'stock' if not provided
      validate: {
        isNumeric: true, // Validation rule to ensure 'stock' is a numeric value
      },
    },
    // Column definition for 'category_id' with a foreign key reference to the 'id' in the 'category' model
    category_id: {
      type: DataTypes.INTEGER, // Specify the data type of the 'category_id' column as INTEGER
      references: { // The 'references' object establishes a foreign key relationship with another table ('category' table in this case)
        model: 'category', // References the 'category' table
        key: 'id', // References the primary key 'id' in the 'category' table
      },
    },
  },
  {
    sequelize, // Providing the sequelize connection instance
    timestamps: false, // Disabling timestamps (created_at and updated_at columns)
    freezeTableName: true, // Setting the table name to be the same as the model name
    underscored: true, // Using underscores instead of camelCase for automatically added attributes
    modelName: 'product', // Setting the model name to 'product'
  }
);

// Exporting the Product model for use in other parts of the application
module.exports = Product;
