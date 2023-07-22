// backend/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const {authenticateUser, authorizeAdmin} = require('../middleware/auth');

router.post('/createuser', userController.createUser);
router.post('/login', userController.loginUser);
router.get('/me', userController.getUserByToken);
router.get('/', authenticateUser ,authorizeAdmin ,userController.getAllUsers);//admin route
router.get('/:id', authenticateUser ,authorizeAdmin ,userController.getUserById);//admin route
router.put('/:id', authenticateUser ,authorizeAdmin ,userController.updateUser);//admin route
router.delete('/:id', authenticateUser ,authorizeAdmin ,userController.deleteUser);//admin route
router.post('/logout', userController.logoutUser);


module.exports = router;
