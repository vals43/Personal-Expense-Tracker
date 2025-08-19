import React, { useState, useEffect } from 'react';
import { ExpenseListRecurring } from '../components/Expense/expenseRecurring.jsx';
import { AddExpenseForm } from '../components/Expense/AddExpenseForm.jsx';
import {
  fetchAllExpenses,
  createNewExpense,
  updateExistingExpense,
  deleteExistingExpense,
} from '../api/Expense.Api.js';

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingExpense, setEditingExpense] = useState(null);


  const loadExpenses = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchAllExpenses();
      setExpenses(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Ajoute une nouvelle dépense
  const handleAddExpense = async (newExpenseData) => {
    try {
      const addedExpense = await createNewExpense(newExpenseData);
      setExpenses((prevExpenses) => [...prevExpenses, addedExpense]); // Ajoute à la liste existante
      // Optionnel: Afficher un message de succès
      console.log('Dépense ajoutée avec succès:', addedExpense);
    } catch (err) {
      setError(err.message);
      console.error('Erreur lors de l\'ajout de la dépense:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteExistingExpense(id);
  
      setExpenses((prev) => prev.filter((exp) => exp.id !== id));
  
      alert("✅ Dépense supprimée avec succès !");
    } catch (error) {
      console.error("Erreur suppression:", error);
      alert("❌ Impossible de supprimer la dépense !");
    }
  };
  

  const handleEdit = (expense) => {
    setEditingExpense(expense); 
  };

  const handleUpdateExpense = async (id, updatedData) => {
    try {
      const updatedExpense = await updateExistingExpense(id, updatedData);
      setExpenses((prevExpenses) =>
        prevExpenses.map((exp) => (exp.id === id ? updatedExpense : exp))
      ); 
      setEditingExpense(null);
      console.log('Dépense mise à jour avec succès:', updatedExpense);
    } catch (err) {
      setError(err.message);
      console.error('Erreur lors de la mise à jour de la dépense:', err);
    }
  };

  const handleViewReceipt = (receiptId) => {
    console.log("Voir le reçu:", receiptId);
    // Ici, vous implémenteriez la logique pour afficher le reçu (ouvrir dans un nouvel onglet, modale, etc.)
    alert(`Affichage du reçu avec l'ID: ${receiptId}`); // Utilisez une modale personnalisée au lieu d'alert()
  };

  // Charge les dépenses au montage du composant
  useEffect(() => {
    loadExpenses();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-12 text-lg text-gray-400 font-medium bg-gray-900 min-h-screen">
        Chargement des dépenses...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 text-lg text-red-500 font-medium bg-gray-900 min-h-screen">
        Erreur: {error}
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-950 min-h-screen text-gray-100">
      <h1 className="text-4xl font-bold text-center mb-10 text-blue-400">Gestionnaire de Dépenses</h1>

      {/* Section pour ajouter ou éditer une dépense */}
      <div className="mb-10">
        <AddExpenseForm
          onSubmit={handleAddExpense}
          initialData={editingExpense} // Passe la dépense à éditer si elle existe
          onCancelEdit={() => setEditingExpense(null)} // Pour annuler l'édition
        />
      </div>

      {/* Liste des dépenses */}
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-200">Mes Dépenses</h2>
      <ExpenseListRecurring
        expenses={expenses}
        onDelete={handleDelete}
        onEdit={handleEdit}
        onViewReceipt={handleViewReceipt}
      />
    </div>
  );
}