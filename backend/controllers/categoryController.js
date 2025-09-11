
const { Category } = require('../models');

const getAllCategories = async (req, res) => {
  try {
    const userId = req.user.id;
    
    const categories = await Category.findAll({
      where: { userId },
      order: [['name', 'ASC']]
    });
    
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createCategory = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name } = req.body;
    
    const category = await Category.create({
      name,
      userId
    });
    
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const { name } = req.body;
    
    const category = await Category.findOne({ where: { id, userId } });
    
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    
    await category.update({ name });
    
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    
    const category = await Category.findOne({ where: { id, userId } });
    
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    
    // Check if category is used in expenses
    const expenseCount = await category.countExpenses();
    if (expenseCount > 0) {
      return res.status(400).json({ error: 'Cannot delete category with associated expenses' });
    }
    
    await category.destroy();
    
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory
};
