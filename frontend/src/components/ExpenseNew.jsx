import React, { useState } from 'react';

export function AddExpenseForm({ onAddExpense }) {
  const [expenseType, setExpenseType] = useState('one-time');
  const [categoryId, setCategoryId] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [receiptId, setReceiptId] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newExpense = {
      category_id: categoryId,
      amount: parseFloat(amount),
      date,
      description,
      receipt_id: receiptId || null,
      type: expenseType,
      start_date: expenseType === 'recurring' ? startDate : null,
      end_date: expenseType === 'recurring' ? endDate : null,
    };
    if (onAddExpense) onAddExpense(newExpense);

    // Reset form
    setCategoryId('');
    setAmount('');
    setDate('');
    setDescription('');
    setReceiptId('');
    setStartDate('');
    setEndDate('');
    setExpenseType('one-time');
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-gray-900 rounded-lg shadow-xl border border-gray-700">
      <h2 className="text-3xl font-bold text-white mb-6 text-center">
        Ajouter une Nouvelle Dépense
      </h2>

      {/* Toggle personnalisé */}
      <div className="flex items-center justify-center mb-6">
        <span className="text-gray-300 text-lg mr-4 font-semibold">
          Type de Dépense:
        </span>
        <div className="relative flex w-64 h-10 rounded-full bg-gray-700">
          {/* Arrière-plan coloré */}
          <div
            className={`absolute top-0 bottom-0 w-1/2 rounded-full transition-all duration-300 ${
              expenseType === 'one-time'
                ? 'left-0 bg-blue-600'
                : 'left-1/2 bg-green-600'
            }`}
          ></div>

          {/* Unique */}
          <div
            className={`relative z-10 w-1/2 flex items-center justify-center text-sm font-semibold cursor-pointer transition-colors duration-200 ${
              expenseType === 'one-time'
                ? 'text-white'
                : 'text-gray-400 hover:text-gray-300'
            }`}
            onClick={() => setExpenseType('one-time')}
          >
            Unique
          </div>

          {/* Récurrente */}
          <div
            className={`relative z-10 w-1/2 flex items-center justify-center text-sm font-semibold cursor-pointer transition-colors duration-200 ${
              expenseType === 'recurring'
                ? 'text-white'
                : 'text-gray-400 hover:text-gray-300'
            }`}
            onClick={() => setExpenseType('recurring')}
          >
            Récurrente
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Catégorie */}
        <div>
          <label className="block text-gray-300 text-sm font-bold mb-2">
            Catégorie:
          </label>
          <input
            type="text"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="border border-gray-700 rounded w-full py-2 px-3 bg-gray-800 text-gray-100 focus:ring-2 focus:ring-blue-500"
            placeholder="Ex: Loyer, Nourriture"
            required
          />
        </div>

        {/* Montant */}
        <div>
          <label className="block text-gray-300 text-sm font-bold mb-2">
            Montant (Ar):
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="border border-gray-700 rounded w-full py-2 px-3 bg-gray-800 text-gray-100 focus:ring-2 focus:ring-blue-500"
            step="0.01"
            required
          />
        </div>

        {/* Date */}
        <div>
          <label className="block text-gray-300 text-sm font-bold mb-2">
            Date de la dépense:
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border border-gray-700 rounded w-full py-2 px-3 bg-gray-800 text-gray-100 focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-300 text-sm font-bold mb-2">
            Description:
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border border-gray-700 rounded w-full py-2 px-3 bg-gray-800 text-gray-100 h-24 focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        {/* Reçu */}
        <div>
          <label className="block text-gray-300 text-sm font-bold mb-2">
            ID du reçu:
          </label>
          <input
            type="text"
            value={receiptId}
            onChange={(e) => setReceiptId(e.target.value)}
            className="border border-gray-700 rounded w-full py-2 px-3 bg-gray-800 text-gray-100 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Dates si récurrent */}
        {expenseType === 'recurring' && (
          <div className="space-y-5 bg-gray-800 p-4 rounded-md border border-gray-700">
            <p className="text-white text-lg font-bold">Détails de Récurrence</p>
            <div>
              <label className="block text-gray-300 text-sm font-bold mb-2">
                Date de début:
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="border border-gray-700 rounded w-full py-2 px-3 bg-gray-800 text-gray-100 focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-300 text-sm font-bold mb-2">
                Date de fin:
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="border border-gray-700 rounded w-full py-2 px-3 bg-gray-800 text-gray-100 focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
          </div>
        )}

        {/* Bouton */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all"
        >
          Ajouter la Dépense
        </button>
      </form>
    </div>
  );
}
