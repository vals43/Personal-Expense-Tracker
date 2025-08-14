import {getAllExpenses,getExpenseById,createExpense,updateExpense,deleteExpense} from "../models/expense.model.js";

export const getExpenses = async (req, res) => {
    try {
        const expenses = await getAllExpenses();
        res.json(expenses);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getExpense = async (req, res) => {
    try {
        const expense = await getExpenseById(req.params.id);
        if (!expense) return res.status(404).json({ error: "Not found" });
        res.json(expense);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const addExpense = async (req, res) => {
    try {
        const expense = await createExpense(req.body);
        res.status(201).json(expense);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const editExpense = async (req, res) => {
    try {
        const expense = await updateExpense(req.params.id, req.body);
        res.json(expense);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const removeExpense = async (req, res) => {
    try {
        await deleteExpense(req.params.id);
        res.json({ message: "Deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
