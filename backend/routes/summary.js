
const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const {
  getMonthlySummary,
  getCustomSummary,
  getBudgetAlerts,
  getDailyAverages,
  getIncomesBySource,
  getExpensesByCategory
} = require('../controllers/summaryController');

const router = express.Router();

router.use(authenticateToken);

router.get('/monthly', getMonthlySummary);
router.get('/daily', getDailyAverages);
router.get('/', getCustomSummary);
router.get('/alerts', getBudgetAlerts);
router.get('/incomeCategory', getIncomesBySource);
router.get('/expensesCategory', getExpensesByCategory);

module.exports = router;
