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
    // await User.insertMany(users);

    // Dummy products
    const products = [
      { name: 'Laptop', price: 800, description: 'High-performance laptop for professional use' },
      { name: 'Smartphone', price: 500, description: 'Latest smartphone with advanced features' },
      { name: 'Camera', price: 600, description: 'Professional DSLR camera with high-resolution' },
      { name: 'Headphones', price: 100, description: 'Wireless headphones with noise-canceling' },
      { name: 'Smartwatch', price: 250, description: 'Fitness smartwatch with heart rate monitor' },
      { name: 'Bluetooth Speaker', price: 80, description: 'Portable Bluetooth speaker with great sound quality' },
      { name: 'Gaming Console', price: 400, description: 'Next-gen gaming console for immersive gaming experience' },
      { name: 'Tablet', price: 300, description: 'Slim and lightweight tablet for on-the-go productivity' },
      { name: 'Printers', price: 150, description: 'All-in-one printer for home and office use' },
      { name: 'Wireless Router', price: 80, description: 'High-speed wireless router for seamless internet connectivity' },
      { name: 'External Hard Drive', price: 120, description: '1TB external hard drive for data backup and storage' },
      { name: 'Graphics Card', price: 350, description: 'Powerful graphics card for smooth gaming performance' },
      { name: 'Fitness Tracker', price: 70, description: 'Activity tracker to monitor fitness and health' },
      { name: 'Wireless Earbuds', price: 120, description: 'True wireless earbuds with long battery life' },
      { name: 'Smart Thermostat', price: 200, description: 'Energy-efficient smart thermostat for home automation' },
      { name: 'Robot Vacuum', price: 300, description: 'Robotic vacuum cleaner for automated cleaning' },
      { name: 'Smart Home Security Camera', price: 180, description: 'Wireless security camera with motion detection' },
      { name: 'Electric Scooter', price: 450, description: 'Foldable electric scooter for urban commuting' },
      { name: 'Electric Toothbrush', price: 80, description: 'High-tech electric toothbrush for dental care' },
      { name: 'Portable Power Bank', price: 40, description: '10000mAh power bank for charging devices on the go' },
    ];

    // Create products in the database
    await Product.insertMany(products);

    // Dummy coupons
    const coupons = [
      // { code: 'COUPON10', amount: 10 },
      // { code: 'COUPON20', amount: 20 },
      // { code: 'COUPON30', amount: 30 },
      { code: 'SALE10', amount: 10 },
      { code: 'DISCOUNT20', amount: 20 },
      { code: 'OFF30', amount: 30 },
   
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
