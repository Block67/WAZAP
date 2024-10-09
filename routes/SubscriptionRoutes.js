const express = require('express');
const SubscriptionController = require('../controllers/SubscriptionController');
const authenticateToken = require('../middlewares/auth');

const router = express.Router();

router.get('/', SubscriptionController.getAllSubscriptions);         // Get all subscriptions
router.post('/subscribe', authenticateToken, SubscriptionController.subscribe); // Subscribe to a plan

module.exports = router;
