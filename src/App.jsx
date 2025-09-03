import React, { useState } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import Login from './components/shared/Login';
import Header from './components/shared/Header';
import AdminSidebar from './components/admin/AdminSidebar';
import Dashboard from './pages/student/Dashboard';
import Courses from './pages/student/Courses';
import Progress from './pages/student/Progress';
import AdminDashboard from './pages/admin/AdminDashboard';
import StudentManagement from './pages/admin/StudentManagement';
import CourseManagement from './pages/admin/CourseManagement';
import PaymentManagement from './pages/admin/PaymentManagement';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = (userData, role) => {
    setUser(userData);
    setUserRole(role);
    toast.success(`Welcome back, ${userData.name}!`);
    
    // Navigate based on role
    if (role === 'admin') {
      navigate('/admin');
    } else {
      navigate('/dashboard');
    }
  };

  const handleLogout = () => {
    toast.success('Successfully logged out');
    setUser(null);
    setUserRole(null);
    navigate('/login');
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  // Show login page if user is not authenticated
  if (!user) {
    return (
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  // Protected routes based on user role
  const ProtectedRoute = ({ children, allowedRoles }) => {
    if (!allowedRoles.includes(userRole)) {
      return <Navigate to={userRole === 'admin' ? '/admin' : '/dashboard'} replace />;
    }
    return children;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header 
        user={user}
        userRole={userRole}
        onLogout={handleLogout}
        onToggleSidebar={toggleSidebar}
      />
      
      {/* Admin Layout with Sidebar */}
      {userRole === 'admin' ? (
        <div className="flex pt-16">
          <AdminSidebar isOpen={sidebarOpen} onClose={closeSidebar} />
          <main className="flex-1 lg:ml-0 px-4 sm:px-6 lg:px-8 py-6 animate-fade-in">
            <Routes>
              {/* Admin Routes */}
              <Route 
                path="/admin" 
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <AdminDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/students" 
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <StudentManagement />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/courses" 
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <CourseManagement />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/payments" 
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <PaymentManagement />
                  </ProtectedRoute>
                } 
              />
              
              {/* Default redirects */}
              <Route 
                path="/" 
                element={<Navigate to="/admin" replace />}
              />
              <Route 
                path="*" 
                element={<Navigate to="/admin" replace />}
              />
            </Routes>
          </main>
        </div>
      ) : (
        /* Student Layout */
        <main className="pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto animate-fade-in">
          <Routes>
            {/* Student Routes */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute allowedRoles={['student']}>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/courses" 
              element={
                <ProtectedRoute allowedRoles={['student']}>
                  <Courses />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/progress" 
              element={
                <ProtectedRoute allowedRoles={['student']}>
                  <Progress />
                </ProtectedRoute>
              } 
            />
            
            {/* Default redirects */}
            <Route 
              path="/" 
              element={<Navigate to="/dashboard" replace />}
            />
            <Route 
              path="*" 
              element={<Navigate to="/dashboard" replace />}
            />
          </Routes>
        </main>
      )}
    </div>
  );
}

export default App;