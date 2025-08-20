import React from 'react';
import { Link } from 'react-router-dom';

const SidebarNav = ({ navItems, isActive, isHovered, onItemClick }) => {
  return (
    <div className="space-y-3 flex-1">
      {navItems.map((item, index) => (
        <Link
          key={index}
          to={item.path}
          className={`flex items-center p-3 rounded-lg transition-colors duration-200
            ${isActive(item.path) ? 'bg-blue-700 text-white' : 'text-gray-300 hover:bg-gray-700/50'}
          `}
          onClick={onItemClick}
        >
          <div className="mr-3">{item.icon}</div>
          <span className={`transition-opacity duration-200 ${isHovered ? 'opacity-100' : 'lg:hidden'}`}>{item.name}</span>
        </Link>
      ))}
    </div>
  );
};

export default SidebarNav;