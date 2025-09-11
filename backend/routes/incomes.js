
const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const {
  getAllIncomes,
  getIncome,
  createIncome,
  updateIncome,
  deleteIncome
} = require('../controllers/incomeController');

const router = express.Router();

router.use(authenticateToken);

router.get('/', getAllIncomes);
router.get('/:id', getIncome);
router.post('/', createIncome);
router.put('/:id', updateIncome);
router.delete('/:id', deleteIncome);

module.exports = router;
