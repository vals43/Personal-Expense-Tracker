const path = require('path');
const { Expense } = require('../models');
const fs = require('fs').promises;

const getReceipt = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const expense = await Expense.findOne({
      where: { id, userId },
    });

    if (!expense || !expense.receipt) {
      return res.status(404).json({ error: 'Receipt not found' });
    }

    const filePath = path.join(__dirname, '../uploads', expense.receipt);

    // Check if the file exists before sending
    await fs.access(filePath, fs.constants.F_OK);
    res.sendFile(filePath);
  } catch (error) {
    // Handle file not found or other errors
    if (error.code === 'ENOENT') {
      return res.status(404).json({ error: 'File not found' });
    }
    console.error('Error fetching receipt:', error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getReceipt,
};