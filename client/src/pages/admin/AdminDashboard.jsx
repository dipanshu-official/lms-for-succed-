import React from 'react';
import { Link } from 'react-router-dom';
import StatsCard from '../../components/StatsCard';

function AdminDashboard() {
  const adminStats = [
    {
      title: 'Total Students',
      value: '1,247',
      icon: '👥',
      color: 'from-blue-500 to-blue-600',
      change: '+23 this week'
    },
    {
      title: 'Active Courses',
      value: '12',
      icon: '📚',
      color: 'from-green-500 to-green-600',
      change: '+2 this month'
    },
    {
      title: 'Revenue',
      value: '$24,580',
      icon: '💰',
      color: 'from-orange-500 to-orange-600',
      change: '+15% this month'
    },
    {
      title: 'Completion Rate',
      value: '87%',
      icon: '📊',
      color: 'from-purple-500 to-purple-600',
      change: '+5% improvement'
    }
  ];

  const recentStudents = [
    { name: 'Alice Johnson', course: 'Business English', joined: '2 days ago', status: 'Active' },
    { name: 'Mike Chen', course: 'IELTS Prep', joined: '1 week ago', status: 'Active' },
    { name: 'Sarah Williams', course: 'Conversation', joined: '3 days ago', status: 'Pending' },
    { name: 'David Brown', course: 'Grammar Fundamentals', joined: '5 days ago', status: 'Active' }
  ];

  return (
    <div className="py-6 space-y-8">
      {/* Admin Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">Manage your English learning platform</p>
        </div>
        <div className="flex items-center space-x-3 w-40">
          <Link 
            to="/admin/courses"
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200 inline-block"
          >
            Manage Courses
          </Link>
          <Link 
            to="/admin/students"
            className="px-4 py-2 bg-accent-600 text-white rounded-lg hover:bg-accent-700 transition-colors duration-200 inline-block"
          >
            Manage Students
          </Link>
          <Link 
            to="/admin/payments"
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 inline-block"
          >
            Manage Payments
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {adminStats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Students */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Recent Students</h2>
            <Link 
              to="/admin/students"
              className="text-primary-600 hover:text-primary-700 text-sm font-medium"
            >
              View All
            </Link>
          </div>
          <div className="space-y-4">
            {recentStudents.slice(0, 4).map((student, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition-colors duration-200">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {student.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{student.name}</h3>
                    <p className="text-sm text-gray-600">{student.course}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    student.status === 'Active' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {student.status}
                  </span>
                  <p className="text-sm text-gray-500 mt-1">{student.joined}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
          <div className="space-y-3">
            <Link 
              to="/admin/students"
              className="block w-full p-4 text-left rounded-xl border border-gray-200 hover:border-primary-300 hover:bg-primary-50 transition-all duration-200"
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl">👥</span>
                <div>
                  <h3 className="font-semibold text-gray-900">Manage Students</h3>
                  <p className="text-sm text-gray-600">Add, edit, or remove students</p>
                </div>
              </div>
            </Link>
            <Link 
              to="/admin/courses"
              className="block w-full p-4 text-left rounded-xl border border-gray-200 hover:border-primary-300 hover:bg-primary-50 transition-all duration-200"
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl">📚</span>
                <div>
                  <h3 className="font-semibold text-gray-900">Manage Courses</h3>
                  <p className="text-sm text-gray-600">Create and edit courses</p>
                </div>
              </div>
            </Link>
            <button className="w-full p-4 text-left rounded-xl border border-gray-200 hover:border-primary-300 hover:bg-primary-50 transition-all duration-200">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">💳</span>
                <div>
                  <h3 className="font-semibold text-gray-900">Payment Records</h3>
                  <p className="text-sm text-gray-600">Track student payments</p>
                </div>
              </div>
            </button>
            <Link 
              to="/admin/payments"
              className="block w-full p-4 text-left rounded-xl border border-gray-200 hover:border-primary-300 hover:bg-primary-50 transition-all duration-200"
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl">💰</span>
                <div>
                  <h3 className="font-semibold text-gray-900">Manage Payments</h3>
                  <p className="text-sm text-gray-600">View payment history and dues</p>
                </div>
              </div>
            </Link>
            <button className="w-full p-4 text-left rounded-xl border border-gray-200 hover:border-primary-300 hover:bg-primary-50 transition-all duration-200">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">📊</span>
                <div>
                  <h3 className="font-semibold text-gray-900">View Reports</h3>
                  <p className="text-sm text-gray-600">Student progress analytics</p>
                </div>
              </div>
            </button>
            <button className="w-full p-4 text-left rounded-xl border border-gray-200 hover:border-primary-300 hover:bg-primary-50 transition-all duration-200">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">💬</span>
                <div>
                  <h3 className="font-semibold text-gray-900">Send Message</h3>
                  <p className="text-sm text-gray-600">Communicate with students</p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;