import React from 'react';
export const Card= ({
  children,
  className = '',
  title,
  action
}) => {
  return <div className={`bg-gray-800 rounded-lg p-4 ${className}`}>
      {(title || action) && <div className="flex justify-between items-center mb-3">
          {title && <h3 className="text-white font-medium">{title}</h3>}
          {action && <div>{action}</div>}
        </div>}
      {children}
    </div>;
};