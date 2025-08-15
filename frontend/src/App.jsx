import { useState } from 'react'
import { ExpenseListRecurring } from './components/expenseRecurring';
import { AddExpenseForm } from './components/ExpenseNew.jsx';

function TestExpenseList() {
  const fictionalExpenses = [
    {
      id: "exp001",
      category_id: "Courses",
      amount: 85.50,
      date: "2024-08-14",
      description: "Achats hebdomadaires au supermarché",
      type: "Unique",
      receipt_id: "receipt_001",
      start_date: null,
      end_date: null
    },
    {
      id: "exp002",
      category_id: "Loyer",
      amount: 750.00,
      date: "2024-08-01",
      description: "Paiement du loyer mensuel",
      type: "Récurrente",
      receipt_id: null,
      start_date: "2024-08-01",
      end_date: "2025-07-31"
    },
    {
      id: "exp003",
      category_id: "Transport",
      amount: 15.20,
      date: "2024-08-13",
      description: "Essence pour la voiture",
      type: "Unique",
      receipt_id: "receipt_002",
      start_date: null,
      end_date: null
    },
    {
      id: "exp004",
      category_id: "Divertissement",
      amount: 19.99,
      date: "2024-08-10",
      description: "Abonnement streaming",
      type: "Récurrente",
      receipt_id: "receipt_003",
      start_date: "2024-08-10",
      end_date: "2025-08-09"
    },
    {
      id: "exp005",
      category_id: "Santé",
      amount: 45.00,
      date: "2024-08-05",
      description: "Consultation médicale",
      type: "Unique",
      receipt_id: null, // Pas de reçu
      start_date: null,
      end_date: null
    },
    {
      id: "exp006",
      category_id: "Éducation",
      amount: 120.00,
      date: "2024-07-20",
      description: "Cours de formation en ligne",
      type: "Unique",
      receipt_id: "receipt_004",
      start_date: null,
      end_date: null
    }
  ];

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Tableau de Dépenses Fictives</h1>
      <ExpenseListRecurring expenses={fictionalExpenses} />
    </div>
  );
}
function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="">
      <TestExpenseList />
      <AddExpenseForm/>
    </div>
  )
}

export default App
