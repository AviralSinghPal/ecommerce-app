// backend/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const {authenticateUser, authorizeAdmin} = require('../middleware/auth');

router.post('/createuser', userController.createUser);
router.post('/login', userController.loginUser);
router.get('/me', userController.getUserByToken);
router.get('/', authenticateUser ,authorizeAdmin ,userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);
router.post('/logout', userController.logoutUser);


module.exports = router;
