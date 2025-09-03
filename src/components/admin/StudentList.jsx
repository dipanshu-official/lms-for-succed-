import React from 'react';

function StudentList({ students, onEdit, onDelete }) {
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-700';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'inactive':
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

  if (students.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-12 shadow-lg text-center">
        <div className="text-6xl mb-4">👥</div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No Students Found</h3>
        <p className="text-gray-600">No students match your current search criteria.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
        {students.map((student) => (
          <div key={student.id} className="bg-white border border-gray-200 rounded-xl p-6 hover:border-primary-300 hover:shadow-lg transition-all duration-200">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white font-semibold">
                  {student.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{student.name}</h3>
                  <p className="text-sm text-gray-600">{student.email}</p>
                  <p className="text-sm text-gray-500">{student.phone}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => onEdit(student)}
                  className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors duration-200"
                >
                  ✏️
                </button>
                <button
                  onClick={() => onDelete(student.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                >
                  🗑️
                </button>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Course:</span>
                <span className="text-sm font-medium text-gray-900">{student.course}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Level:</span>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getLevelColor(student.level)}`}>
                  {student.level}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Status:</span>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(student.status)}`}>
                  {student.status}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Progress:</span>
                <div className="flex items-center space-x-2">
                  <div className="w-16 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-primary-500 to-primary-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${student.progress}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-700">{student.progress}%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Last Activity:</span>
                <span className="text-sm text-gray-500">{student.lastActivity}</span>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default StudentList;