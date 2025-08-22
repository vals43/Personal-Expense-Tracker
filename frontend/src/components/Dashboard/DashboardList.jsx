import React from 'react';

const ExpenseTable = ({ expenses }) => {
  if (!expenses || expenses.length === 0) {
    return <p>No expenses to display.</p>;
  }

  return (
    <div className="w-full max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Category
              </th>
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Description
              </th>
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Date
              </th>
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Amount
              </th>
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
            {expenses.map((expense) => (
              <tr
                key={expense.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
              >
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <span className="font-medium text-gray-900 dark:text-white">
                      {expense.category_id}
                    </span>
                  </div>
                </td>
                <td className="py-4 px-6 text-gray-600 dark:text-gray-300">
                  {expense.description}
                </td>
                <td className="py-4 px-6 text-gray-600 dark:text-gray-300">
                  {expense.date.split('T')[0]}
                </td>
                <td className="py-4 px-6 font-semibold text-gray-900 dark:text-white">
                  {expense.amount} $
                </td>
                <td className="py-4 px-6">
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExpenseTable;