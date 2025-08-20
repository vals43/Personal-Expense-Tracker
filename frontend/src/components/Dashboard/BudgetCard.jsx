import React from 'react';
import { MoreVerticalIcon } from 'lucide-react';

const BudgetCard = ({ name, spent, remaining, date }) => {
  const total = spent + remaining;
  const percentage = Math.round((spent / total) * 100)+3;

  return (
    <div className="bg-gray-800  w-max text-gray-200 rounded-xl shadow-lg p-2">
      <div className="flex bg-gray-900 px-6 py-1 rounded-2xl justify-between items-start mb-4">
        <h3 className="font-medium">{name}</h3>
        <button className="text-gray-500 flex -mr-3 self-center  items-center hover:text-gray-300">
          <MoreVerticalIcon size={18} />
        </button>
      </div>

    <div className="flex">
    <div className="flex justify-center -mt-1 mb-4 ml-3 mr-13">
        <div className="relative w-28 h-28">
          <svg className="w-full h-full" viewBox="0 0 36 36">
            <circle
              cx="18"
              cy="18"
              r="17"
              fill="none"
              stroke="blue"
              strokeWidth="2"
            />
            <circle
              cx="18" 
              cy="18"
              r="17"
              fill="none"
              stroke={percentage <80 ? "#D4A50D": "red"}
              strokeWidth="2"
              strokeDasharray={`${percentage} 100`}
              strokeLinecap="round"
              transform="rotate(-90 18 18)"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-gray-400 text-xs">Total</span>
            <span className="font-bold">{total}€</span>
          </div>
        </div>
      </div>

      <div className="space-y-1">
        <div className="flex flex-col items-end text-sm">
          <span className="text-gray-400">Spent</span>
          <span className="font-medium text-amber-400">{spent}€</span>
        </div>
        <div className="flex flex-col items-end text-sm">
          <span className="text-gray-400">Remaining</span>
          <span className="font-medium text-blue-400">{remaining}€</span>
        </div>
        <div className="text-right text-xs text-gray-500 pt-2">{date}</div>
      </div>
    </div>
    </div>
  );
};

export default BudgetCard;