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
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Table Header */}
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Student Records ({students.length})</h3>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Student
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contact
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Course
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Level
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Progress
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Activity
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {students.map((student) => (
              <tr key={student.id} className="hover:bg-gray-50 transition-colors duration-200">
                {/* Student Info */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      {student.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">{student.name}</div>
                      <div className="text-sm text-gray-500">ID: {student.id}</div>
                    </div>
                  </div>
                </td>

                {/* Contact Info */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{student.email}</div>
                  <div className="text-sm text-gray-500">{student.phone}</div>
                </td>

                {/* Course */}
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900 max-w-xs">
                    {student.course}
                  </div>
                  <div className="text-sm text-gray-500">
                    Joined: {new Date(student.joinDate).toLocaleDateString()}
                  </div>
                </td>

                {/* Level */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getLevelColor(student.level)}`}>
                    {student.level}
                  </span>
                </td>

                {/* Progress */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-primary-500 to-primary-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${student.progress}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-700 min-w-[3rem]">{student.progress}%</span>
                  </div>
                </td>

                {/* Status */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(student.status)}`}>
                    {student.status}
                  </span>
                </td>

                {/* Last Activity */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {student.lastActivity}
                </td>

                {/* Actions */}
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => onEdit(student)}
                      className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors duration-200"
                      title="Edit Student"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => onDelete(student.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                      title="Delete Student"
                    >
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Table Footer */}
      <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>Showing {students.length} student{students.length !== 1 ? 's' : ''}</span>
          <div className="flex items-center space-x-2">
            <span>Sort by:</span>
            <select className="border border-gray-300 rounded px-2 py-1 text-sm">
              <option>Name</option>
              <option>Join Date</option>
              <option>Progress</option>
              <option>Status</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentList;