
const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const {
  getMonthlySummary,
  getCustomSummary,
  getBudgetAlerts
} = require('../controllers/summaryController');

const router = express.Router();

router.use(authenticateToken);

router.get('/monthly', getMonthlySummary);
router.get('/', getCustomSummary);
router.get('/alerts', getBudgetAlerts);

module.exports = router;
