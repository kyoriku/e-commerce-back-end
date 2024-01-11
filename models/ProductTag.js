// Importing necessary parts (Model, DataTypes) from the 'sequelize' library
const { Model, DataTypes } = require('sequelize');
// Importing the database connection from 'connection.js'
const sequelize = require('../config/connection');

// Creating a ProductTag class that extends the sequelize Model class
class ProductTag extends Model {}

// Initializing the ProductTag model with the specified column definitions and rules
ProductTag.init(
  {
    // Column definition for 'id'
    id: {
      type: DataTypes.INTEGER, // Specify the data type of the 'id' column as INTEGER
      allowNull: false, // Ensure that the 'id' column cannot have a NULL value, making it a required field
      primaryKey: true, // Designate the 'id' column as the primary key for the table
      autoIncrement: true, // Enable auto-increment for the 'id' column, ensuring unique and sequential values
    },
    // Column definition for 'product_id' with a foreign key reference to the 'id' in the 'product' model
    product_id: {
      type: DataTypes.INTEGER, // Specify the data type of the 'product_id' column as INTEGER
      references: { // The 'references' object establishes a foreign key relationship with another table ('product' table in this case)
        model: 'product', // References the 'product' table
        key: 'id', // References the primary key 'id' in the 'product' table
      },
    },
    // Column definition for 'tag_id' with a foreign key reference to the 'id' in the 'tag' model
    tag_id: {
      type: DataTypes.INTEGER, // Specify the data type of the 'tag_id' column as INTEGER
      references: { // The 'references' object establishes a foreign key relationship with another table ('tag' table in this case)
        model: 'tag', // References the 'tag' table
        key: 'id', // References the primary key 'id' in the 'tag' table
      },
    },
  },
  {
    sequelize, // Providing the sequelize connection instance
    timestamps: false, // Disabling timestamps (created_at and updated_at columns)
    freezeTableName: true, // Setting the table name to be the same as the model name
    underscored: true, // Using underscores instead of camelCase for automatically added attributes
    modelName: 'product_tag', // Setting the model name to 'product_tag'
  }
);

// Exporting the ProductTag model for use in other parts of the application
module.exports = ProductTag;
