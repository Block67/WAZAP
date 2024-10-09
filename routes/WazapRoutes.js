const express = require('express');
const WazapController = require('../controllers/WazapController');
const authenticateToken = require('../middleware/auth');

const router = express.Router();

router.post('/send-text', authenticateToken, WazapController.sendText); // Send a text message
router.post('/send-bulk-text', authenticateToken, WazapController.sendBulkText); // Send bulk text messages
router.post('/send-media', authenticateToken, WazapController.sendMedia); // Send media file

module.exports = router;
