import React from 'react';
import { Eye } from 'lucide-react';

export function ExpenseListOneTime({ expenses }) {
  if (!expenses || expenses.length === 0) {
    return (
      <div className="text-center py-4 text-gray-500">
        Aucune dépense à afficher pour le moment.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg shadow-md border border-gray-200">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-100 text-gray-700 border-b border-gray-200">
          <tr>
            <th className="px-4 py-3 text-left  font-bold uppercase tracking-wider">ID</th>
            <th className="px-4 py-3 text-left text-sm font-semibold uppercase tracking-wider">Date</th>
            <th className="px-4 py-3 text-left text-sm font-semibold uppercase tracking-wider">Catégorie ID</th>
            <th className="px-4 py-3 text-left text-sm font-semibold uppercase tracking-wider">ID Utilisateur</th>
            <th className="px-4 py-3 text-left text-sm font-semibold uppercase tracking-wider">Montant</th>
            <th className="px-4 py-3 text-left text-sm font-semibold uppercase tracking-wider">Description</th>
            <th className="px-4 py-3 text-left text-sm font-semibold uppercase tracking-wider">Reçu</th>
            <th className="px-4 py-3 text-center text-sm font-semibold uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense, idx) => (
            <tr key={expense.id || idx} className="border-t border-gray-200 hover:bg-gray-50 transition-colors duration-150">
              <td className="px-4 py-3 font-bold   text-gray-500">{expense.id}</td>
              <td className="px-4 py-3 text-sm text-gray-500">{expense.date}</td>
              <td className="px-4 py-3 text-sm font-bold text-gray-800">{expense.category_id}</td>
              <td className="px-4 py-3 text-sm text-gray-800">{expense.user_id}</td>
              <td className="px-4 py-3 text-red-700 font-bold">{expense.amount}</td>
              <td className="px-4 py-3 text-sm text-gray-800 font-bold">{expense.description || "N/A"}</td>
              <td className="px-4 py-3 text-sm text-gray-800">{expense.receipt_id ? "Oui" : "Non"}</td>
              <td className="px-4 py-3 flex justify-center items-center gap-2">
                {expense.receipt_id && (
                  <button
                    className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition-all duration-150"
                    title="Voir le reçu"
                  // onClick={() => handleViewReceipt(expense.receipt_id)} // Add a handler for viewing receipt
                  >
                    <Eye size={16} />
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
