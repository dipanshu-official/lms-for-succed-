import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Header({ user, userRole, onLogout }) {
  const location = useLocation();
  
  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/courses', label: 'Courses', icon: '📚' },
    { path: '/progress', label: 'Progress', icon: '📈' },
  ];

  const adminNavItems = [
    { path: '/admin', label: 'Overview', icon: '📊' },
    { path: '/admin/students', label: 'Students', icon: '👥' },
    { path: '/admin/courses', label: 'Courses', icon: '📚' },
    { path: '/admin/payments', label: 'Payments', icon: '💳' },
  ];

  const currentNavItems = userRole === 'admin' ? adminNavItems : navItems;
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <Link to={userRole === 'admin' ? '/admin' : '/dashboard'} className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-200">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-primary-800 rounded-xl flex items-center justify-center text-white font-bold text-lg">
              S
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-gray-900">Success House</h1>
              <p className="text-sm text-gray-600 -mt-1">of English</p>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="flex space-x-1">
            {currentNavItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  location.pathname === item.path
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <span className="hidden sm:inline">{item.icon} </span>
                {item.label}
              </Link>
            ))}
          </nav>

          {/* User Profile */}
          <div className="flex items-center space-x-3 relative group">
            <div className="w-8 h-8 bg-gradient-to-r from-accent-400 to-accent-600 rounded-full flex items-center justify-center text-white text-sm font-semibold cursor-pointer">
              {user?.name?.split(' ').map(n => n[0]).join('') || 'U'}
            </div>
            <div className="hidden md:block">
              <span className="text-sm text-gray-700">{user?.name}</span>
              <span className="block text-xs text-gray-500 capitalize">{userRole}</span>
            </div>
            
            {/* Dropdown Menu */}
            <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
              <div className="p-2">
                <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                  Profile Settings
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                  Preferences
                </button>
                <hr className="my-2 border-gray-200" />
                <button 
                  onClick={onLogout}
                  className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;