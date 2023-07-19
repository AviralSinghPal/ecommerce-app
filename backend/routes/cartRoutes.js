// backend/routes/cartRoutes.js
const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const authMiddleware = require('../middlewares/auth');

// Middleware to authenticate users
router.use(authMiddleware);

// Apply coupon code and calculate the discounted total amount
router.post('/apply-coupon', cartController.applyCoupon);

// Add item to cart
router.post('/add-item', cartController.addItemToCart);

// Remove item from cart
router.delete('/remove-item/:productId', cartController.removeItemFromCart);

// Update item quantity in cart
router.put('/update-quantity/:productId', cartController.updateItemQuantity);

// Get cart items and total amount
router.get('/get-cart', cartController.getCart);

module.exports = router;
