import React from 'react';
import ProgressChart from '../../components/student/ProgressChart';
import AchievementCard from '../../components/student/AchievementCard';

function Progress() {
  const achievements = [
    {
      title: 'First Course Completed',
      description: 'Completed your first English course',
      icon: '🎯',
      earned: true,
      date: '2 weeks ago'
    },
    {
      title: 'Grammar Master',
      description: 'Scored 95% or higher on 5 grammar tests',
      icon: '📝',
      earned: true,
      date: '1 week ago'
    },
    {
      title: 'Speaking Champion',
      description: 'Completed 10 speaking exercises with excellent scores',
      icon: '🗣️',
      earned: true,
      date: '3 days ago'
    },
    {
      title: 'Consistency Star',
      description: 'Study for 7 consecutive days',
      icon: '⭐',
      earned: false,
      progress: 85
    },
    {
      title: 'Vocabulary Virtuoso',
      description: 'Learn 500 new vocabulary words',
      icon: '📚',
      earned: false,
      progress: 60
    },
    {
      title: 'IELTS Ready',
      description: 'Complete IELTS preparation course with 90% score',
      icon: '🏆',
      earned: false,
      progress: 45
    }
  ];

  const weeklyProgress = [
    { day: 'Mon', hours: 2.5 },
    { day: 'Tue', hours: 1.8 },
    { day: 'Wed', hours: 3.2 },
    { day: 'Thu', hours: 2.1 },
    { day: 'Fri', hours: 4.0 },
    { day: 'Sat', hours: 1.5 },
    { day: 'Sun', hours: 2.8 }
  ];

  return (
    <div className="py-6 space-y-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Learning Progress</h1>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Weekly Study Time */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Weekly Study Time</h2>
          <ProgressChart data={weeklyProgress} />
        </div>

        {/* Overall Stats */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Overall Statistics</h2>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Overall Progress</span>
                <span className="text-sm font-bold text-primary-600">70%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-gradient-to-r from-primary-500 to-primary-600 h-3 rounded-full" style={{ width: '70%' }}></div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-xl">
                <p className="text-2xl font-bold text-blue-600">47</p>
                <p className="text-sm text-gray-600">Hours Studied</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-xl">
                <p className="text-2xl font-bold text-green-600">23</p>
                <p className="text-sm text-gray-600">Lessons Completed</p>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-xl">
                <p className="text-2xl font-bold text-orange-600">350</p>
                <p className="text-sm text-gray-600">Words Learned</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-xl">
                <p className="text-2xl font-bold text-purple-600">12</p>
                <p className="text-sm text-gray-600">Achievements</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Achievements & Badges</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements.map((achievement, index) => (
            <AchievementCard key={index} achievement={achievement} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Progress;