import BudgetCard from './BudgetCard';

const BudgetsSection = ({ budgets }) => {
  return (
    <div>
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
