const express = require('express');
const WazapController = require('../controllers/WazapController');
const authenticateToken = require('../middleware/auth');

const router = express.Router();

router.post('/send-text', authenticateToken, WazapController.sendText);
router.post('/send-bulk-text', authenticateToken, WazapController.sendBulkText);
router.post('/send-media', authenticateToken, WazapController.sendMedia);

module.exports = router;
