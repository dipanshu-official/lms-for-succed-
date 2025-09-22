import React, { useState } from 'react';
import toast from 'react-hot-toast';
import CourseForm from '../../components/admin/CourseForm';
import CourseListAdmin from '../../components/admin/CourseListAdmin';

function CourseManagement() {
  const [courses, setCourses] = useState([
    {
      id: 1,
      title: 'Business English Mastery',
      description: 'Master professional English communication for the corporate world',
      level: 'Intermediate',
      duration: '8 weeks',
      lessons: 24,
      students: 1250,
      rating: 4.8,
      price: 199,
      image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg',
      status: 'Active',
      category: 'Business',
      instructor: 'Dr. Sarah Johnson',
      createdDate: '2024-01-15',
      videos: [
        { id: 1, title: 'Introduction to Business English', url: 'https://example.com/video1', duration: '15:30' },
        { id: 2, title: 'Email Communication', url: 'https://example.com/video2', duration: '22:45' }
      ],
      notes: [
        { id: 1, title: 'Business Vocabulary List', content: 'Essential business terms and phrases for professional communication...' },
        { id: 2, title: 'Email Templates', content: 'Professional email templates for various business scenarios...' }
      ]
    },
    {
      id: 2,
      title: 'IELTS Preparation Course',
      description: 'Comprehensive preparation for all IELTS test sections',
      level: 'Advanced',
      duration: '12 weeks',
      lessons: 36,
      students: 890,
      rating: 4.9,
      price: 299,
      image: 'https://images.pexels.com/photos/4145153/pexels-photo-4145153.jpeg',
      status: 'Active',
      category: 'Test Preparation',
      instructor: 'Prof. Michael Brown',
      createdDate: '2024-01-10',
      videos: [
        { id: 1, title: 'IELTS Overview', url: 'https://example.com/video3', duration: '18:20' },
        { id: 2, title: 'Reading Strategies', url: 'https://example.com/video4', duration: '25:15' }
      ],
      notes: [
        { id: 1, title: 'IELTS Band Descriptors', content: 'Understanding the IELTS scoring system and band requirements...' },
        { id: 2, title: 'Writing Task 1 Guide', content: 'Complete guide to IELTS Academic Writing Task 1...' }
      ]
    },
    {
      id: 3,
      title: 'Conversational English',
      description: 'Improve fluency and confidence in everyday conversations',
      level: 'Beginner',
      duration: '6 weeks',
      lessons: 18,
      students: 2100,
      rating: 4.7,
      price: 149,
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg',
      status: 'Active',
      category: 'Speaking',
      instructor: 'Emma Wilson',
      createdDate: '2024-01-20',
      videos: [
        { id: 1, title: 'Basic Greetings', url: 'https://example.com/video5', duration: '12:30' },
        { id: 2, title: 'Daily Conversations', url: 'https://example.com/video6', duration: '20:45' }
      ],
      notes: [
        { id: 1, title: 'Common Phrases', content: 'Essential phrases for daily English conversations...' },
        { id: 2, title: 'Pronunciation Tips', content: 'Key pronunciation rules for clear communication...' }
      ]
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterLevel, setFilterLevel] = useState('all');

  const handleAddCourse = (courseData) => {
    const newCourse = {
      ...courseData,
      id: Math.max(...courses.map(c => c.id)) + 1,
      students: 0,
      rating: 0,
      createdDate: new Date().toISOString().split('T')[0],
      videos: courseData.videos || [],
      notes: courseData.notes || []
    };
    setCourses([...courses, newCourse]);
    setShowForm(false);
    toast.success(`Course "${courseData.title}" has been created successfully!`);
  };

  const handleEditCourse = (courseData) => {
    setCourses(courses.map(course => 
      course.id === editingCourse.id 
        ? { ...course, ...courseData }
        : course
    ));
    setEditingCourse(null);
    setShowForm(false);
    toast.success(`Course "${courseData.title}" has been updated successfully!`);
  };

  const handleDeleteCourse = (courseId) => {
    const course = courses.find(c => c.id === courseId);
    if (window.confirm(`Are you sure you want to delete "${course.title}"? This action cannot be undone and will affect ${course.students} enrolled students.`)) {
      setCourses(courses.filter(course => course.id !== courseId));
      toast.success(`Course "${course.title}" has been deleted successfully!`);
    }
  };

  const handleDuplicateCourse = (courseId) => {
    const course = courses.find(c => c.id === courseId);
    const duplicatedCourse = {
      ...course,
      id: Math.max(...courses.map(c => c.id)) + 1,
      title: `${course.title} (Copy)`,
      students: 0,
      rating: 0,
      createdDate: new Date().toISOString().split('T')[0]
    };
    setCourses([...courses, duplicatedCourse]);
    toast.success(`Course "${course.title}" has been duplicated successfully!`);
  };

  const openEditForm = (course) => {
    setEditingCourse(course);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingCourse(null);
  };

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || course.status.toLowerCase() === filterStatus;
    const matchesLevel = filterLevel === 'all' || course.level.toLowerCase() === filterLevel;
    
    return matchesSearch && matchesStatus && matchesLevel;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Course Management</h2>
          <p className="text-gray-600">Create and manage courses, videos, and learning materials</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="px-6 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors duration-200 font-medium flex items-center space-x-2"
        >
          <span>➕</span>
          <span>Create New Course</span>
        </button>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search courses by title, description, or instructor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
            />
          </div>
          <div className="flex gap-4">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="draft">Draft</option>
              <option value="archived">Archived</option>
            </select>
            <select
              value={filterLevel}
              onChange={(e) => setFilterLevel(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
            >
              <option value="all">All Levels</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
        </div>
      </div>

      {/* Course Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <span className="text-blue-600 text-xl">📚</span>
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Courses</p>
              <p className="text-2xl font-bold text-gray-900">{courses.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <span className="text-green-600 text-xl">✅</span>
            </div>
            <div>
              <p className="text-sm text-gray-600">Active Courses</p>
              <p className="text-2xl font-bold text-gray-900">{courses.filter(c => c.status === 'Active').length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <span className="text-orange-600 text-xl">🎥</span>
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Videos</p>
              <p className="text-2xl font-bold text-gray-900">{courses.reduce((acc, course) => acc + (course.videos?.length || 0), 0)}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <span className="text-purple-600 text-xl">👥</span>
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Enrollments</p>
              <p className="text-2xl font-bold text-gray-900">{courses.reduce((acc, course) => acc + course.students, 0)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Course List */}
      <CourseListAdmin 
        courses={filteredCourses}
        onEdit={openEditForm}
        onDelete={handleDeleteCourse}
        onDuplicate={handleDuplicateCourse}
      />

      {/* Course Form Modal */}
      {showForm && (
        <CourseForm
          course={editingCourse}
          onSubmit={editingCourse ? handleEditCourse : handleAddCourse}
          onClose={closeForm}
        />
      )}
    </div>
  );
}

export default CourseManagement;