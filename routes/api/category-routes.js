// Import the 'Router' class from the 'express' library
const router = require('express').Router();

// Import the 'Category' and 'Product' models from the specified path
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// Route to find all categories, including associated Products
router.get('/', async (req, res) => {
  try {
    // Use Sequelize's 'findAll' method to retrieve all categories with associated Products
    const categories = await Category.findAll({
      include: [{ model: Product }],
    });
    // Respond with a JSON representation of the retrieved categories
    res.status(200).json(categories);
  } catch (err) {
    // If an error occurs, respond with a 500 Internal Server Error and the error details
    res.status(500).json(err);
  }
});

// Route to find one category by its `id` value, including associated Products
router.get('/:id', async (req, res) => {
  try {
    // Use Sequelize's 'findByPk' method to retrieve a category by its primary key, including associated Products
    const category = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    // If the category is not found, respond with a 404 Not Found status and a message
    if (!category) {
      res.status(404).json({ message: 'Category not found' });
      return;
    }

    // Respond with a JSON representation of the retrieved category
    res.status(200).json(category);
  } catch (err) {
    // If an error occurs, respond with a 500 Internal Server Error and the error details
    res.status(500).json(err);
  }
});

// Route to create a new category
router.post('/', async (req, res) => {
  try {
    // Use Sequelize's 'create' method to create a new category with the provided request body
    const newCategory = await Category.create(req.body);
    // Respond with a 201 Created status and a JSON representation of the newly created category
    res.status(201).json(newCategory);
  } catch (err) {
    // If an error occurs, respond with a 400 Bad Request status and the error details
    res.status(400).json(err);
  }
});

// Route to update a category by its `id` value
router.put('/:id', async (req, res) => {
  try {
    // Use Sequelize's 'update' method to update a category with the provided request body,
    // targeting the category with the specified 'id'
    const updatedCategory = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    // If no rows were affected (category not found), respond with a 404 Not Found status and a message
    if (!updatedCategory[0]) {
      res.status(404).json({ message: 'Category not found' });
      return;
    }

    // Respond with a 200 OK status and a success message
    res.status(200).json({ message: 'Category updated successfully' });
  } catch (err) {
    // If an error occurs, respond with a 500 Internal Server Error and the error details
    res.status(500).json(err);
  }
});

// Route to delete a category by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    // Use Sequelize's 'destroy' method to delete a category by its primary key
    const deletedCategory = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    // If no rows were affected (category not found), respond with a 404 Not Found status and a message
    if (!deletedCategory) {
      res.status(404).json({ message: 'Category not found' });
      return;
    }

    // Respond with a 200 OK status and a success message
    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (err) {
    // If an error occurs, respond with a 500 Internal Server Error and the error details
    res.status(500).json(err);
  }
});

// Export the router to make it available for use in other files
module.exports = router;
