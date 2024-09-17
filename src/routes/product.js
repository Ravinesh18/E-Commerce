const express = require('express');
const Product = require('../models/product');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { name, price, description, category, stock } = req.body;
    const product = new Product({ name, price, description, category, stock });
    await product.save();
    res.json(product);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

const { check, validationResult } = require('express-validator');

router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('price', 'Price should be a positive number').isFloat({ min: 0 }),
    check('stock', 'Stock should be a non-negative integer').isInt({ min: 0 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  }
);


module.exports = router;
