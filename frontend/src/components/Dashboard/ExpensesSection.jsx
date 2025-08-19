
import ExpenseTable from './DashboardList';
import Toolbar from './Toolbar';

const ExpensesSection = ({ expenses }) => {
  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg text-black font-medium">Your Expenses</h2>
        <Toolbar />
        
      </div>
      <ExpenseTable/>
    </div>
  );
};

export default ExpensesSection;
