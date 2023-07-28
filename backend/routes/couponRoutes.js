// backend/routes/couponRoutes.js
const express = require('express');
const router = express.Router();
const couponController = require('../controllers/couponController');
const {authenticateUser, authorizeAdmin} = require('../middleware/auth');

router.post('/',authenticateUser ,authorizeAdmin ,couponController.createCoupon);//admin route
router.get('/', couponController.getAllCoupons);
router.get('/:code', couponController.getCouponById);
router.put('/:code',authenticateUser ,authorizeAdmin ,couponController.updateCoupon);//admin route
router.delete('/:code',authenticateUser ,authorizeAdmin ,couponController.deleteCoupon);//admin route

module.exports = router;
