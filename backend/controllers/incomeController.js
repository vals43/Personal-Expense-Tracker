
const { Income } = require('../models');

const getAllIncomes = async (req, res) => {
  try {
    const { start, end } = req.query;
    const userId = req.user.id;
    
    let whereClause = { userId };
    
    if (start && end) {
      whereClause.date = {
        $between: [new Date(start), new Date(end)]
      };
    }
    
    const incomes = await Income.findAll({
      where: whereClause,
      order: [['date', 'DESC']]
    });
    
    res.status(200).json(incomes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getIncome = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    
    const income = await Income.findOne({ where: { id, userId } });
    
    if (!income) {
      return res.status(404).json({ error: 'Income not found' });
    }
    
    res.status(200).json(income);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createIncome = async (req, res) => {
  try {
    const userId = req.user.id;
    const { amount, date, source, description } = req.body;
    
    const income = await Income.create({
      amount,
      date,
      source,
      description,
      userId
    });
    
    res.status(201).json(income);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateIncome = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const { amount, date, source, description } = req.body;
    
    const income = await Income.findOne({ where: { id, userId } });
    
    if (!income) {
      return res.status(404).json({ error: 'Income not found' });
    }
    
    const updateData = {
      ...(amount !== undefined && { amount }),
      ...(date !== undefined && { date }),
      ...(source !== undefined && { source }),
      ...(description !== undefined && { description })
    };
    
    await income.update(updateData);
    
    const updatedIncome = await Income.findByPk(id);
    
    res.status(200).json(updatedIncome);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteIncome = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    
    const income = await Income.findOne({ where: { id, userId } });
    
    if (!income) {
      return res.status(404).json({ error: 'Income not found' });
    }
    
    await income.destroy();
    
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllIncomes,
  getIncome,
  createIncome,
  updateIncome,
  deleteIncome
};
