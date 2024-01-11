// Importing the models for Product, Category, Tag, and ProductTag
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Defining associations between models using Sequelize associations

// Products belong to a single Category
Product.belongsTo(Category, { // Associates 'Product' with a single 'Category', indicating a many-to-one relationship.
  foreignKey: 'category_id', // Foreign key in the 'Products' model referring to 'Categories' model
});

// Categories have many Products
Category.hasMany(Product, { // Associates 'Category' with multiple 'Product' instances, indicating a one-to-many relationship
  foreignKey: 'category_id', // Foreign key in the 'Products' model referring to 'Categories' model
});

// Products belong to many Tags through the ProductTag join table
Product.belongsToMany(Tag, { // Associates 'Product' with multiple 'Tag' instances, indicating a many-to-many relationship
  through: ProductTag, // Specifies the join table that establishes the association
  foreignKey: 'product_id', // Foreign key in the 'ProductTag' model referring to 'Product' model
});

// Tags belong to many Products through the ProductTag join table
Tag.belongsToMany(Product, { // Associates 'Tag' with multiple 'Product' instances, indicating a many-to-many relationship
  through: ProductTag, // Specifies the join table that establishes the association
  foreignKey: 'tag_id', // Foreign key in the 'ProductTag' model referring to 'Tag' model
});

// Exporting the models for use in other parts of the application
module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
