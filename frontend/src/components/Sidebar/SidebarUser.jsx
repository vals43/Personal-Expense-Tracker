import React from 'react';
import {  Link, useNavigate } from 'react-router-dom';

const SidebarUser = ({ isHovered }) => {
  const navigate = useNavigate() 
  return (
    <Link className={`mt-auto pt-4 cursor-pointer transition-opacity duration-200 ${isHovered ? 'opacity-100' : 'opacity-0 hidden lg:block'}`}
       to={'/profile'}
    >
      <div className="flex items-center p-3 bg-gray-700/50 rounded-lg shadow-sm">
        <div className="mr-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white">
            M
          </div>
        </div>
        <div>
          <p className="font-medium text-white">
            Marcos
          </p>
          <p className="text-sm text-gray-400">Kahn</p>
        </div>
      </div>
    </Link>
  );
};

export default SidebarUser;