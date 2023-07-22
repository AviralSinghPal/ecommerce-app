// backend/routes/couponRoutes.js
const express = require('express');
const router = express.Router();
const couponController = require('../controllers/couponController');
const {authenticateUser, authorizeAdmin} = require('../middleware/auth');

router.post('/',authenticateUser ,authorizeAdmin ,couponController.createCoupon);//admin route
router.get('/', couponController.getAllCoupons);
router.get('/:id', couponController.getCouponById);
router.put('/:id',authenticateUser ,authorizeAdmin ,couponController.updateCoupon);//admin route
router.delete('/:id',authenticateUser ,authorizeAdmin ,couponController.deleteCoupon);//admin route

module.exports = router;
