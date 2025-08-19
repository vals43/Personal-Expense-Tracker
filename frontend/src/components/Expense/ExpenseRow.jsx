// frontend/src/components/ExpenseRow.jsx
import React, { useState } from 'react';
import { Eye, EyeClosed, PencilIcon, Trash } from 'lucide-react';

export function ExpenseRow({ expense, onDelete, onEdit, onViewReceipt, isDarkMode }) {
  // This useState is now safely inside a component, not a loop!
  const [isHoveringReceipt, setIsHoveringReceipt] = useState(false);

  return (
    <tr key={expense.id} className={`${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-50'} transition-colors duration-200`}>
      <td className={`px-4 py-3 text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{expense.id}</td>
      <td className={`px-4 py-3 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-800'}`}>{expense.date}</td>
      {expense.type === "Récurrente" ?
        <td className={`px-4 py-3 text-sm font-bold ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>{expense.type}</td>
        :
        <td className={`px-4 py-3 text-sm font-bold ${isDarkMode ? 'text-gray-300' : 'text-gray-800'}`}>{expense.type || "Unique"}</td>
      }
      <td className={`px-4 py-3 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-800'}`}>{expense.category_id}</td>
      <td className={`px-4 py-3 text-lg font-bold ${isDarkMode ? 'text-red-400' : 'text-red-700'}`}>{expense.amount}€</td>
      <td className={`px-4 py-3 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-800'}`}>{expense.description || "N/A"}</td>
      <td className={`px-4 py-3 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-800'}`}>{expense.start_date || "N/A"}</td>
      <td className={`px-4 py-3 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-800'}`}>{expense.end_date || "N/A"}</td>
      <td className={`px-4 py-3 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-800'}`}>{expense.receipt_id ? "Oui" : "Non"}</td>
      <td className="px-4 py-3 flex justify-center items-center gap-2">
        <button
          onClick={() => onEdit && onEdit(expense)}
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
          onClick={() => onDelete && onDelete(expense.id)}
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
}