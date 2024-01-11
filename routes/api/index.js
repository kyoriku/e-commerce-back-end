// Import the 'Router' class from the 'express' library
const router = require('express').Router();

// Import routes for categories, products, and tags from the specified files
const categoryRoutes = require('./category-routes');
const productRoutes = require('./product-routes');
const tagRoutes = require('./tag-routes');

// Use the imported routes for specific endpoints under the main router
router.use('/categories', categoryRoutes);
router.use('/products', productRoutes);
router.use('/tags', tagRoutes);

// Export the main router, including the specified sub-routes, to make it available for use in other files
module.exports = router;
