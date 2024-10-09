// routes/userRoutes.js
const express = require('express');
const AuthController = require('../controllers/AuthController');
const authenticateToken = require('../middlewares/auth');

const router = express.Router();

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.get('/profile', authenticateToken, AuthController.getProfile);

module.exports = router;
