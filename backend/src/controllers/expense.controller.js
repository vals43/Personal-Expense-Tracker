import {getExpensesFiltered,getExpenseById,createExpense,updateExpense,deleteExpense} from "../models/expense.model.js";
export const getExpenses = async (req, res) => {
    try {
        const { month, day, type, category_id, amount_min, amount_max, start_date, end_date , limit} = req.query;
        const filters = { month, day, type, category_id, amount_min, amount_max, start_date, end_date , limit: limit ? parseInt(limit, 10) : undefined,};

        // ➡️ Ajoutez cette ligne ici
        console.log("Filtres reçus par le contrôleur:", filters);

        const expenses = await getExpensesFiltered(filters);
        if (!expenses.length) return res.status(404).json({ error: "Not found" });

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
        const expense = await updateExpense({ id: req.params.id, ...req.body });
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
