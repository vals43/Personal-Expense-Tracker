import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { LayoutDashboardIcon, FileBarChartIcon, ClockIcon, UserIcon, SettingsIcon, MenuIcon, XIcon, CreditCardIcon, LogOutIcon } from 'lucide-react';
import SidebarNav from '../components/Sidebar/SidebarNav';
import SidebarUser from '../components/Sidebar/SidebarUser';

const navItems = [
  { name: 'Dashboard', path: '/', icon: <LayoutDashboardIcon size={20} /> },
  { name: 'Expenses', path: '/expenses', icon: <CreditCardIcon size={20} /> },
  { name: 'Reports', path: '/reports', icon: <FileBarChartIcon size={20} /> },
  { name: 'History', path: '/history', icon: <ClockIcon size={20} /> },
  { name: 'Profile', path: '/profile', icon: <UserIcon size={20} /> },
  { name: 'Settings', path: '/settings', icon: <SettingsIcon size={20} /> },
  { name: 'Logout', path: '/logout', icon: <LogOutIcon size={20} /> },

];

const Sidebar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <div className="h-screen sticky top-0 flex flex-col">
      {/* Mobile menu toggle button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={toggleMobileMenu}
          className="p-2 rounded-lg bg-gray-900/80 backdrop-blur-md shadow-lg text-white hover:bg-gray-700/80 transition-colors"
        >
          <MenuIcon size={24} />
        </button>
      </div>

      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={closeMobileMenu}
        ></div>
      )}

      {/* Sidebar container */}
      <div
        className={`fixed inset-y-0 left-0 z-50 transition-all duration-300 ease-in-out
          ${isMobileMenuOpen ? 'translate-x-0 w-72' : '-translate-x-full w-72'}
          lg:translate-x-0 lg:static lg:z-0
          ${isHovered ? 'lg:w-72' : 'lg:w-16'}
           backdrop-blur-2xl
        `}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="h-full flex flex-col p-3">
          {/* Sidebar header */}
          <div className="flex items-center justify-between mb-6 h-12">
            <h1
              className={`text-2xl font-semibold text-white transition-all duration-200 ${
                isHovered ? 'opacity-100' : 'opacity-0'
              }`}
            >
              Expense Tracker
            </h1>
            <button
              onClick={closeMobileMenu}
              className="lg:hidden p-2 rounded-md text-white hover:bg-gray-700/50 transition-colors"
            >
              <XIcon size={24} />
            </button>
          </div>

          {/* Navigation items */}
          <SidebarNav
            navItems={navItems}
            isActive={isActive}
            isHovered={isHovered}
            onItemClick={closeMobileMenu}
          />

          {/* User profile section */}
          <div className="mt-auto">
            <SidebarUser isHovered={isHovered} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;