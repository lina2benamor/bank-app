import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Users, CreditCard, BanknoteIcon, FileText, 
  HelpCircle, Building2, Settings, BellIcon, LogOut, Menu, X,
  ChevronDown
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

// Navigation items configuration
const navItems = [
  { to: '/', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
  { to: '/users', icon: <Users size={20} />, label: 'User Management' },
  { to: '/transactions', icon: <BanknoteIcon size={20} />, label: 'Transactions' },
  { to: '/accounts', icon: <CreditCard size={20} />, label: 'Accounts' },
  { to: '/loans', icon: <FileText size={20} />, label: 'Loans & Credit' },
  { to: '/support', icon: <HelpCircle size={20} />, label: 'Customer Support' },
  { to: '/branches', icon: <Building2 size={20} />, label: 'Branches & ATMs' },
  { to: '/settings', icon: <Settings size={20} />, label: 'Settings' },
];

const DashboardLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside 
        className={`${
          isSidebarOpen ? 'translate-x-0 w-64' : 'translate-x-[-100%] w-0 md:w-20 md:translate-x-0'
        } fixed top-0 left-0 z-40 h-screen transition-all duration-300 ease-in-out bg-primary-700 text-white md:relative`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b border-primary-600">
            <div className={`${isSidebarOpen ? 'flex' : 'hidden md:flex'} items-center space-x-2`}>
              <div className="w-8 h-8 bg-accent-500 rounded-md flex items-center justify-center">
                <BanknoteIcon size={20} className="text-primary-900" />
              </div>
              <span className={`${isSidebarOpen ? 'block' : 'hidden'} font-semibold text-lg`}>BankAdmin</span>
            </div>
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
              className="p-1 rounded-md hover:bg-primary-600 md:hidden"
            >
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => 
                  `flex items-center px-3 py-2.5 rounded-md transition-colors ${
                    isActive 
                      ? 'bg-primary-600 text-white' 
                      : 'text-gray-300 hover:bg-primary-600 hover:text-white'
                  }`
                }
              >
                <span className="mr-3">{item.icon}</span>
                <span className={`${isSidebarOpen ? 'block' : 'hidden'}`}>{item.label}</span>
              </NavLink>
            ))}
          </nav>

          <div className="p-4 border-t border-primary-600">
            <div className="flex items-center space-x-3">
              {user?.avatar && (
                <img 
                  src={user.avatar} 
                  alt={user.name}
                  className={`w-10 h-10 rounded-full ${isSidebarOpen ? 'block' : 'hidden md:block'}`}
                />
              )}
              <div className={`${isSidebarOpen ? 'block' : 'hidden'}`}>
                <p className="font-medium">{user?.name}</p>
                <p className="text-xs text-gray-300">{user?.role}</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm z-30">
          <div className="flex items-center justify-between px-6 py-3">
            <div className="flex items-center md:hidden">
              <button 
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2 rounded-md text-gray-500 hover:bg-gray-100"
              >
                <Menu size={20} />
              </button>
            </div>
            
            <div className="flex items-center ml-auto space-x-4">
              {/* Notifications */}
              <button className="p-2 rounded-full text-gray-500 hover:bg-gray-100 relative">
                <BellIcon size={20} />
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-error-500 rounded-full"></span>
              </button>
              
              {/* Profile dropdown */}
              <div className="relative">
                <button 
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="flex items-center space-x-2 text-sm focus:outline-none"
                >
                  <span className="hidden md:block">{user?.name}</span>
                  <ChevronDown size={16} />
                </button>
                
                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 animate-fade-in">
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <LogOut size={16} className="mr-2" />
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;