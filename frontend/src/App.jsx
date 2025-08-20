import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './page/Dashboard';
import ExpensesPage from './page/ExpensePage';
import Sidebar from './page/Sidebar';

function App() {
  return (
    <Router>
      <div className="bg-gray-900 text-gray-100 flex">
        <Sidebar /> 

        <div className="flex-1 overflow-x-hidden">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/expenses" element={<ExpensesPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;