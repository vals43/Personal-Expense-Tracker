const { Expense, Category } = require('../models');
const { Op } = require('sequelize');
const moment = require('moment');

const getAllExpenses = async (req, res) => {
  try {
    const { start, end, category, type } = req.query;
    const userId = req.user.id;

    let whereClause = { userId };

    if (start && end) {
      // Use moment to create reliable date objects for filtering
      const startDate = moment.utc(start).startOf('day').toDate();
      const endDate = moment.utc(end).endOf('day').toDate();
      
      whereClause.date = {
        [Op.between]: [startDate, endDate]
      };
    }
    
    if (category) {
      whereClause.categoryId = category;
    }
    
    if (type) {
      whereClause.type = type;
    }
    
    const expenses = await Expense.findAll({
      where: whereClause,
      include: [{ model: Category, as: 'category' }],
      order: [['date', 'DESC']]
    });
    
    res.status(200).json(expenses);
  } catch (error) {
    console.error('Erreur dans getAllExpenses:', error);
    res.status(500).json({ error: error.message });
  }
};

const getExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    
    const expense = await Expense.findOne({
      where: { id, userId },
      include: [{ model: Category, as: 'category' }]
    });
    
    if (!expense) {
      return res.status(404).json({ error: 'Expense not found' });
    }
    
    res.status(200).json(expense);
  } catch (error) {
    console.error('Erreur dans getExpense:', error);
    res.status(500).json({ error: error.message });
  }
};

const createExpense = async (req, res) => {
  try {
    const userId = req.user.id;
    const { amount, date, categoryId, description, type, startDate, endDate } = req.body;
    const receipt = req.file ? req.file.filename : null;

    // Validate essential fields and parse amount
    if (!amount || !categoryId) {
        return res.status(400).json({ error: 'Amount, date, and categoryId are required fields.' });
    }

    const expense = await Expense.create({
      amount: parseFloat(amount), // Ensure amount is a number
      date: moment.utc(date).toDate(), // Use moment for consistent date parsing
      categoryId,
      description,
      type: type || 'one-time',
      startDate: startDate ? moment.utc(startDate).toDate() : null,
      endDate: endDate ? moment.utc(endDate).toDate() : null,
      receipt,
      userId
    });
    
    const newExpense = await Expense.findByPk(expense.id, {
      include: [{ model: Category, as: 'category' }]
    });
    
    res.status(201).json(newExpense);
  } catch (error) {
    console.error('Erreur dans createExpense:', error);
    res.status(500).json({ error: error.message });
  }
};

const updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const { amount, date, categoryId, description, type, startDate, endDate, clearReceipt } = req.body;
    const receipt = req.file ? req.file.filename : undefined;
    
    const expense = await Expense.findOne({ where: { id, userId } });
    
    if (!expense) {
      return res.status(404).json({ error: 'Expense not found' });
    }
    
    const updateData = {
      ...(amount !== undefined && { amount: parseFloat(amount) }),
      ...(date !== undefined && { date: moment.utc(date).toDate() }),
      ...(categoryId !== undefined && { categoryId }),
      ...(description !== undefined && { description }),
      ...(type !== undefined && { type }),
      ...(startDate !== undefined && { startDate: moment.utc(startDate).toDate() }),
      ...(endDate !== undefined && { endDate: moment.utc(endDate).toDate() }),
      ...(receipt !== undefined && { receipt })
    };

    // Special logic to handle removing a receipt
    if (clearReceipt === 'true') {
        updateData.receipt = null;
    }
    
    await expense.update(updateData);
    
    const updatedExpense = await Expense.findByPk(id, {
      include: [{ model: Category, as: 'category' }]
    });
    
    res.status(200).json(updatedExpense);
  } catch (error) {
    console.error('Erreur dans updateExpense:', error);
    res.status(500).json({ error: error.message });
  }
};

const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    
    const expense = await Expense.findOne({ where: { id, userId } });
    
    if (!expense) {
      return res.status(404).json({ error: 'Expense not found' });
    }
    
    await expense.destroy();
    
    res.status(204).send();
  } catch (error) {
    console.error('Erreur dans deleteExpense:', error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllExpenses,
  getExpense,
  createExpense,
  updateExpense,
  deleteExpense
};