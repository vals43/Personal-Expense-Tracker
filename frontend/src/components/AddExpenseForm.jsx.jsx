// frontend/src/components/AddExpenseForm.jsx
import React, { useState, useEffect } from 'react';

export function AddExpenseForm({ onSubmit, initialData = null, onCancelEdit }) {
  // Initialiser les états avec les données initiales si en mode édition
  const [expenseType, setExpenseType] = useState(initialData?.type || 'one-time');
  const [categoryId, setCategoryId] = useState(initialData?.category_id || '');
  const [amount, setAmount] = useState(initialData?.amount || '');
  const [date, setDate] = useState(initialData?.date || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [receiptId, setReceiptId] = useState(initialData?.receipt_id || '');
  const [startDate, setStartDate] = useState(initialData?.start_date || '');
  const [endDate, setEndDate] = useState(initialData?.end_date || '');

  // Mettre à jour les états lorsque initialData change (pour le mode édition)
  useEffect(() => {
    if (initialData) {
      setExpenseType(initialData.type || 'one-time');
      setCategoryId(initialData.category_id || '');
      setAmount(initialData.amount || '');
      setDate(initialData.date || '');
      setDescription(initialData.description || '');
      setReceiptId(initialData.receipt_id || '');
      setStartDate(initialData.start_date || '');
      setEndDate(initialData.end_date || '');
    } else {
      // Réinitialiser le formulaire si initialData est null (passage en mode ajout)
      setExpenseType('one-time');
      setCategoryId('');
      setAmount('');
      setDate('');
      setDescription('');
      setReceiptId('');
      setStartDate('');
      setEndDate('');
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const expenseData = {
      category_id: categoryId,
      amount: parseFloat(amount),
      date: date,
      description: description,
      receipt_id: receiptId || null,
      type: expenseType,
      start_date: expenseType === 'recurring' ? (startDate || null) : null,
      end_date: expenseType === 'recurring' ? (endDate || null) : null,
    };

    // Si initialData existe, c'est une mise à jour, sinon une création
    if (initialData) {
      onSubmit(initialData.id, expenseData); // Passe l'ID et les données mises à jour
    } else {
      onSubmit(expenseData); // Passe les données pour la création
    }

    // Le formulaire est réinitialisé via l'useEffect lorsque initialData est null
    // Ou manuellement si c'est une création et qu'il n'y a pas d'édition en cours
    if (!initialData) {
      setCategoryId('');
      setAmount('');
      setDate('');
      setDescription('');
      setReceiptId('');
      setStartDate('');
      setEndDate('');
      setExpenseType('one-time');
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-gray-900 rounded-lg shadow-xl border border-gray-700">
      <h2 className="text-3xl font-bold text-white mb-6 text-center">
        {initialData ? 'Modifier la Dépense' : 'Ajouter une Nouvelle Dépense'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="flex items-center justify-center mb-6">
          <span className="text-gray-300 text-lg mr-4 font-semibold">Type de Dépense:</span>
          <div className="relative w-64 select-none transition duration-200 ease-in-out h-10 rounded-full flex items-center bg-gray-700">
            <div
              className={`absolute top-0 bottom-0 rounded-full transition-all duration-300 ease-in-out ${
                expenseType === 'one-time' ? 'left-0 w-1/2 bg-blue-600' : 'left-1/2 w-1/2 bg-green-600'
              }`}
            ></div>
            <label
              htmlFor="expenseTypeToggle"
              className={`relative z-10 w-1/2 text-center text-sm font-semibold py-2 cursor-pointer transition-colors duration-200 ${
                expenseType === 'one-time' ? 'text-white' : 'text-gray-400 hover:text-gray-300'
              }`}
              onClick={() => setExpenseType('one-time')}
            >
              Unique
            </label>
            <label
              htmlFor="expenseTypeToggle"
              className={`relative z-10 w-1/2 text-center text-sm font-semibold py-2 cursor-pointer transition-colors duration-200 ${
                expenseType === 'recurring' ? 'text-white' : 'text-gray-400 hover:text-gray-300'
              }`}
              onClick={() => setExpenseType('recurring')}
            >
              Récurrente
            </label>
            <input
              type="checkbox"
              id="expenseTypeToggle"
              checked={expenseType === 'recurring'}
              onChange={() => setExpenseType(expenseType === 'one-time' ? 'recurring' : 'one-time')}
              className="sr-only"
            />
          </div>
        </div>

        <div>
          <label htmlFor="categoryId" className="block text-gray-300 text-sm font-bold mb-2">
            Catégorie:
          </label>
          <input
            type="text"
            id="categoryId"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 text-gray-100 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-800 placeholder-gray-500"
            placeholder="Ex: Loyer, Nourriture"
            required
          />
        </div>

        <div>
          <label htmlFor="amount" className="block text-gray-300 text-sm font-bold mb-2">
            Montant (€):
          </label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 text-gray-100 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-800 placeholder-gray-500"
            placeholder="Ex: 50.00"
            step="0.01"
            required
          />
        </div>

        <div>
          <label htmlFor="date" className="block text-gray-300 text-sm font-bold mb-2">
            Date de la dépense:
          </label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 text-gray-100 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-800"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-gray-300 text-sm font-bold mb-2">
            Description (optionnel):
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 text-gray-100 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-800 h-24 placeholder-gray-500"
            placeholder="Détails supplémentaires sur la dépense..."
          ></textarea>
        </div>

        <div>
          <label htmlFor="receiptId" className="block text-gray-300 text-sm font-bold mb-2">
            ID du reçu (optionnel):
          </label>
          <input
            type="text"
            id="receiptId"
            value={receiptId}
            onChange={(e) => setReceiptId(e.target.value)}
            className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 text-gray-100 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-800 placeholder-gray-500"
            placeholder="Ex: rcpt-12345 (cet ID serait normalement généré par un système d'upload)"
          />
        </div>

        {expenseType === 'recurring' && (
          <div className="space-y-5 bg-gray-800 p-4 rounded-md border border-gray-700">
            <p className="text-white text-lg font-bold">Détails de Récurrence</p>
            <div>
              <label htmlFor="startDate" className="block text-gray-300 text-sm font-bold mb-2">
                Date de début:
              </label>
              <input
                type="date"
                id="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 text-gray-100 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-gray-800"
                required={expenseType === 'recurring'}
              />
            </div>
            <div>
              <label htmlFor="endDate" className="block text-gray-300 text-sm font-bold mb-2">
                Date de fin:
              </label>
              <input
                type="date"
                id="endDate"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 text-gray-100 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-gray-800"
                required={expenseType === 'recurring'}
              />
            </div>
          </div>
        )}

        <div className="flex gap-4">
          <button
            type="submit"
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            {initialData ? 'Mettre à jour la Dépense' : 'Ajouter la Dépense'}
          </button>
          {initialData && (
            <button
              type="button"
              onClick={onCancelEdit}
              className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Annuler
            </button>
          )}
        </div>
      </form>
    </div>
  );
}