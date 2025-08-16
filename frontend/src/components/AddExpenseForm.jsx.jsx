import React, { useState, useEffect } from 'react';

export function AddExpenseForm({ onSubmit, initialData = null, onCancelEdit }) {
  const [userId, setUserId] = useState(initialData?.user_id || '');
  const [expenseType, setExpenseType] = useState(initialData?.type || 'one-time');
  const [categoryId, setCategoryId] = useState(initialData?.category_id || '');
  const [amount, setAmount] = useState(initialData?.amount ? String(initialData.amount) : '');
  const [date, setDate] = useState(initialData?.date || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [receiptId, setReceiptId] = useState(initialData?.receipt_id || '');
  const [startDate, setStartDate] = useState(initialData?.start_date || '');
  const [endDate, setEndDate] = useState(initialData?.end_date || '');

  const categories = [
    { id: 1, name: "Nourriture" },
    { id: 2, name: "Transport" },
    { id: 3, name: "Logement" },
    { id: 4, name: "Divertissement" },
    { id: 5, name: "Santé" },
    { id: 6, name: "Éducation" },
    { id: 7, name: "Services Publics" },
    { id: 8, name: "Achats Divers" },
    { id: 9, name: "Vêtements" }
  ];

  // Mettre à jour les champs si initialData change
  useEffect(() => {
    if (initialData) {
      setUserId(initialData.user_id || '');
      setExpenseType(initialData.type || 'one-time');
      setCategoryId(initialData.category_id || '');
      setAmount(initialData.amount ? String(initialData.amount) : '');
      setDate(initialData.date || '');
      setDescription(initialData.description || '');
      setReceiptId(initialData.receipt_id || '');
      setStartDate(initialData.start_date || '');
      setEndDate(initialData.end_date || '');
    } else {
      resetForm();
    }
  }, [initialData]);

  const resetForm = () => {
    setUserId('');
    setExpenseType('one-time');
    setCategoryId('');
    setAmount('');
    setDate('');
    setDescription('');
    setReceiptId('');
    setStartDate('');
    setEndDate('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const expenseData = {
      user_id: parseInt(userId, 10),
      category_id: parseInt(categoryId, 10),
      amount: parseFloat(amount),
      date,
      description: description || null,
      receipt_id: receiptId ? parseInt(receiptId, 10) : null,
      type: expenseType,
      start_date: expenseType === 'recurring' ? (startDate || null) : null,
      end_date: expenseType === 'recurring' ? (endDate || null) : null,
    };

    console.log("Nouvelle dépense soumise:", expenseData);

    if (onSubmit) {
      if (initialData) {
        onSubmit(initialData.id, expenseData);
      } else {
        onSubmit(expenseData);
      }
    }

    if (!initialData) resetForm();
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-gray-900 rounded-lg shadow-xl border border-gray-700">
      <h2 className="text-3xl font-bold text-white mb-6 text-center">
        {initialData ? 'Modifier la Dépense' : 'Ajouter une Nouvelle Dépense'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Toggle Type de dépense */}
        <div className="flex items-center justify-center mb-6">
          <span className="text-gray-300 text-lg mr-4 font-semibold">Type de Dépense:</span>
          <div className="relative w-64 h-10 flex items-center bg-gray-700 rounded-full select-none">
            <div
              className={`absolute top-0 bottom-0 rounded-full transition-all duration-300 ease-in-out ${
                expenseType === 'one-time'
                  ? 'left-0 w-1/2 bg-blue-600'
                  : 'left-1/2 w-1/2 bg-green-600'
              }`}
            ></div>

            <label
              htmlFor="expenseTypeToggle"
              className={`relative z-10 w-1/2 text-center text-sm font-semibold py-2 cursor-pointer transition-colors duration-200 ${
                expenseType === 'one-time' ? 'text-white' : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              Unique
            </label>

            <label
              htmlFor="expenseTypeToggle"
              className={`relative z-10 w-1/2 text-center text-sm font-semibold py-2 cursor-pointer transition-colors duration-200 ${
                expenseType === 'recurring' ? 'text-white' : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              Récurrente
            </label>

            <input
              type="checkbox"
              id="expenseTypeToggle"
              checked={expenseType === 'recurring'}
              onChange={() =>
                setExpenseType(expenseType === 'one-time' ? 'recurring' : 'one-time')
              }
              className="sr-only"
            />
          </div>
        </div>

        {/* Champ user_id */}
        <div>
          <label htmlFor="userId" className="block text-gray-300 text-sm font-bold mb-2">
            ID Utilisateur:
          </label>
          <input
            type="number"
            id="userId"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="shadow border border-gray-700 rounded w-full py-2 px-3 text-gray-100 bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ex: 101"
            required
          />
        </div>

        {/* Champ catégorie */}
        <div>
          <label htmlFor="categoryId" className="block text-gray-300 text-sm font-bold mb-2">
            Catégorie:
          </label>
          <select
            id="categoryId"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="shadow border border-gray-700 rounded w-full py-2 px-3 text-gray-100 bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="" disabled>Sélectionnez une catégorie</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Montant */}
        <div>
          <label htmlFor="amount" className="block text-gray-300 text-sm font-bold mb-2">
            Montant (€):
          </label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="shadow border border-gray-700 rounded w-full py-2 px-3 text-gray-100 bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ex: 50.00"
            step="0.01"
            required
          />
        </div>

        {/* Date */}
        <div>
          <label htmlFor="date" className="block text-gray-300 text-sm font-bold mb-2">
            Date de la dépense:
          </label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="shadow border border-gray-700 rounded w-full py-2 px-3 text-gray-100 bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-gray-300 text-sm font-bold mb-2">
            Description (optionnel):
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="shadow border border-gray-700 rounded w-full py-2 px-3 text-gray-100 bg-gray-800 h-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Détails supplémentaires sur la dépense..."
          ></textarea>
        </div>

        {/* Reçu */}
        <div>
          <label htmlFor="receiptId" className="block text-gray-300 text-sm font-bold mb-2">
            ID du reçu (optionnel):
          </label>
          <input
            type="number"
            id="receiptId"
            value={receiptId}
            onChange={(e) => setReceiptId(e.target.value)}
            className="shadow border border-gray-700 rounded w-full py-2 px-3 text-gray-100 bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ex: 12345"
          />
        </div>

        {/* Champs récurrence */}
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
                className="shadow border border-gray-700 rounded w-full py-2 px-3 text-gray-100 bg-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500"
                required
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
                className="shadow border border-gray-700 rounded w-full py-2 px-3 text-gray-100 bg-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>
        )}

        {/* Boutons */}
        <div className="flex gap-4">
          <button
            type="submit"
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            {initialData ? 'Mettre à jour la Dépense' : 'Ajouter la Dépense'}
          </button>
          {initialData && (
            <button
              type="button"
              onClick={onCancelEdit}
              className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Annuler
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
