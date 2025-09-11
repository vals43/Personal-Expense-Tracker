
const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const upload = require('../middleware/upload');
const {
  getAllExpenses,
  getExpense,
  createExpense,
  updateExpense,
  deleteExpense,
  getMonthlyRecurringExpenses
} = require('../controllers/expenseController');

const router = express.Router();

router.use(authenticateToken);

router.get('/', getAllExpenses);
router.get('/recurring', getMonthlyRecurringExpenses);
router.get('/:id', getExpense);
router.post('/', upload.single('receipt'), createExpense);
router.put('/:id', upload.single('receipt'), updateExpense);
router.delete('/:id', deleteExpense);

module.exports = router;
