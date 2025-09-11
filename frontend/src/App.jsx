// src/App.jsx (inchangé)
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './components/theme/ThemeProvider';
import { AppRouter } from './AppRouter';
import { UserProvider } from './api/user/userContext';
import { IncomeProvider } from './api/incomes/getJsonIncomes';
import { ExpenseProvider } from './api/expenses/expenseContext';
import { CategoryProvider } from './api/category/categoryContext';
import { ReceiptProvider } from './api/receipt/receiptContext';

export default function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <BrowserRouter> {/* Seul Router racine */}
          <IncomeProvider>
            <ExpenseProvider>
              <CategoryProvider>
                <ReceiptProvider>
                    <AppRouter />
                </ReceiptProvider>
              </CategoryProvider>
            </ExpenseProvider>
          </IncomeProvider>
        </BrowserRouter>
      </UserProvider>
    </ThemeProvider>
  );
}