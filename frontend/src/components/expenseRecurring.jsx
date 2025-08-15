import React from 'react';
import { Eye, EyeClosed, PencilIcon, Trash } from 'lucide-react';

let hover = true

export function ExpenseListRecurring({ expenses }) {
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
            <th className="px-4 py-3 text-left text-sm font-semibold uppercase tracking-wider">type</th>
            <th className="px-4 py-3 text-left text-sm font-semibold uppercase tracking-wider">Catégorie ID</th>
            <th className="px-4 py-3 text-left text-sm font-semibold uppercase tracking-wider">Montant</th>
            <th className="px-4 py-3 text-left text-sm font-semibold uppercase tracking-wider">Description</th>
            <th className="px-4 py-3 text-left text-sm font-semibold uppercase tracking-wider">Période (Début)</th>
            <th className="px-4 py-3 text-left text-sm font-semibold uppercase tracking-wider">Période (Fin)</th>
            <th className="px-4 py-3 text-left text-sm font-semibold uppercase tracking-wider">Reçu</th>
            <th className="px-4 py-3 text-center text-sm font-semibold uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.id} className="border-t border-gray-200 hover:bg-gray-50 transition-colors duration-150">
              <td className="px-4 py-3 font-bold   text-gray-500">{expense.id}</td>
              <td className="px-4 py-3 text-sm text-gray-800">{expense.date}</td>
              {
                expense.type == "Récurrente" ? 
              <td className="px-4 py-3 text-sm font-bold text-blue-800">{expense.type }</td>
              :
              <td className="px-4 py-3 text-sm font-bold text-gray-800">{expense.type }</td>
              }
              <td className="px-4 py-3 text-sm text-gray-800">{expense.category_id}</td>
              <td className="px-4 py-3 text-red-700 font-bold">{expense.amount}</td>
              <td className="px-4 py-3 text-sm text-gray-800 font-bold">{expense.description || "N/A"}</td>
              <td className="px-4 py-3 text-sm text-gray-800 font-bold">{expense.start_date || "N/A"}</td>
              <td className="px-4 py-3 text-sm text-gray-800 font-bold">{expense.end_date || "N/A"}</td>
              <td className="px-4 py-3 text-sm text-gray-800">{expense.receipt_id ? "Oui" : "Non"}</td>
              <td className="px-4 py-3 flex justify-start items-center gap-1 ">
              <button
                    className="p-2 bg-blue-500 cursor-pointer text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition-all duration-150"
                    title="Edit the expense"
                  >
                    <PencilIcon size={16} />
                  </button>
                {expense.receipt_id && (
                  <button
                    className="p-2 bg-yellow-500 cursor-pointer text-white rounded-full hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 transition-all duration-150"
                    title="See the receipt"
                  >
                    
                    { hover ? <Eye size={16} /> : <EyeClosed size={16} />}
                  </button>
                )}
                  <button
                    className="p-2 bg-red-500 cursor-pointer text-white rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 transition-all duration-150"
                    title="Delete the expense"
                  >
                    <Trash size={16} />
                  </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
