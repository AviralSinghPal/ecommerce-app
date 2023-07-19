// server.js
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');

const cookieParser = require('cookie-parser'); 
// Load environment variables from .env file
dotenv.config();

// Create Express app
const app = express();
const PORT = process.env.port;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());
app.use(cookieParser()); // Use cookie-parser middleware



// Import route files
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const couponRoutes = require('./routes/couponRoutes');

// Use route files
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/coupons', couponRoutes);


//connect to DB
connectDB();
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
