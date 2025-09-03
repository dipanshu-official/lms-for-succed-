import React from 'react';
import toast from 'react-hot-toast';
import CourseCard from '../../components/student/CourseCard';

function Courses() {
  const courses = [
    {
      id: 1,
      title: 'Business English Mastery',
      description: 'Master professional English communication for the corporate world',
      level: 'Intermediate',
      duration: '8 weeks',
      lessons: 24,
      students: 1250,
      rating: 4.8,
      price: '$199',
      image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg',
      enrolled: true,
      progress: 75
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
      price: '$299',
      image: 'https://images.pexels.com/photos/4145153/pexels-photo-4145153.jpeg',
      enrolled: true,
      progress: 45
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
      price: '$149',
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg',
      enrolled: true,
      progress: 90
    },
    {
      id: 4,
      title: 'English Grammar Fundamentals',
      description: 'Build a strong foundation in English grammar rules and usage',
      level: 'Beginner',
      duration: '10 weeks',
      lessons: 30,
      students: 1650,
      rating: 4.6,
      price: '$179',
      image: 'https://images.pexels.com/photos/4144923/pexels-photo-4144923.jpeg',
      enrolled: false,
      progress: 0
    },
    {
      id: 5,
      title: 'Academic Writing Skills',
      description: 'Develop advanced writing skills for academic and professional success',
      level: 'Advanced',
      duration: '8 weeks',
      lessons: 24,
      students: 720,
      rating: 4.8,
      price: '$249',
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg',
      enrolled: false,
      progress: 0
    },
    {
      id: 6,
      title: 'English Pronunciation Mastery',
      description: 'Perfect your English pronunciation and accent reduction',
      level: 'Intermediate',
      duration: '6 weeks',
      lessons: 18,
      students: 950,
      rating: 4.7,
      price: '$189',
      image: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg',
      enrolled: false,
      progress: 0
    }
  ];

  const enrolledCourses = courses.filter(course => course.enrolled);
  const availableCourses = courses.filter(course => !course.enrolled);

  const handleEnroll = (courseTitle) => {
    toast.success(`Successfully enrolled in ${courseTitle}!`);
  };

  const handleContinue = (courseTitle) => {
    toast.success(`Continuing ${courseTitle}...`);
  };

  return (
    <div className="py-6 space-y-8">
      {/* My Courses Section */}
      <section>
        <h1 className="text-3xl font-bold text-gray-900 mb-6">My Courses</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {enrolledCourses.map(course => (
            <CourseCard key={course.id} course={course} onAction={handleContinue} />
          ))}
        </div>
      </section>

      {/* Available Courses Section */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Discover New Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {availableCourses.map(course => (
            <CourseCard key={course.id} course={course} onAction={handleEnroll} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Courses;