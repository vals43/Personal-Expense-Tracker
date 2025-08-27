
const { Expense, Category } = require('../models');

const getAllExpenses = async (req, res) => {
  try {
    const { start, end, category, type } = req.query;
    const userId = req.user.id;
    
    let whereClause = { userId };
    
    if (start && end) {
      whereClause.date = {
        $between: [new Date(start), new Date(end)]
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
    res.status(500).json({ error: error.message });
  }
};

const createExpense = async (req, res) => {
  try {
    const userId = req.user.id;
    const { amount, date, categoryId, description, type, startDate, endDate } = req.body;
    const receipt = req.file ? req.file.filename : null;
    
    const expense = await Expense.create({
      amount,
      date,
      categoryId,
      description,
      type: type || 'one-time',
      startDate,
      endDate,
      receipt,
      userId
    });
    
    const newExpense = await Expense.findByPk(expense.id, {
      include: [{ model: Category, as: 'category' }]
    });
    
    res.status(201).json(newExpense);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const { amount, date, categoryId, description, type, startDate, endDate } = req.body;
    const receipt = req.file ? req.file.filename : undefined;
    
    const expense = await Expense.findOne({ where: { id, userId } });
    
    if (!expense) {
      return res.status(404).json({ error: 'Expense not found' });
    }
    
    const updateData = {
      ...(amount !== undefined && { amount }),
      ...(date !== undefined && { date }),
      ...(categoryId !== undefined && { categoryId }),
      ...(description !== undefined && { description }),
      ...(type !== undefined && { type }),
      ...(startDate !== undefined && { startDate }),
      ...(endDate !== undefined && { endDate }),
      ...(receipt !== undefined && { receipt })
    };
    
    await expense.update(updateData);
    
    const updatedExpense = await Expense.findByPk(id, {
      include: [{ model: Category, as: 'category' }]
    });
    
    res.status(200).json(updatedExpense);
  } catch (error) {
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
