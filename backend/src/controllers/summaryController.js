
const { Expense, Income } = require('../models');
const moment = require('moment');

const getMonthlySummary = async (req, res) => {
  try {
    const userId = req.user.id;
    const { month } = req.query;
    
    const targetMonth = month ? moment(month) : moment();
    const startOfMonth = targetMonth.startOf('month').toDate();
    const endOfMonth = targetMonth.endOf('month').toDate();
    
    // Get expenses for the month
    const expenses = await Expense.findAll({
      where: {
        userId,
        date: {
          $between: [startOfMonth, endOfMonth]
        }
      }
    });
    
    // Get incomes for the month
    const incomes = await Income.findAll({
      where: {
        userId,
        date: {
          $between: [startOfMonth, endOfMonth]
        }
      }
    });
    
    // Calculate totals
    const totalExpenses = expenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
    const totalIncome = incomes.reduce((sum, income) => sum + parseFloat(income.amount), 0);
    const balance = totalIncome - totalExpenses;
    
    // Group expenses by category
    const expensesByCategory = {};
    expenses.forEach(expense => {
      const categoryName = expense.categoryId || 'Uncategorized';
      if (!expensesByCategory[categoryName]) {
        expensesByCategory[categoryName] = 0;
      }
      expensesByCategory[categoryName] += parseFloat(expense.amount);
    });
    
    res.status(200).json({
      period: {
        start: startOfMonth,
        end: endOfMonth
      },
      totals: {
        expenses: totalExpenses,
        income: totalIncome,
        balance: balance
      },
      expensesByCategory,
      expenseCount: expenses.length,
      incomeCount: incomes.length
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCustomSummary = async (req, res) => {
  try {
    const userId = req.user.id;
    const { start, end } = req.query;
    
    if (!start || !end) {
      return res.status(400).json({ error: 'Start and end dates are required' });
    }
    
    const startDate = new Date(start);
    const endDate = new Date(end);
    
    // Get expenses for the period
    const expenses = await Expense.findAll({
      where: {
        userId,
        date: {
          $between: [startDate, endDate]
        }
      }
    });
    
    // Get incomes for the period
    const incomes = await Income.findAll({
      where: {
        userId,
        date: {
          $between: [startDate, endDate]
        }
      }
    });
    
    // Calculate totals
    const totalExpenses = expenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
    const totalIncome = incomes.reduce((sum, income) => sum + parseFloat(income.amount), 0);
    const balance = totalIncome - totalExpenses;
    
    // Group expenses by category
    const expensesByCategory = {};
    expenses.forEach(expense => {
      const categoryName = expense.categoryId || 'Uncategorized';
      if (!expensesByCategory[categoryName]) {
        expensesByCategory[categoryName] = 0;
      }
      expensesByCategory[categoryName] += parseFloat(expense.amount);
    });
    
    res.status(200).json({
      period: {
        start: startDate,
        end: endDate
      },
      totals: {
        expenses: totalExpenses,
        income: totalIncome,
        balance: balance
      },
      expensesByCategory,
      expenseCount: expenses.length,
      incomeCount: incomes.length
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getBudgetAlerts = async (req, res) => {
  try {
    const userId = req.user.id;
    // This is a simple implementation - you might want to add budget settings per category
    const currentMonth = moment().format('YYYY-MM');
    
    const summary = await getMonthlySummary(req, res, true);
    
    // Simple alert logic - if expenses are more than 90% of income
    const alertThreshold = 0.9; // 90%
    const alert = summary.totals.income > 0 && 
                 (summary.totals.expenses / summary.totals.income) > alertThreshold;
    
    res.status(200).json({
      alert,
      message: alert ? 
        `Warning: Your expenses are ${((summary.totals.expenses / summary.totals.income) * 100).toFixed(2)}% of your income this month.` :
        'Your finances are within safe limits.',
      details: summary
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getMonthlySummary,
  getCustomSummary,
  getBudgetAlerts
};
