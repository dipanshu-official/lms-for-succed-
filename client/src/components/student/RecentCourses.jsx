import React from 'react';

function RecentCourses() {
  const courses = [
    {
      title: 'Business English Mastery',
      progress: 75,
      lesson: 'Lesson 12: Presentations',
      image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg'
    },
    {
      title: 'IELTS Preparation',
      progress: 45,
      lesson: 'Lesson 8: Writing Task 1',
      image: 'https://images.pexels.com/photos/4145153/pexels-photo-4145153.jpeg'
    },
    {
      title: 'Conversational English',
      progress: 90,
      lesson: 'Lesson 18: Advanced Topics',
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg'
    }
  ];

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg animate-slide-up">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Continue Learning</h2>
      <div className="space-y-4">
        {courses.map((course, index) => (
          <div key={index} className="flex items-center space-x-4 p-4 rounded-xl hover:bg-gray-50 transition-colors duration-200 cursor-pointer">
            <img 
              src={course.image} 
              alt={course.title}
              className="w-16 h-16 rounded-lg object-cover"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">{course.title}</h3>
              <p className="text-sm text-gray-600 mb-2">{course.lesson}</p>
              <div className="flex items-center space-x-2">
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-primary-500 to-primary-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-gray-700">{course.progress}%</span>
              </div>
            </div>
            <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200 text-sm font-medium">
              Continue
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentCourses;