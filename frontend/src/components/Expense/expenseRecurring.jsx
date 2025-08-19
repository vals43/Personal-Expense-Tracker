import React, { useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import { ExpenseRow } from './ExpenseRow';

export function ExpenseListRecurring({ expenses, onDelete, onEdit, onViewReceipt }) {
  const [isDarkMode, setIsDarkMode] = useState(true); // Your theme variable

  if (!expenses || expenses.length === 0) {
    return (
      <div className={`text-center py-6 text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} font-medium`}>
        Aucune dépense à afficher pour le moment.
      </div>
    );
  }

  return (
    <div className={`overflow-x-auto rounded-xl shadow-lg border
      ${isDarkMode ? 'border-gray-700 bg-gray-900 text-gray-100' : 'border-gray-200 bg-white text-gray-900'}`}>

      {/* Theme toggle button */}
      <div className="flex justify-end p-4">
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className={`p-2 rounded-full transition-colors duration-200
            ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700 text-gray-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-800'}`}
          title={isDarkMode ? "Passer en mode clair" : "Passer en mode sombre"}
        >
          {isDarkMode ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-gray-600" />}
        </button>
      </div>

      <table className={`min-w-full ${isDarkMode ? 'divide-y divide-gray-700' : 'divide-y divide-gray-200'}`}>
        <thead className={`${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
          <tr>
            <th className={`px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider ${isDarkMode ? 'text-gray-400' : 'text-gray-700'}`}>ID</th>
            <th className={`px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider ${isDarkMode ? 'text-gray-400' : 'text-gray-700'}`}>Date</th>
            <th className={`px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider ${isDarkMode ? 'text-gray-400' : 'text-gray-700'}`}>Type</th>
            <th className={`px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider ${isDarkMode ? 'text-gray-400' : 'text-gray-700'}`}>Catégorie ID</th>
            <th className={`px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider ${isDarkMode ? 'text-gray-400' : 'text-gray-700'}`}>Montant</th>
            <th className={`px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider ${isDarkMode ? 'text-gray-400' : 'text-gray-700'}`}>Description</th>
            <th className={`px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider ${isDarkMode ? 'text-gray-400' : 'text-gray-700'}`}>Période Début</th>
            <th className={`px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider ${isDarkMode ? 'text-gray-400' : 'text-gray-700'}`}>Période Fin</th>
            <th className={`px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider ${isDarkMode ? 'text-gray-400' : 'text-gray-700'}`}>Reçu</th>
            <th className={`px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider ${isDarkMode ? 'text-gray-400' : 'text-gray-700'}`}>Actions</th>
          </tr>
        </thead>
        <tbody className={`${isDarkMode ? 'divide-y divide-gray-800' : 'divide-y divide-gray-200'}`}>
          {/* Map over ExpenseRow, passing necessary props */}
          {expenses.map((expense) => (
            <ExpenseRow
              key={expense.id} // Key is still vital here!
              expense={expense}
              onDelete={onDelete}
              onEdit={onEdit}
              onViewReceipt={onViewReceipt}
              isDarkMode={isDarkMode} // Pass the dark mode state down
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}