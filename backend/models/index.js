
const sequelize = require('../config/database');
const User = require('./User');
const Expense = require('./Expense');
const Income = require('./Income');
const Category = require('./Category');

// Define associations
User.hasMany(Expense, { foreignKey: 'userId', as: 'expenses' });
Expense.belongsTo(User, { foreignKey: 'userId', as: 'user' });

User.hasMany(Income, { foreignKey: 'userId', as: 'incomes' });
Income.belongsTo(User, { foreignKey: 'userId', as: 'user' });

User.hasMany(Category, { foreignKey: 'userId', as: 'categories' });
Category.belongsTo(User, { foreignKey: 'userId', as: 'user' });

Category.hasMany(Expense, { foreignKey: 'categoryId', as: 'expenses' });
Expense.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });

module.exports = {
  sequelize,
  User,
  Expense,
  Income,
  Category
};
