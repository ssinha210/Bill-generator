const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: String,
});

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: String,
});

const Category = mongoose.model('Category', categorySchema);
const Product = mongoose.model('Product', productSchema);

module.exports = { Category, Product };
