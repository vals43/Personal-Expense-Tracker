import express from 'express';
import { addExpense,editExpense,getExpense,getExpenses,removeExpense} from '../controllers/expense.controller.js';

const router = express.Router();

router.get('/', getExpenses);
router.get('/:id', getExpense);
router.post('/', addExpense);
router.put('/:id', editExpense);
router.delete('/:id', removeExpense);

export default router;
