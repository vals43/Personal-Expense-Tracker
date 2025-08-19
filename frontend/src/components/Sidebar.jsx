import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboardIcon, FileBarChartIcon, ClockIcon, UserIcon, SettingsIcon, LogOutIcon, MenuIcon, XIcon } from 'lucide-react';

const Sidebar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  const navItems = [{
    name: 'Dashboard',
    path: '/',
    icon: <LayoutDashboardIcon size={20} />
  }, {
    name: 'Expenses',
    path: '/expenses',
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="20" height="14" x="2" y="5" rx="2" />
            <line x1="2" x2="22" y1="10" y2="10" />
          </svg>
  }, {
    name: 'Reports',
    path: '/reports',
    icon: <FileBarChartIcon size={20} />
  }, {
    name: 'History',
    path: '/history',
    icon: <ClockIcon size={20} />
  }, {
    name: 'Profile',
    path: '/profile',
    icon: <UserIcon size={20} />
  }, {
    name: 'Settings',
    path: '/settings',
    icon: <SettingsIcon size={20} />
  }];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="h-full sticky top-0">
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-30">
        <button onClick={toggleMobileMenu} className="p-2 rounded-md bg-gray-800/70 backdrop-blur-md shadow-md text-gray-300">
          <MenuIcon size={24} />
        </button>
      </div>

      {/* Mobile menu overlay */}
      {isMobileMenuOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={closeMobileMenu}></div>}

      {/* Sidebar */}
      <div
        className={`
          fixed inset-y-0 left-0 z-50 transition-all duration-300 ease-in-out
          ${isMobileMenuOpen ? 'translate-x-0 w-64' : '-translate-x-full w-64'}
          lg:translate-x-0 lg:static lg:z-0
          ${isHovered ? 'lg:w-64' : 'lg:w-20'}
          bg-gray-800/20 backdrop-blur-xl border border-gray-700/30
        `}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="h-full flex flex-col p-4 overflow-hidden">
          <div className="flex items-center justify-center mb-8 h-12">
            <h1 className={`text-xl font-bold text-white transition-opacity duration-200 ${isHovered ? 'opacity-100' : 'opacity-0 hidden lg:block'}`}>
              Expense Tracker
            </h1>
            <button onClick={closeMobileMenu} className="lg:hidden p-1 rounded-md text-white hover:bg-white/20">
              <XIcon size={20} />
            </button>
          </div>
          <div className="space-y-2 flex-1">
            {navItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className={`flex items-center p-3 rounded-lg transition-colors duration-200
                  ${isActive(item.path) ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700/50'}
                `}
                onClick={closeMobileMenu}
              >
                <div className="mr-3">{item.icon}</div>
                <span className={`transition-opacity duration-200 ${isHovered ? 'opacity-100' : 'lg:hidden'}`}>{item.name}</span>
              </Link>
            ))}
          </div>
          <div className={`mt-auto pt-4 transition-opacity duration-200 ${isHovered ? 'opacity-100' : 'opacity-0 hidden lg:block'}`}>
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
            <button className="mt-4 flex items-center text-gray-400 hover:text-white">
              <LogOutIcon size={20} className="mr-2" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;