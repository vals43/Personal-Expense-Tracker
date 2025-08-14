import express from 'express';
import { addExpense,editExpense,getExpense,getExpenses,getMonthExpense,removeExpense} from '../controllers/expense.controller.js';

const router = express.Router();

router.get('/', getExpenses);
router.get('/:id', getExpense);
router.get('/month/:month_id', getMonthExpense);
router.post('/', addExpense);
router.put('/:id', editExpense);
router.delete('/:id', removeExpense);

export default router;
