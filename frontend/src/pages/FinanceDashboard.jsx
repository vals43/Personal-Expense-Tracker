import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CashflowCard } from '../components/dashboard/CashflowCard';
import { UserProfileCard } from '../components/dashboard/UserProfileCard';
import { StatisticsCard } from '../components/dashboard/StatisticsCard';
import StatsCard from '../components/card/StatsCard';
import { LineChart } from '../components/charts/LineChart';
import { TransactionCard } from '../components/card/TransactionCard';
import { Calendar, CreditCardIcon } from 'lucide-react';
import { ActionButtonsCard } from '../components/dashboard/ActionButtonsCard';
import { useJsonUser } from '../api/user/useJsonUser.js';
import { getYearlySummary, useJsonDailySummary, useJsonLastTransaction, useJsonSummary } from '../api/summary/useJsonSummary.js';
import { getJsonExpenses } from '../api/expenses/expenseContext.jsx';
import { getJsonIncomes } from '../api/incomes/getJsonIncomes.jsx';
import BudgetAlertsDashboard from '../components/dashboard/budget-alerts-dashboard.jsx';



const formatDailyIncomes = (dailyData) => {
  if (!dailyData || !Array.isArray(dailyData)) {
    return [];
  }

  const filteredData = dailyData.filter(day => day.incomes !== 0);

  const formattedData = filteredData.map(day => ({
    name: day.date,
    value: day.incomes,
  }));

  return formattedData;
};

const formatDailyExpenses = (dailyData) => {
  if (!dailyData || !Array.isArray(dailyData)) {
    return [];
  }

  const filteredData = dailyData.filter(day => day.expenses !== 0);

  const formattedData = filteredData.map(day => ({
    name: day.date,
    value: day.expenses,
  }));

  return formattedData;
};

export function FinanceDashboard() {
  const user = useJsonUser();
  const summary = useJsonSummary();
  const expenses = getJsonExpenses();
  const transactions = useJsonLastTransaction().data
  const incomes = getJsonIncomes();
  const [monthlyData, setMonthlyData] = useState(null);

  const year = new Date().toISOString().split('-')[0];
  const mois = new Date().toISOString().split('-')[1];

  const dailyIncome = useJsonDailySummary(`${year}-${mois}-01`, `${year}-${Number(mois) + 1}-01`);
  const dailyExpense = useJsonDailySummary(`${year}-${mois}-01`, `${year}-${Number(mois) + 1}-01`);

  useEffect(() => {
    async function fetchMonthlyData() {
      try {
        const data = await getYearlySummary();
        setMonthlyData(data || 'loading');
      } catch (error) {
        console.error('Failed to fetch monthly data:', error);
        setMonthlyData('error');
      }
    }
    fetchMonthlyData();
  }, []); // Empty dependency array to fetch once on mount; add dependencies if dynamic updates are needed

  if (!user || !summary || !expenses || !incomes || !dailyIncome || !dailyExpense || !transactions || !monthlyData) {
    return (
      <div className="bg-light-card dark:bg-dark-card p-6 rounded-xl shadow-sm text-center text-light-text dark:text-dark-text">
        <p className="text-gray-500 dark:text-gray-400">
          {monthlyData === 'error' ? 'Erreur lors du chargement des données' : 'Chargement des données...'}
        </p>
      </div>
    );
  }

  if (monthlyData === 'loading' || monthlyData === 'error') {
    return (
      <div className="bg-light-card dark:bg-dark-card p-6 rounded-xl shadow-sm text-center text-light-text dark:text-dark-text">
        <p className="text-gray-500 dark:text-gray-400">
          {monthlyData === 'error' ? 'Erreur lors du chargement des données mensuelles' : 'Chargement des données mensuelles...'}
        </p>
      </div>
    );
  }
  console.log(transactions);
  

  let sumExpenses = summary.totals.expenses;
  let sumIncomes = summary.totals.income;
  let balanceMonthly = String(summary.totals.balance); // monthly

  const totalIncome = incomes.reduce((total, income) => total + Number(income.amount), 0);
  const totalExpenses = expenses.reduce((total, expense) => total + Number(expense.amount), 0);
  let balance = totalIncome - totalExpenses;

  const dataIncome = formatDailyIncomes(dailyIncome);
  const dataExpenses = formatDailyExpenses(dailyExpense);

  return (
    <div className="w-full px-2 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-1">Tableau de Bord Financier</h1>
          <p className="text-gray-500">Suivi de vos finances mensuelles</p>
        </div>
        <div className="border border-red-500 flex items-center gap-2">
          <Calendar className="h-5 w-5 text-gray-400" />
          <span className="text-base text-gray-600">
            {new Date().toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
          </span>
        </div>
      </div>

      {/* Résumé mensuel et profil utilisateur */}
      <div className="flex flex-col md:flex-row gap-6 mb-8 w-full">
        {/* Monthly Overview prend plus de place (2/3) */}
        <div className="w-full md:w-2/3 h-full">
          <CashflowCard monthlyData={monthlyData} />
        </div>
        {/* Carte utilisateur sans background noir */}
        <div className="w-full md:w-1/3 flex flex-col items-center justify-stretch h-full">
          <div className="flex flex-col items-center justify-between h-full w-full p-6 border border-red-600 rounded-xl">
            <UserProfileCard name={user.firstName} balance={`${balance || 0}`} />
            <div className="mt-4 w-full">
              <ActionButtonsCard />
            </div>
          </div>
        </div>
      </div>

      {/* Alertes budget */}
      <div className="mb-8">
        <BudgetAlertsDashboard />
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <StatsCard
          title="Dépenses"
          className="bg-light-card dark:bg-dark-card"
          value={sumExpenses}
          trend={2.1}
          chart={
            <LineChart
              data={dataExpenses}
              dataKey="value"
              lineColor="#EF4444"
              height={80}
              showAxis={false}
              showDots={false}
            />
          }
        />
        <StatsCard
          title="Revenus"
          className="bg-light-card dark:bg-dark-card"
          value={sumIncomes}
          trend={0}
          chart={
            <LineChart
              data={dataIncome}
              dataKey="value"
              lineColor="#10B981"
              height={80}
              showAxis={false}
              showDots={false}
            />
          }
        />
      </div>

      {/* Transactions récentes */}
      <div>
        <TransactionCard
          className="bg-light-card dark:bg-dark-card text-light-text dark:text-dark-text"
          transactions={transactions}
        />
      </div>
    </div>
  );
}