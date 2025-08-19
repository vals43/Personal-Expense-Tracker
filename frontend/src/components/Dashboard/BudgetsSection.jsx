import BudgetCard from './BudgetCard';

const BudgetsSection = ({ budgets }) => {
  return (
    <div>
      <h2 className="text-lg font-medium mb-4">Your Current Budgets</h2>
      <div className="grid grid-cols-3 gap-4">
        {budgets.map(budget => (
          <BudgetCard
            key={budget.id}
            name={budget.name}
            total={budget.total}
            spent={budget.spent}
            remaining={budget.remaining}
            date={budget.date}
          />
        ))}
      </div>
    </div>
  );
};

export default BudgetsSection;
