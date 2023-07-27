// server.js
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const morgan = require('morgan');
const cookieParser = require('cookie-parser'); 

dotenv.config();


const app = express();
const PORT = process.env.port;


app.use(express.json());
app.use(cors());
app.use(cookieParser()); 
app.use(morgan('tiny'))// logger 


// Routes
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
