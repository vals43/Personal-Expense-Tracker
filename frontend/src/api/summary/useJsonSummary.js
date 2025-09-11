import { useEffect, useState } from "react";
import moment from 'moment';
import { getSummary, getDailySummary, getIncomesBySource, getExpensesBySource, getLastTransaction, getRecurringExpenseOfMonth } from "./summaryService";

export function useJsonSummary(month) {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const summaryData = await getSummary(month);
        setData(summaryData);
      } catch (err) {
        console.error("Erreur lors du fetch du résumé mensuel:", err);
        setData(null); // Reset data on error
      }
    };
    fetchSummary();
  }, [month]);

  return data;
}

export function useJsonLastTransaction() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLastTransaction = async () => {
      try {
        setLoading(true);
        const transactions = await getLastTransaction();
        setData(transactions);
        setError(null);
      } catch (err) {
        console.error("Erreur lors du fetch des dernières transactions:", err);
        setError(err.message);
        setData([]);
      } finally {
        setLoading(false);
      }
    };
    fetchLastTransaction();
  }, []);

  return { data, loading, error };
}

export function useJsonDailySummary(startDate, endDate) {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchDailySummary = async () => {
      try {
        const dailySummaryData = await getDailySummary(startDate, endDate);
        setData(dailySummaryData);
      } catch (err) {
        console.error("Erreur lors du fetch du résumé journalier:", err);
        setData(null); // Reset data on error
      }
    };

    if (startDate && endDate) {
      fetchDailySummary();
    } else {
      setData(null); // Reset data if dates are missing
    }
  }, [startDate, endDate]);

  return data;
}

export function useJsonIncomesBySource() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchIncomesBySource = async () => {
      try {
        setLoading(true);
        const incomesData = await getIncomesBySource();
        setData(incomesData);
        setError(null);
      } catch (err) {
        console.error("Erreur lors du fetch des revenus par source:", err);
        setError(err.message);
        setData(null);
      } finally {
        setLoading(false);
      }
    };
    fetchIncomesBySource();
  }, []);

  return { data, loading, error };
}
export function useJsonExpensesBySource() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExpensesBySource = async () => {
      try {
        setLoading(true);
        const incomesData = await getExpensesBySource();
        setData(incomesData);
        setError(null);
      } catch (err) {
        console.error("Erreur lors du fetch des expenses par categories:", err);
        setError(err.message);
        setData(null);
      } finally {
        setLoading(false);
      }
    };
    fetchExpensesBySource();
  }, []);

  return { data, loading, error };
}


export const getYearlySummary = async () => {
  try {
    const currentYear = moment().utc().year();
    const monthlySummariesPromises = [];
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    for (let i = 0; i < 12; i++) {
      const targetMonth = moment().utc().year(currentYear).month(i).format('YYYY-MM');
      const monthNumber = i + 1;

      const summaryPromise = Promise.all([
        getSummary(targetMonth),
        getRecurringExpenseOfMonth(monthNumber, currentYear)
      ])
        .then(([summary, recurringExpenses]) => {
          // Calculer le total des dépenses récurrentes pour le mois
          const totalRecurringExpenses = recurringExpenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
          
          // Ajouter les dépenses récurrentes aux dépenses totales
          const totalExpenses = (summary.expenses || 0) + totalRecurringExpenses;

          // Mettre à jour les totaux globaux du résumé initial
          const newTotalsExpenses = (summary.totals.expenses || 0) + totalRecurringExpenses;
          const newTotalsBalance = (summary.totals.income || 0) - newTotalsExpenses;

          return {
            month: monthNames[i],
            ...summary,
            expenses: totalExpenses, // Mettre à jour la propriété 'expenses'
            balance: (summary.income || 0) - totalExpenses, // Mettre à jour la propriété 'balance'
            totals: {
              ...summary.totals,
              expenses: newTotalsExpenses, // Mettre à jour les dépenses dans le sous-objet 'totals'
              balance: newTotalsBalance, // Mettre à jour le solde dans le sous-objet 'totals'
            },
          };
        })
        .catch(error => {
          console.error(`Erreur lors de la récupération pour le mois ${targetMonth}:`, error);
          return null;
        });

      monthlySummariesPromises.push(summaryPromise);
    }

    const allSummaries = await Promise.all(monthlySummariesPromises);

    const yearlyData = allSummaries.filter(summary => summary !== null);

    // Retourner les données mensuelles qui incluent maintenant les dépenses récurrentes
    return yearlyData;
  } catch (error) {
    console.error('Erreur dans getYearlySummary:', error);
    throw new Error('Failed to retrieve yearly summary');
  }
};
