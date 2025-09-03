import React, { useState } from 'react';
import toast from 'react-hot-toast';
import StudentForm from '../../components/admin/StudentForm';
import StudentList from '../../components/admin/StudentList';

function StudentManagement() {
  const [students, setStudents] = useState([
    {
      id: 1,
      name: 'Alice Johnson',
      email: 'alice.johnson@email.com',
      phone: '+1 (555) 123-4567',
      course: 'Business English Mastery',
      level: 'Intermediate',
      joinDate: '2024-01-15',
      status: 'Active',
      progress: 75,
      lastActivity: '2 hours ago'
    },
    {
      id: 2,
      name: 'Mike Chen',
      email: 'mike.chen@email.com',
      phone: '+1 (555) 234-5678',
      course: 'IELTS Preparation',
      level: 'Advanced',
      joinDate: '2024-01-10',
      status: 'Active',
      progress: 45,
      lastActivity: '1 day ago'
    },
    {
      id: 3,
      name: 'Sarah Williams',
      email: 'sarah.williams@email.com',
      phone: '+1 (555) 345-6789',
      course: 'Conversational English',
      level: 'Beginner',
      joinDate: '2024-01-20',
      status: 'Pending',
      progress: 0,
      lastActivity: 'Never'
    },
    {
      id: 4,
      name: 'David Brown',
      email: 'david.brown@email.com',
      phone: '+1 (555) 456-7890',
      course: 'Grammar Fundamentals',
      level: 'Beginner',
      joinDate: '2024-01-12',
      status: 'Active',
      progress: 30,
      lastActivity: '3 hours ago'
    },
    {
      id: 5,
      name: 'Emma Davis',
      email: 'emma.davis@email.com',
      phone: '+1 (555) 567-8901',
      course: 'Academic Writing',
      level: 'Advanced',
      joinDate: '2024-01-18',
      status: 'Inactive',
      progress: 60,
      lastActivity: '1 week ago'
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const handleAddStudent = (studentData) => {
    const newStudent = {
      ...studentData,
      id: Math.max(...students.map(s => s.id)) + 1,
      joinDate: new Date().toISOString().split('T')[0],
      progress: 0,
      lastActivity: 'Never'
    };
    setStudents([...students, newStudent]);
    setShowForm(false);
    toast.success(`Student ${studentData.name} has been added successfully!`);
  };

  const handleEditStudent = (studentData) => {
    setStudents(students.map(student => 
      student.id === editingStudent.id 
        ? { ...student, ...studentData }
        : student
    ));
    setEditingStudent(null);
    setShowForm(false);
    toast.success(`Student ${studentData.name} has been updated successfully!`);
  };

  const handleDeleteStudent = (studentId) => {
    const student = students.find(s => s.id === studentId);
    if (window.confirm(`Are you sure you want to delete ${student.name}? This action cannot be undone.`)) {
      setStudents(students.filter(student => student.id !== studentId));
      toast.success(`Student ${student.name} has been deleted successfully!`);
    }
  };

  const openEditForm = (student) => {
    setEditingStudent(student);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingStudent(null);
  };

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.course.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' || student.status.toLowerCase() === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Student Management</h2>
          <p className="text-gray-600">Manage all student accounts and enrollments</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="px-6 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors duration-200 font-medium flex items-center space-x-2"
        >
          <span>➕</span>
          <span>Add New Student</span>
        </button>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search students by name, email, or course..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
            />
          </div>
          <div className="sm:w-48">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      {/* Student List */}
      <StudentList 
        students={filteredStudents}
        onEdit={openEditForm}
        onDelete={handleDeleteStudent}
      />

      {/* Student Form Modal */}
      {showForm && (
        <StudentForm
          student={editingStudent}
          onSubmit={editingStudent ? handleEditStudent : handleAddStudent}
          onClose={closeForm}
        />
      )}
    </div>
  );
}

export default StudentManagement;