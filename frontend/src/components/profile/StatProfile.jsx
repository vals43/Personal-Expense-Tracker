
import { getJsonIncomes } from './../../api/incomes/getJsonIncomes';
import { getJsonExpenses } from './../../api/expenses/expenseContext';
import { useCategories } from '../../api/category/categoryContext';
import { CreditCard, Tags, Wallet } from 'lucide-react';


export default function StatProfile() {
  const incomes = getJsonIncomes();
  const expenses = getJsonExpenses();
  const { categories } = useCategories();



  if (!incomes || !expenses || !categories) {
    return (
      <div className="bg-light-card dark:bg-dark-card p-6 rounded-xl shadow-sm text-center text-light-text dark:text-dark-text">
        <p className="text-gray-500 dark:text-gray-400">Chargement des stats ...</p>
      </div>
    );
  }

  function getSum(data) {
    if (!Array.isArray(data) || data.length === 0) {
      return 0;
    }
  
    return data.reduce((sum, item) => {
      return sum + parseFloat(item.amount);
    }, 0);
  }
  


  return (
    <div className="bg-white border-l-4 border-b-4 dark:border-dark-border dark:bg-dark-card p-6 rounded-xl shadow-sm mt-6">
      <h3 className="text-lg font-semibold mb-6 text-gray-800 dark:text-gray-100">
        📊 Quick Stats
      </h3>

      {/* Liste stylisée */}
      <ul className="space-y-4 text-sm sm:text-base">
        <li className="flex items-center justify-between border-b pb-3 dark:border-gray-700">
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
            <CreditCard className="w-5 h-5 text-red-500" />
            <span>Total Expenses</span>
          </div>
          <div className="text-right">
            <p className="font-semibold text-red-600">
              ${getSum(expenses).toFixed(2)}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {expenses.length} transactions
            </p>
          </div>
        </li>

        <li className="flex items-center justify-between border-b pb-3 dark:border-gray-700">
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
            <Wallet className="w-5 h-5 text-green-500" />
            <span>Total Incomes</span>
          </div>
          <div className="text-right">
            <p className="font-semibold text-green-600">
              ${getSum(incomes).toFixed(2)}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {incomes.length} transactions
            </p>
          </div>
        </li>

        <li className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
            <Tags className="w-5 h-5 text-blue-500" />
            <span>Total Categories</span>
          </div>
          <div className="text-right">
            <p className="font-semibold text-blue-600">
              {categories.length}
            </p>
          </div>
        </li>
      </ul>
    </div>
  )
}