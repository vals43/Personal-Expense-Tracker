
const path = require('path');
const { Expense } = require('../models');

const getReceipt = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    
    const expense = await Expense.findOne({
      where: { id, userId }
    });
    
    if (!expense || !expense.receipt) {
      return res.status(404).json({ error: 'Receipt not found' });
    }
    
    const filePath = path.join(__dirname, '../uploads', expense.receipt);
    
    res.sendFile(filePath, (err) => {
      if (err) {
        res.status(404).json({ error: 'File not found' });
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getReceipt
};
