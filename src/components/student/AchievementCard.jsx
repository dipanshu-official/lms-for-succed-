import React from 'react';

function AchievementCard({ achievement }) {
  return (
    <div className={`p-4 rounded-xl border-2 transition-all duration-200 ${
      achievement.earned 
        ? 'border-green-200 bg-green-50 hover:border-green-300' 
        : 'border-gray-200 bg-gray-50 hover:border-gray-300'
    }`}>
      <div className="flex items-center space-x-3 mb-3">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl ${
          achievement.earned ? 'bg-green-100' : 'bg-gray-200'
        }`}>
          {achievement.earned ? achievement.icon : '🔒'}
        </div>
        <div className="flex-1">
          <h3 className={`font-semibold ${achievement.earned ? 'text-green-900' : 'text-gray-700'}`}>
            {achievement.title}
          </h3>
          <p className={`text-sm ${achievement.earned ? 'text-green-700' : 'text-gray-500'}`}>
            {achievement.description}
          </p>
        </div>
      </div>
      
      {achievement.earned ? (
        <div className="text-sm text-green-600 font-medium">
          Earned {achievement.date}
        </div>
      ) : (
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Progress</span>
            <span className="font-medium text-gray-700">{achievement.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-primary-500 to-primary-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${achievement.progress}%` }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AchievementCard;