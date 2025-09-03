import React, { useState } from 'react';

function CourseListAdmin({ courses, onEdit, onDelete, onDuplicate }) {
  const [expandedCourse, setExpandedCourse] = useState(null);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-700';
      case 'draft':
        return 'bg-yellow-100 text-yellow-700';
      case 'archived':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getLevelColor = (level) => {
    switch (level) {
      case 'Beginner':
        return 'bg-blue-100 text-blue-700';
      case 'Intermediate':
        return 'bg-orange-100 text-orange-700';
      case 'Advanced':
        return 'bg-purple-100 text-purple-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const toggleExpanded = (courseId) => {
    setExpandedCourse(expandedCourse === courseId ? null : courseId);
  };

  if (courses.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-12 shadow-lg text-center">
        <div className="text-6xl mb-4">📚</div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No Courses Found</h3>
        <p className="text-gray-600">No courses match your current search criteria.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {courses.map((course) => (
        <div key={course.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Course Header */}
          <div className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4 flex-1">
                <img 
                  src={course.image} 
                  alt={course.title}
                  className="w-20 h-20 rounded-xl object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{course.title}</h3>
                      <p className="text-gray-600 mb-3 line-clamp-2">{course.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>👨‍🏫 {course.instructor}</span>
                        <span>📅 {course.duration}</span>
                        <span>📚 {course.lessons} lessons</span>
                        <span>👥 {course.students} students</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getLevelColor(course.level)}`}>
                        {course.level}
                      </span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(course.status)}`}>
                        {course.status}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={i < Math.floor(course.rating) ? 'text-yellow-400' : 'text-gray-300'}>
                          ⭐
                        </span>
                      ))}
                      <span className="ml-2 text-sm font-medium text-gray-700">{course.rating}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xl font-bold text-primary-600">${course.price}</span>
                      <div className="flex items-center space-x-1">
                        <button
                          onClick={() => toggleExpanded(course.id)}
                          className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                          title="View Details"
                        >
                          {expandedCourse === course.id ? '🔼' : '🔽'}
                        </button>
                        <button
                          onClick={() => onDuplicate(course.id)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                          title="Duplicate Course"
                        >
                          📋
                        </button>
                        <button
                          onClick={() => onEdit(course)}
                          className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors duration-200"
                          title="Edit Course"
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => onDelete(course.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                          title="Delete Course"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Expanded Content */}
          {expandedCourse === course.id && (
            <div className="border-t border-gray-200 p-6 bg-gray-50">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Videos Section */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    🎥 Course Videos ({course.videos?.length || 0})
                  </h4>
                  {course.videos && course.videos.length > 0 ? (
                    <div className="space-y-3">
                      {course.videos.map((video) => (
                        <div key={video.id} className="bg-white p-4 rounded-xl border border-gray-200">
                          <div className="flex items-center justify-between">
                            <div>
                              <h5 className="font-medium text-gray-900">{video.title}</h5>
                              <p className="text-sm text-gray-500">Duration: {video.duration}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <button className="p-1 text-blue-600 hover:bg-blue-50 rounded">
                                ▶️
                              </button>
                              <button className="p-1 text-gray-600 hover:bg-gray-100 rounded">
                                ✏️
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <div className="text-4xl mb-2">🎥</div>
                      <p>No videos added yet</p>
                    </div>
                  )}
                </div>

                {/* Notes Section */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    📝 Course Notes ({course.notes?.length || 0})
                  </h4>
                  {course.notes && course.notes.length > 0 ? (
                    <div className="space-y-3">
                      {course.notes.map((note) => (
                        <div key={note.id} className="bg-white p-4 rounded-xl border border-gray-200">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h5 className="font-medium text-gray-900 mb-2">{note.title}</h5>
                              <p className="text-sm text-gray-600 line-clamp-2">{note.content}</p>
                            </div>
                            <div className="flex items-center space-x-2 ml-4">
                              <button className="p-1 text-blue-600 hover:bg-blue-50 rounded">
                                👁️
                              </button>
                              <button className="p-1 text-gray-600 hover:bg-gray-100 rounded">
                                ✏️
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <div className="text-4xl mb-2">📝</div>
                      <p>No notes added yet</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default CourseListAdmin;