import React from 'react';
import { Card } from './Card';
export const TransactionCard = ({
  transactions,
  title = 'Transaction History',
  className = '',
  onTransactionClick
}) => {
  return <Card title={title} className={`${className}`}>
      <div className="">
        {transactions.map(transaction => <div key={transaction.id} className="flex items-center p-2 rounded-lg cursor-pointer hover:bg-gray-200 dark:hover:bg-dark-border" onClick={() => onTransactionClick && onTransactionClick(transaction)}>
            {transaction.icon && <div className="mr-3 p-2 rounded-lg">
                {transaction.icon}
              </div>}
            <div className="flex-1 min-w-0">
              <h4 className=" font-medium truncate">
                {transaction.category || transaction.source}
              </h4>
              {transaction.description && <p className="text-xs truncate">
                  {transaction.description}
                </p>}
            </div>
            <div className="text-right">
              <span className={`font-medium ${transaction.type === 'income' ? 'text-green-500' : 'text-red-500'}`}>
                {transaction.type == 'income' ? '+' : '-'}$
                {Math.abs(transaction.amount).toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })}
              </span>
              {transaction.date && <p className="text-gray-400 text-xs">{transaction.date.split("T")[0]}</p>}
            </div>
            
          </div>)}
      </div>
    </Card>;
};