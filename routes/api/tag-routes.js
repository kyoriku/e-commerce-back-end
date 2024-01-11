// Import the 'Router' class from the 'express' library
const router = require('express').Router();

// Import models (Tag, Product, ProductTag) from the specified path
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// Route to get all tags, including associated Product data
router.get('/', async (req, res) => {
  try {
    // Use Sequelize's 'findAll' method to retrieve all tags with associated Product data
    const tags = await Tag.findAll({
      include: [{ model: Product, through: ProductTag }],
    });
    // Respond with a JSON representation of the retrieved tags
    res.status(200).json(tags);
  } catch (err) {
    // If an error occurs, respond with a 500 Internal Server Error and the error details
    res.status(500).json(err);
  }
});

// Route to get one tag by its `id`, including associated Product data
router.get('/:id', async (req, res) => {
  try {
    // Use Sequelize's 'findByPk' method to retrieve a single tag by its primary key, including associated Product data
    const tag = await Tag.findByPk(req.params.id, {
      include: [{ model: Product, through: ProductTag }],
    });

    // If the tag is not found, respond with a 404 Not Found status and a message
    if (!tag) {
      res.status(404).json({ message: 'Tag not found' });
      return;
    }

    // Respond with a JSON representation of the retrieved tag
    res.status(200).json(tag);
  } catch (err) {
    // If an error occurs, respond with a 500 Internal Server Error and the error details
    res.status(500).json(err);
  }
});

// Route to create a new tag
router.post('/', async (req, res) => {
  try {
    // Use Sequelize's 'create' method to create a new tag with the provided request body
    const newTag = await Tag.create(req.body);
    // Respond with a 201 Created status and a JSON representation of the newly created tag
    res.status(201).json(newTag);
  } catch (err) {
    // If an error occurs, respond with a 400 Bad Request status and the error details
    res.status(400).json(err);
  }
});

// Route to update a tag's name by its `id` value
router.put('/:id', async (req, res) => {
  try {
    // Use Sequelize's 'update' method to update a tag's name, returning the updated tag(s)
    const [rowsUpdated, updatedTags] = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
      returning: true, // make sure to return the updated tag(s)
    });

    // If no rows were updated (tag not found), respond with a 404 Not Found status and a message
    if (rowsUpdated === 0) {
      res.status(404).json({ message: 'Tag not found' });
      return;
    }

    // Respond with a 200 OK status and a success message
    res.status(200).json({ message: 'Tag updated successfully', updatedTags });
  } catch (err) {
    // If an error occurs, respond with a 500 Internal Server Error and the error details
    res.status(500).json(err);
  }
});

// Route to delete one tag by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    // Use Sequelize's 'destroy' method to delete a tag by its primary key
    const deletedTag = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    // If no rows were affected (tag not found), respond with a 404 Not Found status and a message
    if (!deletedTag) {
      res.status(404).json({ message: 'Tag not found' });
      return;
    }

    // Respond with a 200 OK status and a success message
    res.status(200).json({ message: 'Tag deleted successfully' });
  } catch (err) {
    // If an error occurs, respond with a 500 Internal Server Error and the error details
    res.status(500).json(err);
  }
});

// Export the router to make it available for use in other files
module.exports = router;
