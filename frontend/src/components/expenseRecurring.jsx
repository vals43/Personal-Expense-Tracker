
import React, { useState } from 'react';
import { Eye, EyeClosed, PencilIcon, Trash } from 'lucide-react';
import { Sun, Moon } from 'lucide-react';
export function ExpenseListRecurring({ expenses, onDelete, onEdit, onViewReceipt }) {
  const [isDarkMode, setIsDarkMode] = useState(true);
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

      {/* Bouton pour changer de thème (optionnel, peut être déplacé plus haut dans l'arborescence) */}
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
          {expenses.map((expense) => {
            const [isHoveringReceipt, setIsHoveringReceipt] = useState(false);

            return (
              <tr key={expense.id} className={`${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-50'} transition-colors duration-200`}>
                <td className={`px-4 py-3 text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{expense.id}</td>
                <td className={`px-4 py-3 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-800'}`}>{expense.date}</td>
                {expense.type === "Récurrente" ?
                  <td className={`px-4 py-3 text-sm font-bold ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>{expense.type}</td>
                  :
                  <td className={`px-4 py-3 text-sm font-bold ${isDarkMode ? 'text-gray-300' : 'text-gray-800'}`}>{
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(expense.status)}`}>
                      {expense.type || 'Unique'}
                    </span>
                  }</td>
                }
                <td className={`px-4 py-3 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-800'}`}>{expense.category_id}</td>
                <td className={`px-4 py-3 text-lg font-bold ${isDarkMode ? 'text-red-400' : 'text-red-700'}`}>{expense.amount}€</td>
                <td className={`px-4 py-3 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-800'}`}>{expense.description || "N/A"}</td>
                <td className={`px-4 py-3 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-800'}`}>{expense.start_date || "N/A"}</td>
                <td className={`px-4 py-3 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-800'}`}>{expense.end_date || "N/A"}</td>
                <td className={`px-4 py-3 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-800'}`}>{expense.receipt_id ? "Oui" : "Non"}</td>
                <td className="px-4 py-3 flex justify-center items-center gap-2">
                  <button
                    onClick={() => onEdit && onEdit(expense)} // Passe la dépense complète pour l'édition
                    className={`p-2 text-white rounded-full shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition-all duration-150
                      ${isDarkMode ? 'bg-blue-500 focus:ring-offset-gray-900' : 'bg-blue-500 focus:ring-offset-white'}`
                    }
                    title="Modifier la dépense"
                  >
                    <PencilIcon size={16} />
                  </button>
                  {expense.receipt_id && (
                    <button
                      onClick={() => onViewReceipt && onViewReceipt(expense.receipt_id)}
                      className={`p-2 text-white rounded-full shadow-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 transition-all duration-150
                        ${isDarkMode ? 'bg-yellow-500 focus:ring-offset-gray-900' : 'bg-yellow-500 focus:ring-offset-white'}`
                      }
                      title="Voir le reçu"
                      onMouseEnter={() => setIsHoveringReceipt(true)}
                      onMouseLeave={() => setIsHoveringReceipt(false)}
                    >
                      {isHoveringReceipt ? <Eye size={16} /> : <EyeClosed size={16} />}
                    </button>
                  )}
                  <button
                    onClick={() => onDelete && onDelete(expense.id)} // Passe l'ID pour la suppression
                    className={`p-2 text-white rounded-full shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 transition-all duration-150
                      ${isDarkMode ? 'bg-red-500 focus:ring-offset-gray-900' : 'bg-red-500 focus:ring-offset-white'}`
                    }
                    title="Supprimer la dépense"
                  >
                    <Trash size={16} />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}