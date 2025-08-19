import Sidebar from '../components/Sidebar';
import BudgetsSection from '../components/Dashboard/BudgetsSection';
import ExpensesSection from '../components/Dashboard/ExpensesSection';

const Dashboard = () => {
  // Mock data for budgets
  const budgets = [
    { id: 1, name: 'February Expenses', total: 300, spent: 87.5, remaining: 212.5, date: '01/02/19' },
    { id: 2, name: 'Berlin Congress', total: 850, spent: 297.5, remaining: 552.5, date: '01/02/19' },
    { id: 3, name: 'Inditex Meeting', total: 400, spent: 187.5, remaining: 212.5, date: '01/02/19' }
  ];

  // Mock data for expenses
  const expenses = [
    { id: 1, company: 'Ryanair', budget: 'Berlin Congress', date: '01/02/19', amount: 126.3, status: 'Approved' },
    { id: 2, company: 'NH hotels', budget: 'Berlin Congress', date: '01/02/19', amount: 210.0, status: 'Approved' },
    { id: 3, company: 'Equinox Rest.', budget: 'Berlin Congress', date: '03/02/19', amount: 32.54, status: 'Approved' },
    { id: 4, company: "Grandma's kitchen", budget: 'Berlin Congress', date: '03/02/19', amount: 14.2, status: 'Approved' },
    { id: 5, company: 'Presents store', budget: 'Berlin Congress', date: '03/02/19', amount: 22.4, status: 'Approved' },
    { id: 6, company: 'Car stars', budget: 'Berlin Congress', date: '03/02/19', amount: 5.1, status: 'Pending' },
    { id: 7, company: 'Paper supplies', budget: 'February Expenses', date: '04/02/19', amount: 6.12, status: 'Pending' },
    { id: 8, company: 'Galleta Rest.', budget: 'February Expenses', date: '04/02/19', amount: 42.6, status: 'Pending' },
    { id: 9, company: 'Pakstore', budget: 'February Expenses', date: '04/02/19', amount: 15.0, status: 'Pending' }
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 p-8">
        <div className="w-2/3">
          <BudgetsSection budgets={budgets} />
          <ExpensesSection expenses={expenses} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
