const express = require('express');
const PaymentController = require('../controllers/PaymentController');
const authenticateToken = require('../middlewares/auth');

const router = express.Router();

router.post('/make', authenticateToken, PaymentController.makePayment);
router.get('/history', authenticateToken, PaymentController.getPaymentHistory);

module.exports = router;
