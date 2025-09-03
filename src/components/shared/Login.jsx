import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function Login({ onLogin }) {
  const [loginType, setLoginType] = useState('student');
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Demo credentials
  const demoCredentials = {
    student: {
      email: 'student@demo.com',
      password: 'student123',
      name: 'John Student'
    },
    admin: {
      email: 'admin@demo.com',
      password: 'admin123',
      name: 'Sarah Admin'
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const credentials = demoCredentials[loginType];
      
      if (formData.email === credentials.email && formData.password === credentials.password) {
        onLogin({
          name: credentials.name,
          email: formData.email,
          role: loginType
        }, loginType);
        toast.success(`Welcome back, ${credentials.name}!`);
        
        // Navigate based on role
        if (loginType === 'admin') {
          navigate('/admin');
        } else {
          navigate('/dashboard');
        }
      } else {
        toast.error('Invalid credentials. Please check your email and password.');
      }
      setIsLoading(false);
    }, 1000);
  };

  const fillDemoCredentials = () => {
    const credentials = demoCredentials[loginType];
    setFormData({
      email: credentials.email,
      password: credentials.password
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Brand */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-primary-600 to-primary-800 rounded-2xl flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4 shadow-lg">
            S
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Success House</h1>
          <p className="text-lg text-gray-600">of English</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 animate-scale-in">
          {/* Role Selection */}
          <div className="flex mb-6 bg-gray-100 rounded-xl p-1">
            <button
              type="button"
              onClick={() => setLoginType('student')}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
                loginType === 'student'
                  ? 'bg-white text-primary-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              👨‍🎓 Student
            </button>
            <button
              type="button"
              onClick={() => setLoginType('admin')}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
                loginType === 'admin'
                  ? 'bg-white text-primary-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              👨‍💼 Admin
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 text-gray-900"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 text-gray-900"
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white py-3 px-4 rounded-xl font-medium hover:from-primary-700 hover:to-primary-800 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Signing In...</span>
                </div>
              ) : (
                `Sign In as ${loginType === 'student' ? 'Student' : 'Admin'}`
              )}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-gray-50 rounded-xl">
            <p className="text-sm text-gray-600 mb-3">Demo Credentials:</p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-gray-700">
                  {loginType === 'student' ? 'Student' : 'Admin'}: {demoCredentials[loginType].email}
                </span>
                <button
                  type="button"
                  onClick={fillDemoCredentials}
                  className="text-primary-600 hover:text-primary-700 font-medium"
                >
                  Use Demo
                </button>
              </div>
              <p className="text-gray-500">Password: {demoCredentials[loginType].password}</p>
            </div>
            
            {/* Quick Demo Login Buttons */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600 mb-3">Quick Demo Login:</p>
              <div className="flex space-x-2">
                <button
                  type="button"
                  onClick={() => {
                    setLoginType('student');
                    setFormData({
                      email: demoCredentials.student.email,
                      password: demoCredentials.student.password
                    });
                    // Auto-submit after a short delay
                    setTimeout(() => {
                      onLogin({
                        name: demoCredentials.student.name,
                        email: demoCredentials.student.email,
                        role: 'student'
                      }, 'student');
                    }, 100);
                  }}
                  className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  👨‍🎓 Login as Student
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setLoginType('admin');
                    setFormData({
                      email: demoCredentials.admin.email,
                      password: demoCredentials.admin.password
                    });
                    // Auto-submit after a short delay
                    setTimeout(() => {
                      onLogin({
                        name: demoCredentials.admin.name,
                        email: demoCredentials.admin.email,
                        role: 'admin'
                      }, 'admin');
                    }, 100);
                  }}
                  className="flex-1 px-3 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors duration-200"
                >
                  👨‍💼 Login as Admin
                </button>
              </div>
            </div>
          </div>

          {/* Additional Links */}
          <div className="mt-6 text-center space-y-2">
            <a href="#" className="block text-sm text-primary-600 hover:text-primary-700 transition-colors duration-200">
              Forgot your password?
            </a>
            <p className="text-sm text-gray-600">
              Need help? <a href="#" className="text-primary-600 hover:text-primary-700">Contact Support</a>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-500">
          © 2025 Success House of English. All rights reserved.
        </div>
      </div>
    </div>
  );
}

export default Login;