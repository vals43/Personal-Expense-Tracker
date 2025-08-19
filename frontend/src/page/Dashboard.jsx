import React from 'react';
import DashboardChart from '../components/Dashboard/DashboardSidebar';
import BudgetCard from '../components/Dashboard/BudgetCard';
import ExpensesSection from '../components/Dashboard/ExpensesSection';

function Dashboard() {
  const budgets = [
    { name: 'Food', total: 500, spent: 300, remaining: 200, date: '12 Nov - 18 Nov' },
    { name: 'Shopping', total: 250, spent: 150, remaining: 100, date: '15 Nov - 22 Nov' },
    { name: 'Transport', total: 100, spent: 80, remaining: 20, date: '10 Nov - 17 Nov' },
  ];

  return (
    <div className="flex space-y-8 p-8">
      <div className="sticky top-0">
        <DashboardChart />
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white"></h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {budgets.map((budget, index) => (
            <BudgetCard key={index} {...budget} />
          ))}
        </div>
        <ExpensesSection/>
      </div>
    </div>
  );
}

export default Dashboard;