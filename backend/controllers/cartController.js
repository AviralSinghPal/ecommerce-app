// backend/controllers/cartController.js
const Coupon = require('../models/Coupon');


exports.addItemToCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    // First, find the user by their ID
    const user = await User.findById(userId);

    // Add the product ID to the user's cartItems array
    user.cartItems.push(productId);

    // Save the updated user object
    await user.save();

    res.status(200).json({ message: 'Item added to cart successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add item to cart', error: error.message });
  }
};

exports.removeItemFromCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    // First, find the user by their ID
    const user = await User.findById(userId);

    // Remove the product ID from the user's cartItems array
    user.cartItems = user.cartItems.filter((item) => item.toString() !== productId);

    // Save the updated user object
    await user.save();

    res.status(200).json({ message: 'Item removed from cart successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to remove item from cart', error: error.message });
  }
};

exports.applyCoupon = async (req, res) => {
  try {
    const { userId, couponCode } = req.body;

    const coupon = await Coupon.findOne({ code: couponCode });

    if (!coupon) {
      return res.status(404).json({ message: 'Coupon code not found' });
    }

    // First, find the user by their ID
    const user = await User.findById(userId);

    // Calculate the total amount of the cart based on the cartItems
    // (You'll need to get the product prices and quantities from the database)
    const totalAmount = 0; // Calculate the total amount based on the user's cartItems

    // Apply the coupon discount to the cart's total amount
    const discountedTotalAmount = totalAmount - coupon.amount;

    res.status(200).json({ message: 'Coupon applied successfully', discountedTotalAmount });
  } catch (error) {
    res.status(500).json({ message: 'Failed to apply coupon', error: error.message });
  }
};

