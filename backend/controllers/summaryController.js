const { Expense, Income, Category } = require('../models');
const { Op, fn, col } = require('sequelize');
const moment = require('moment');

// New helper function to fetch and process financial data for a given period.
// It returns the data object instead of sending an HTTP response.
const fetchSummaryData = async (userId, periodStart, periodEnd) => {
    // Fetch expenses and incomes from the database for the specified period.
    const expenses = await Expense.findAll({
        where: {
            userId,
            date: {
                [Op.between]: [periodStart, periodEnd],
            },
        },
        include: [{ model: Category, as: 'category', attributes: ['id', 'name'] }],
    });

    const incomes = await Income.findAll({
        where: {
            userId,
            date: {
                [Op.between]: [periodStart, periodEnd],
            },
        },
    });

    // Calculate the totals for expenses, income, and the balance.
    const totalExpenses = expenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
    const totalIncome = incomes.reduce((sum, income) => sum + parseFloat(income.amount), 0);
    const balance = totalIncome - totalExpenses;

    // Group expenses by category for a detailed breakdown.
    const expensesByCategory1 = expenses.reduce((acc, expense) => {
        const categoryName = expense.category ? expense.category.name : 'Uncategorized';
        acc[categoryName] = (acc[categoryName] || 0) + parseFloat(expense.amount);
        return acc;
    }, {});
    // Group incomes by category for a detailed breakdown.
    const incomesByCategory1 = incomes.reduce((acc, income) => {
        const categoryName = income.source ? income.source : 'Uncategorized';
        acc[categoryName] = (acc[categoryName] || 0) + parseFloat(income.amount);
        return acc;
    }, {});
    const incomesByCategory = Object.entries(incomesByCategory1).map(([category, amount]) => {
        return {
            category: category,
            amount: amount
        };
    });
    const expensesByCategory = Object.entries(expensesByCategory1).map(([category, amount]) => {
        return {
            name: category,
            value: amount
        };
    });
    const expensesByCategoryChart = Object.entries(expensesByCategory1).map(([category, amount]) => {
        return {
            category: category,
            amount: amount
        };
    });


    return {
        period: {
            start: periodStart.toISOString(),
            end: periodEnd.toISOString(), // Corrected line
        },
        totals: {
            expenses: totalExpenses,
            income: totalIncome,
            balance: balance,
        },
        expensesByCategory,
        incomesByCategory,
        expensesByCategoryChart,
        expenseCount: expenses.length,
        incomeCount: incomes.length,
    };
};

const getMonthlySummary = async (req, res) => {
    try {
        const userId = req.user.id;
        if (!userId) {
            return res.status(401).json({ error: 'User ID not found in token' });
        }

        const { month } = req.query;

        // Validate the 'month' query parameter.
        if (!month || !moment(month, 'YYYY-MM', true).isValid()) {
            return res.status(400).json({ error: 'Invalid or missing month parameter (format: YYYY-MM)' });
        }

        const targetMonth = moment.utc(month);
        const startOfMonth = targetMonth.startOf('month').toDate();
        const endOfMonth = targetMonth.endOf('month').toDate();

        // Use the helper function to get the summary data and send it.
        const summary = await fetchSummaryData(userId, startOfMonth, endOfMonth);
        res.status(200).json(summary);
    } catch (error) {
        console.error('Erreur dans getMonthlySummary:', error);
        res.status(500).json({ error: error.message });
    }
};

const getCustomSummary = async (req, res) => {
    try {
        const userId = req.user.id;
        if (!userId) {
            return res.status(401).json({ error: 'User ID not found in token' });
        }

        const { start, end } = req.query;

        // Validate the 'start' and 'end' query parameters.
        if (!start || !end) {
            return res.status(400).json({ error: 'Start and end dates are required' });
        }

        const startDate = moment.utc(start).toDate();
        const endDate = moment.utc(end).toDate();

        // Use the helper function to get the summary data and send it.
        const summary = await fetchSummaryData(userId, startDate, endDate);
        res.status(200).json(summary);
    } catch (error) {
        console.error('Erreur dans getCustomSummary:', error);
        res.status(500).json({ error: error.message });
    }
};

const getBudgetAlerts = async (req, res) => {
    try {
        const userId = req.user.id;
        if (!userId) {
            return res.status(401).json({ error: 'Access token required' });
        }

        // Define the current month's period.
        const currentMonthStart = moment.utc().startOf('month').toDate();
        const currentMonthEnd = moment.utc().endOf('month').toDate();

        // Use the helper function to get the data directly.
        const summary = await fetchSummaryData(userId, currentMonthStart, currentMonthEnd);

        // Check for missing data to prevent 'Cannot read properties of undefined' errors.
        if (!summary || !summary.totals || typeof summary.totals.income === 'undefined') {
            return res.status(404).json({ error: "No financial data found for the current month." });
        }

        const alertThreshold = 0.9; // 90%
        const alert = summary.totals.income > 0 &&
            (summary.totals.expenses / summary.totals.income) > alertThreshold;

        // Send the final alert and summary response.
        res.status(200).json({
            alert,
            message: alert ?
                `Attention : Vos dépenses représentent ${((summary.totals.expenses / summary.totals.income) * 100).toFixed(2)}% de vos revenus ce mois-ci.` :
                'Vos finances sont dans des limites acceptables.',
            details: summary,
        });
    } catch (error) {
        console.error('Erreur dans getBudgetAlerts:', error);
        res.status(500).json({ error: error.message });
    }
};

const getDailyAverages = async (req, res) => {
    try {
        const userId = req.user.id;
        if (!userId) {
            return res.status(401).json({ error: 'Access token required' });
        }

        const { start, end } = req.query;
        let startDate, endDate;

        if (start && end) {
            startDate = moment.utc(start).startOf('day');
            endDate = moment.utc(end).endOf('day');

            if (!startDate.isValid() || !endDate.isValid() || startDate.isAfter(endDate)) {
                return res.status(400).json({ error: 'Invalid start or end dates' });
            }
        } else {
            startDate = moment.utc('2010-01-01');
            endDate = moment.utc();
        }

        // Fetch all expenses and incomes for the given period.
        const expenses = await Expense.findAll({
            where: {
                userId,
                date: {
                    [Op.between]: [startDate.toDate(), endDate.toDate()],
                },
            },
        });

        const incomes = await Income.findAll({
            where: {
                userId,
                date: {
                    [Op.between]: [startDate.toDate(), endDate.toDate()],
                },
            },
        });

        // Initialize a map to store daily totals for days with transactions.
        const dailyData = new Map();

        // Use UTC for formatting to match the database's storage
        expenses.forEach(expense => {
            const dateStr = moment.utc(expense.date).format('YYYY-MM-DD');
            if (!dailyData.has(dateStr)) {
                dailyData.set(dateStr, { expenses: 0, incomes: 0 });
            }
            dailyData.get(dateStr).expenses += parseFloat(expense.amount);
        });

        incomes.forEach(income => {
            const dateStr = moment.utc(income.date).format('YYYY-MM-DD');
            if (!dailyData.has(dateStr)) {
                dailyData.set(dateStr, { expenses: 0, incomes: 0 });
            }
            dailyData.get(dateStr).incomes += parseFloat(income.amount);
        });

        // Format the final results as an array of objects.
        const formattedData = Array.from(dailyData).map(([date, totals]) => ({
            date,
            expenses: totals.expenses,
            incomes: totals.incomes,
            balance: totals.incomes - totals.expenses,
        }));

        // Sort the data by date in ascending order.
        formattedData.sort((a, b) => new Date(a.date) - new Date(b.date));

        res.status(200).json(formattedData);

    } catch (error) {
        console.error('Erreur dans getDailyAverages:', error);
        res.status(500).json({ error: error.message });
    }
};

// Nouvelle fonction pour regrouper les revenus par source
const getIncomesBySource = async (req, res) => {
    try {
        const userId = req.user.id;
        if (!userId) {
            return res.status(401).json({ error: 'Access token required' });
        }

        const incomesBySource = await Income.findAll({
            attributes: [
                'source',
                [fn('SUM', col('amount')), 'totalAmount']
            ],
            where: { userId },
            group: ['source'],
            order: [[fn('SUM', col('amount')), 'DESC']]
        });

        res.status(200).json(incomesBySource);
    } catch (error) {
        console.error('Erreur dans getIncomesBySource:', error);
        res.status(500).json({ error: error.message });
    }
};

// Fonction pour regrouper les dépenses par catégorie
// Fonction pour regrouper les dépenses par catégorie
const getExpensesByCategory = async (req, res) => {
    try {
      const userId = req.user.id;
      if (!userId) {
        return res.status(401).json({ error: 'Access token required' });
      }
  
      const expensesByCategory = await Expense.findAll({
        attributes: [
          [fn('SUM', col('amount')), 'totalAmount'],
          [fn('COUNT', col('Expense.id')), 'expenseCount'] // ✅ nombre de dépenses
        ],
        where: { userId },
        include: [{
          model: Category,
          as: 'category',
          attributes: ['id', 'name']
        }],
        group: ['category.id', 'category.name'],
        order: [[fn('SUM', col('amount')), 'DESC']]
      });
  
      // Format du résultat
      const formattedResult = expensesByCategory.map(item => ({
        category: item.category.name,
        totalAmount: item.getDataValue('totalAmount'),
        expenseCount: item.getDataValue('expenseCount') // ✅ ajouté ici
      }));
  
      res.status(200).json(formattedResult);
    } catch (error) {
      console.error('Erreur dans getExpensesByCategory:', error);
      res.status(500).json({ error: error.message });
    }
  };
  


module.exports = {
    getMonthlySummary,
    getCustomSummary,
    getBudgetAlerts,
    getDailyAverages,
    getIncomesBySource, // Ajout de la nouvelle fonction pour l'export
    getExpensesByCategory,
};
