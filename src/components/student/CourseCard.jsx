import React from 'react';

function CourseCard({ course, onAction }) {
  const getLevelColor = (level) => {
    switch (level) {
      case 'Beginner':
        return 'bg-green-100 text-green-700';
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-700';
      case 'Advanced':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden animate-scale-in">
      {/* Course Image */}
      <div className="relative">
        <img 
          src={course.image} 
          alt={course.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 right-4">
          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getLevelColor(course.level)}`}>
            {course.level}
          </span>
        </div>
        {course.enrolled && (
          <div className="absolute bottom-4 left-4 right-4">
            <div className="bg-white/90 backdrop-blur-sm rounded-lg p-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">Progress</span>
                <span className="font-bold">{course.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                <div 
                  className="bg-gradient-to-r from-primary-500 to-primary-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${course.progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Course Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{course.title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{course.description}</p>
        
        {/* Course Stats */}
        <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
          <span>📅 {course.duration}</span>
          <span>📚 {course.lessons} lessons</span>
          <span>👥 {course.students}</span>
        </div>

        {/* Rating */}
        <div className="flex items-center space-x-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <span key={i} className={i < Math.floor(course.rating) ? 'text-yellow-400' : 'text-gray-300'}>
              ⭐
            </span>
          ))}
          <span className="ml-2 text-sm font-medium text-gray-700">{course.rating}</span>
        </div>

        {/* Action Button */}
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-primary-600">{course.price}</span>
          <button 
            onClick={() => onAction && onAction(course.title)}
            className={`px-6 py-2 rounded-lg font-medium transition-colors duration-200 ${
            course.enrolled 
              ? 'bg-green-600 text-white hover:bg-green-700' 
              : 'bg-primary-600 text-white hover:bg-primary-700'
          }`}
          >
            {course.enrolled ? 'Continue' : 'Enroll Now'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CourseCard;