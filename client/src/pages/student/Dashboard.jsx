import React from 'react';
import StatsCard from '../../components/StatsCard';
import RecentCourses from '../../components/student/RecentCourses';
import UpcomingLessons from '../../components/student/UpcomingLessons';

function Dashboard() {
  const stats = [
    {
      title: 'Courses Enrolled',
      value: '4',
      icon: '📚',
      color: 'from-blue-500 to-blue-600',
      change: '+1 this month'
    },
    {
      title: 'Lessons Completed',
      value: '23',
      icon: '✅',
      color: 'from-green-500 to-green-600',
      change: '+5 this week'
    },
    {
      title: 'Study Hours',
      value: '47',
      icon: '⏰',
      color: 'from-orange-500 to-orange-600',
      change: '+8 this week'
    },
    {
      title: 'Achievements',
      value: '12',
      icon: '🏆',
      color: 'from-purple-500 to-purple-600',
      change: '+2 this month'
    }
  ];

  return (
    <div className="py-6 space-y-8">
      {/* Welcome Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome back! 👋
        </h1>
        <p className="text-xl text-gray-600">
          Continue your English learning journey with Success House
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <RecentCourses />
        <UpcomingLessons />
      </div>
    </div>
  );
}

export default Dashboard;