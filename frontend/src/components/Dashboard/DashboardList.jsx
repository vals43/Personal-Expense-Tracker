import React from 'react';
import { Badge, BadgeIndicator } from '../ui/Badge.jsx';

const expenseData = [
  {
    id: "1",
    company: "Ryanair",
    budget: "Berlin Congress",
    date: "01/02/19",
    amount: "126,30€",
    status: "one-time", // Changed from "approved"
    icon: "✈️",
  },
  {
    id: "2",
    company: "NH hotels",
    budget: "Berlin Congress",
    date: "01/02/19",
    amount: "210,00€",
    status: "one-time", // Changed from "approved"
    icon: "🏨",
  },
  {
    id: "3",
    company: "Equinox Rest.",
    budget: "Berlin Congress",
    date: "03/02/19",
    amount: "32,54€",
    status: "one-time", // Changed from "approved"
    icon: "🍽️",
  },
  {
    id: "4",
    company: "Grandma's kitchen",
    budget: "Berlin Congress",
    date: "03/02/19",
    amount: "14,20€",
    status: "one-time", // Changed from "approved"
    icon: "🍽️",
  },
  {
    id: "5",
    company: "Presents store",
    budget: "Berlin Congress",
    date: "03/02/19",
    amount: "22,40€",
    status: "one-time", // Changed from "approved"
    icon: "🎁",
  },
  {
    id: "6",
    company: "Car stars",
    budget: "Berlin Congress",
    date: "03/02/19",
    amount: "5,10€",
    status: "recurring", // Changed from "pending"
    icon: "🚗",
  },
  {
    id: "7",
    company: "Paper supplies",
    budget: "February Expenses",
    date: "04/02/19",
    amount: "6,12€",
    status: "recurring", // Changed from "pending"
    icon: "📄",
  },
  {
    id: "8",
    company: "Galleta Rest.",
    budget: "February Expenses",
    date: "04/02/19",
    amount: "42,60€",
    status: "recurring", // Changed from "pending"
    icon: "🍽️",
  },
  {
    id: "9",
    company: "Palestore",
    budget: "February Expenses",
    date: "04/02/19",
    amount: "15,00€",
    status: "recurring", // Changed from "pending"
    icon: "🏪",
  },
];

export default function ExpenseTable() {
  return (
    <div className="w-full max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Company
              </th>
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Budget
              </th>
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Date
              </th>
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Amount
              </th>
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
            {expenseData.map((expense) => (
              <tr
                key={expense.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
              >
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{expense.icon}</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {expense.company}
                    </span>
                  </div>
                </td>
                <td className="py-4 px-6 text-gray-600 dark:text-gray-300">
                  {expense.budget}
                </td>
                <td className="py-4 px-6 text-gray-600 dark:text-gray-300">
                  {expense.date}
                </td>
                <td className="py-4 px-6 font-semibold text-gray-900 dark:text-white">
                  {expense.amount}
                </td>
                <td className="py-4 px-6">
                  <Badge variant={expense.status}>
                    <BadgeIndicator variant={expense.status} className="mr-2" />
                    <span className="capitalize">{expense.status}</span>
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}