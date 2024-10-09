const express = require('express');
const PaymentController = require('../controllers/PaymentController');
const authenticateToken = require('../middlewares/auth');

const router = express.Router();

router.post('/make', authenticateToken, PaymentController.makePayment);   // Make a payment
router.get('/history', authenticateToken, PaymentController.getPaymentHistory); // Get payment history

module.exports = router;
