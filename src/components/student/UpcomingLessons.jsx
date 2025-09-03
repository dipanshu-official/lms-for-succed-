import React from 'react';

function UpcomingLessons() {
  const lessons = [
    {
      title: 'Grammar: Present Perfect Tense',
      course: 'Business English Mastery',
      time: '2:00 PM Today',
      duration: '45 min',
      type: 'Live Session'
    },
    {
      title: 'Speaking Practice: Job Interviews',
      course: 'IELTS Preparation',
      time: '10:00 AM Tomorrow',
      duration: '60 min',
      type: 'Workshop'
    },
    {
      title: 'Writing: Formal Emails',
      course: 'Business English Mastery',
      time: '3:00 PM Tomorrow',
      duration: '30 min',
      type: 'Self-paced'
    },
    {
      title: 'Vocabulary: Academic Words',
      course: 'IELTS Preparation',
      time: 'Thu, 2:00 PM',
      duration: '40 min',
      type: 'Live Session'
    }
  ];

  const getTypeColor = (type) => {
    switch (type) {
      case 'Live Session':
        return 'bg-red-100 text-red-700';
      case 'Workshop':
        return 'bg-blue-100 text-blue-700';
      case 'Self-paced':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg animate-slide-up">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Upcoming Lessons</h2>
      <div className="space-y-4">
        {lessons.map((lesson, index) => (
          <div key={index} className="border border-gray-200 rounded-xl p-4 hover:border-primary-300 transition-colors duration-200">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">{lesson.title}</h3>
                <p className="text-sm text-gray-600">{lesson.course}</p>
              </div>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(lesson.type)}`}>
                {lesson.type}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span>🕒 {lesson.time}</span>
                <span>⏱️ {lesson.duration}</span>
              </div>
              <button className="px-3 py-1 text-sm font-medium text-primary-600 hover:bg-primary-50 rounded-lg transition-colors duration-200">
                Join
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UpcomingLessons;