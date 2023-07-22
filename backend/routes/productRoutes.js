// backend/routes/productRoutes.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const {authenticateUser, authorizeAdmin} = require('../middleware/auth');

router.post('/createproduct',authenticateUser ,authorizeAdmin , productController.createProduct);//admin route
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.put('/:id',authenticateUser ,authorizeAdmin , productController.updateProduct);//admin route
router.delete('/:id',authenticateUser ,authorizeAdmin , productController.deleteProduct);//admin route

module.exports = router;
