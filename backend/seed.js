// backend/seed.js
const connectDB = require('./config/db');
const User = require('./models/User');
const Product = require('./models/Product');
const Coupon = require('./models/Coupon');

// Function to seed the database with dummy data
const seedDatabase = async () => {
  try {
    // Connect to the database
    await connectDB();

    // Dummy users
    const users = [
      { username: 'user1', email: 'user1@example.com', password: 'password1' },
      { username: 'user2', email: 'user2@example.com', password: 'password2' },
      { username: 'user3', email: 'user3@example.com', password: 'password3' },
    ];

    // Create users in the database
    await User.insertMany(users);

    // Dummy products
    const products = [
      { name: 'Product 1', price: 10, description: 'Description for Product 1' },
      { name: 'Product 2', price: 20, description: 'Description for Product 2' },
      { name: 'Product 3', price: 30, description: 'Description for Product 3' },
    ];

    // Create products in the database
    await Product.insertMany(products);

    // Dummy coupons
    const coupons = [
      { code: 'COUPON10', amount: 10 },
      { code: 'COUPON20', amount: 20 },
      { code: 'COUPON30', amount: 30 },
    ];

    // Create coupons in the database
    await Coupon.insertMany(coupons);

    console.log('Dummy data seeded successfully.');
    process.exit();
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

// Call the seedDatabase function to seed the data
seedDatabase();
