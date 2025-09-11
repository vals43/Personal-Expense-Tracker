import apiClient from "../auth/apiClient";

export async function getSummary(month) {
  const year = new Date().toISOString().split('-')[0];
  const mois = new Date().toISOString().split('-')[1];

  try {
    const response = await apiClient.get(`api/summary/monthly?month=${month || `${year}-${mois}`}`);

    return response.data;
  } catch (error) {
    console.error(
      "Error in getSummary:",
      error.response?.data || error.message
    );
    throw error;
  }
}

const getRecentTransactions = async (req, res) => {
  try {
      const userId = req.user.id;
      if (!userId) {
          return res.status(401).json({ error: 'Access token required' });
      }

      // Fetch expenses and incomes, ordered by date descending
      const expenses = await Expense.findAll({
          where: { userId },
          order: [['date', 'DESC']],
          limit: 5,
          include: [{ model: Category, as: 'category', attributes: ['name'] }]
      });

      const incomes = await Income.findAll({
          where: { userId },
          order: [['date', 'DESC']],
          limit: 5
      });

      // Map and format transactions to a consistent structure
      const formattedExpenses = expenses.map(t => ({
          id: t.id,
          type: 'expense',
          amount: parseFloat(t.amount),
          date: t.date,
          description: t.description,
          category: t.category ? t.category.name : 'Uncategorized',
          currency: t.currency
      }));

      const formattedIncomes = incomes.map(t => ({
          id: t.id,
          type: 'income',
          amount: parseFloat(t.amount),
          date: t.date,
          description: t.description,
          source: t.source,
          currency: t.currency
      }));

      // Combine, sort, and get the last 5
      const allTransactions = [...formattedExpenses, ...formattedIncomes];
      allTransactions.sort((a, b) => moment(b.date).valueOf() - moment(a.date).valueOf());
      
      const recentTransactions = allTransactions.slice(0, 5);

      res.status(200).json(recentTransactions);

  } catch (error) {
      console.error('Erreur dans getRecentTransactions:', error);
      res.status(500).json({ error: error.message });
  }
};


// New function to fetch a daily summary for a given period.
export async function getDailySummary(startDate, endDate) {
  // Use the current date as a default if none is provided.
  const today = new Date().toISOString().split('T')[0];
  const start = startDate || today;
  const end = endDate || today;

  try {
    const response = await apiClient.get(`api/summary/daily?start=${start}&end=${end}`);

    return response.data;
  } catch (error) {
    console.error(
      "Error in getDailySummary:",
      error.response?.data || error.message
    );
    throw error;
  }
}

// New function to get the sum of incomes grouped by source.
export async function getIncomesBySource() {
  try {
    const response = await apiClient.get(`api/summary/incomeCategory`);

    return response.data;
  } catch (error) {
    console.error(
      "Error in getIncomesBySource:",
      error.response?.data || error.message
    );
    throw error;
  }
}
export async function getLastTransaction() {
  try {
    const response = await apiClient.get(`api/summary/transaction`);

    return response.data;
  } catch (error) {
    console.error(
      "Error in getLastTransaction:",
      error.response?.data || error.message
    );
    throw error;
  }
}

export async function getExpensesBySource() {
  try {
    const response = await apiClient.get(`api/summary/expensesCategory`);

    return response.data;
  } catch (error) {
    console.error(
      "Error in getExpensesBySource:",
      error.response?.data || error.message
    );
    throw error;
  }
}
