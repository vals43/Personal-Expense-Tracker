import ExpenseTable from './DashboardList';
import Toolbar from './Toolbar';

const ExpensesSection = ({ expenses }) => {
  let n = expenses.length
  
  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg text-white font-medium">Your last {n} expenses</h2>
        <Toolbar />
      </div>
      <ExpenseTable expenses={expenses} /> 
    </div>
  );
};

export default ExpensesSection;