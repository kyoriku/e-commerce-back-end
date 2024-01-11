// Import the 'Router' class from the 'express' library
const router = require('express').Router();

// Import models (Product, Category, Tag, ProductTag) from the specified path
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// Route to get all products, including associated Category and Tag data
router.get('/', async (req, res) => {
  try {
    // Use Sequelize's 'findAll' method to retrieve all products with associated Category and Tag data
    const products = await Product.findAll({
      include: [
        { model: Category },
        { model: Tag, through: ProductTag },
      ],
    });
    // Respond with a JSON representation of the retrieved products
    res.status(200).json(products);
  } catch (err) {
    // If an error occurs, respond with a 500 Internal Server Error and the error details
    res.status(500).json(err);
  }
});

// Route to get one product by its `id`, including associated Category and Tag data
router.get('/:id', async (req, res) => {
  try {
    // Use Sequelize's 'findByPk' method to retrieve a single product by its primary key, including associated Category and Tag data
    const product = await Product.findByPk(req.params.id, {
      include: [
        { model: Category },
        { model: Tag, through: ProductTag },
      ],
    });

    // If the product is not found, respond with a 404 Not Found status and a message
    if (!product) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }

    // Respond with a JSON representation of the retrieved product
    res.status(200).json(product);
  } catch (err) {
    // If an error occurs, respond with a 500 Internal Server Error and the error details
    res.status(500).json(err);
  }
});

// Route to create a new product
router.post('/', async (req, res) => {
  try {
    // Use Sequelize's 'create' method to create a new product with the provided request body
    const newProduct = await Product.create(req.body);

    // If there are product tags, create pairings to bulk create in the ProductTag model
    if (req.body.tagIds && req.body.tagIds.length) {
      const productTagIdArr = req.body.tagIds.map((tag_id) => {
        return {
          product_id: newProduct.id,
          tag_id,
        };
      });
      await ProductTag.bulkCreate(productTagIdArr);
    }

    // Respond with a 201 Created status and a JSON representation of the newly created product
    res.status(201).json(newProduct);
  } catch (err) {
    // If an error occurs, respond with a 400 Bad Request status and the error details
    res.status(400).json(err);
  }
});

// Route to update a product by its `id`
router.put('/:id', async (req, res) => {
  try {
    // Use Sequelize's 'update' method to update product data, returning the updated product(s)
    const [rowsUpdated, updatedProducts] = await Product.update(req.body, {
      where: {
        id: req.params.id,
      },
      returning: true, // make sure to return the updated product(s)
    });

    // If no rows were updated (product not found), respond with a 404 Not Found status and a message
    if (rowsUpdated === 0) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }

    // If there are tag updates, handle them
    if (req.body.tagIds && req.body.tagIds.length) {
      // Remove existing product tags
      const productTagsToRemove = await ProductTag.destroy({
        where: {
          product_id: req.params.id,
        },
      });

      // Create new product tags
      const productTagIdArr = req.body.tagIds.map((tag_id) => {
        return {
          product_id: req.params.id,
          tag_id,
        };
      });

      const newProductTags = await ProductTag.bulkCreate(productTagIdArr);

      // Respond with a 200 OK status and success messages
      res.status(200).json({
        message: 'Product and tags updated successfully',
        updatedProducts,
        productTagsToRemove,
        newProductTags,
      });
    } else {
      // If no tag updates, respond with a 200 OK status and a success message
      res.status(200).json({ message: 'Product updated successfully', updatedProducts });
    }
  } catch (err) {
    // If an error occurs, respond with a 500 Internal Server Error and the error details
    res.status(500).json(err);
  }
});

// Route to delete one product by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    // Use Sequelize's 'destroy' method to delete a product by its primary key
    const deletedProduct = await Product.destroy({
      where: {
        id: req.params.id,
      },
    });

    // If no rows were affected (product not found), respond with a 404 Not Found status and a message
    if (!deletedProduct) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }

    // Respond with a 200 OK status and a success message
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
    // If an error occurs, respond with a 500 Internal Server Error and the error details
    res.status(500).json(err);
  }
});

// Export the router to make it available for use in other files
module.exports = router;
