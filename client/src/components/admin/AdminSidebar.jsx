import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function AdminSidebar({ isOpen, onClose }) {
  const location = useLocation();
  
  const navItems = [
    { 
      path: '/admin', 
      label: 'Dashboard', 
      icon: '📊',
      description: 'Overview & Analytics'
    },
    { 
      path: '/new-registration', 
      label: 'New Registration', 
      icon: '�',
      description: 'Register New Students'
    },
    { 
      path: '/admin/students', 
      label: 'Students', 
      icon: '👥',
      description: 'Manage Students'
    },
    { 
      path: '/admin/courses', 
      label: 'Courses', 
      icon: '📚',
      description: 'Course Management'
    },
    { 
      path: '/admin/payments', 
      label: 'Payments', 
      icon: '💳',
      description: 'Payment Records'
    },
    { 
      path: '/admin/reports', 
      label: 'Reports', 
      icon: '📈',
      description: 'Analytics & Reports'
    },
    { 
      path: '/admin/settings', 
      label: 'Settings', 
      icon: '⚙️',
      description: 'System Settings'
    }
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`fixed top-0 left-0 h-full w-72 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 lg:static lg:shadow-none lg:border-r lg:border-gray-200`}>
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10  bg-gradient-to-br from-primary-600 to-primary-800 rounded-xl flex items-center justify-center text-blue-600 font-bold text-lg">
              S
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">Success House</h1>
              <p className="text-sm text-gray-600 -mt-1">Admin Panel</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200 lg:hidden"
          >
            ✕
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2 ">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${
                location.pathname === item.path
                  ? 'bg-primary-600 text-blue-600 shadow-lg'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <div className="flex-1">
                <div className="font-semibold">{item.label}</div>
                <div className={`text-xs ${
                  location.pathname === item.path ? 'text-primary-100' : 'text-gray-500'
                }`}>
                  {item.description}
                </div>
              </div>
            </Link>
          ))}
        </nav>

        {/* Quick Stats */}
        <div className="p-4 mt-6">
          <div className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Quick Stats</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Active Students</span>
                <span className="font-semibold text-gray-900">1,247</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Total Courses</span>
                <span className="font-semibold text-gray-900">12</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Monthly Revenue</span>
                <span className="font-semibold text-green-600">$24,580</span>
              </div>
            </div>
          </div>
        </div>

        {/* Help Section */}
        <div className="p-4 mt-auto">
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-blue-600 text-sm">💡</span>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-900">Need Help?</h4>
                <p className="text-xs text-gray-600">Get support & tutorials</p>
              </div>
            </div>
            <button className="w-full px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminSidebar;