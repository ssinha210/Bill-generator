const express = require('express');
const { Category, Product } = require('./Database');

const router = express.Router();

// Add a new category
router.post('/add-category', async (req, res) => {
  try {
    const category = new Category(req.body);
    await category.save();
    res.status(201).send(category);
  } catch (error) {
    res.status(500).send({ error: 'Failed to add category' });
  }
});

// Add a new product
router.post('/add-product', async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).send(product);
  } catch (error) {
    res.status(500).send({ error: 'Failed to add product' });
  }
});

// Get all categories
router.get('/categories', async (req, res) => {
  try {
    const categories = await Category.find();
    res.send(categories);
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch categories' });
  }
});

// Get all products
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.send(products);
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch products' });
  }
});

// Get products by category
router.get('/products/:category', async (req, res) => {
  try {
    const products = await Product.find({ category: req.params.category });
    res.send(products);
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch products by category' });
  }
});

// Delete category by ID
router.delete('/delete-category/:id', async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).send({ error: 'Category not found' });
    }
    res.send({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).send({ error: 'Failed to delete category' });
  }
});

// Delete product by ID
router.delete('/delete-product/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).send({ error: 'Product not found' });
    }
    res.send({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).send({ error: 'Failed to delete product' });
  }
});

module.exports = router;
