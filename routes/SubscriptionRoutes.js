const express = require('express');
const SubscriptionController = require('../controllers/SubscriptionController');
const authenticateToken = require('../middlewares/auth');

const router = express.Router();

router.get('/get-all-subscription', SubscriptionController.getAllSubscriptions);
router.post('/subscribe', authenticateToken, SubscriptionController.subscribe);

module.exports = router;
