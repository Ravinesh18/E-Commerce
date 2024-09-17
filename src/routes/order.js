const express = require('express');
const Order = require('../models/order');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

// Create order
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { products, totalAmount } = req.body;
    const order = new Order({
      user: req.user.id,
      products,
      totalAmount,
    });
    await order.save();
    res.json(order);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Get user's orders
router.get('/', authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).populate('products.product');
    res.json(orders);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
