
const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const { getReceipt } = require('../controllers/receiptController');

const router = express.Router();

router.use(authenticateToken);

router.get('/:id', getReceipt);

module.exports = router;
