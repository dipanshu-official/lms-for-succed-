import React, { useState, useEffect } from 'react';

function StudentLogin({ onLogin }) {
  const [step, setStep] = useState('email'); // 'email' or 'otp'
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [error, setError] = useState('');


  // Demo student data
  const validEmails = [
    'student1@demo.com',
    'student2@demo.com',
    'john.student@demo.com',
    'jane.student@demo.com'
  ];

  // Countdown timer for resend OTP
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      if (!validEmails.includes(email.toLowerCase())) {
        setError('Email not found. Please check your email address.');
        setIsLoading(false);
        return;
      }

      // Generate and "send" OTP
      const newOtp = generateOTP();
      setGeneratedOtp(newOtp);
      setStep('otp');
      setCountdown(60);
      setIsLoading(false);
      
      // In a real app, this would be sent via email/SMS
      console.log('Generated OTP:', newOtp);
    }, 1000);
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      if (otp !== generatedOtp) {
        setError('Invalid OTP. Please check and try again.');
        setIsLoading(false);
        return;
      }

      // Successful login
      const studentName = email.split('@')[0].replace('.', ' ').split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
      
      onLogin({
        name: studentName,
        email: email,
        role: 'student'
      }, 'student');
      
      setIsLoading(false);
      // In a real app, you'd navigate to dashboard here
      alert('Login successful! Welcome to the dashboard.');
    }, 1000);
  };

  const resendOtp = () => {
    if (countdown > 0) return;
    
    const newOtp = generateOTP();
    setGeneratedOtp(newOtp);
    setCountdown(60);
    setOtp('');
    setError('');
    
    // In a real app, this would send a new OTP
    console.log('New OTP:', newOtp);
  };

  const goBackToEmail = () => {
    setStep('email');
    setOtp('');
    setGeneratedOtp('');
    setError('');
    setCountdown(0);
  };

  const fillDemoEmail = () => {
    setEmail('john.student@demo.com');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Brand */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4 shadow-lg">
            S
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Student Login</h1>
          <p className="text-lg text-gray-600">Succeed House of English</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {step === 'email' ? (
            // Email Step
            <>
              <div className="text-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Welcome Back!</h2>
                <p className="text-gray-600">Enter your email to receive an OTP</p>
              </div>

              <div onSubmit={handleEmailSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    📧 Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900"
                    placeholder="Enter your registered email"
                  />
                </div>

                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-600">⚠️ {error}</p>
                  </div>
                )}

                <button
                  type="button"
                  onClick={handleEmailSubmit}
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-xl font-medium hover:from-blue-700 hover:to-blue-800 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Sending OTP...</span>
                    </div>
                  ) : (
                    '📨 Send OTP'
                  )}
                </button>
              </div>

              {/* Demo Section */}
              <div className="mt-6 p-4 bg-gray-50 rounded-xl">
                <p className="text-sm text-gray-600 mb-3">🎯 Demo Mode:</p>
                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={fillDemoEmail}
                    className="w-full text-left px-3 py-2 text-sm bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors duration-200"
                  >
                    👨‍🎓 john.student@demo.com
                  </button>
                  <p className="text-xs text-gray-500">
                    💡 Click to use demo email, then check console for OTP
                  </p>
                </div>
              </div>
            </>
          ) : (
            // OTP Step
            <>
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📱</span>
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Verify OTP</h2>
                <p className="text-gray-600">
                  We've sent a 6-digit code to<br />
                  <span className="font-medium text-gray-900">{email}</span>
                </p>
              </div>

              <div onSubmit={handleOtpSubmit} className="space-y-6">
                <div>
                  <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-2">
                    🔢 Enter OTP
                  </label>
                  <input
                    type="text"
                    id="otp"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 text-center text-lg font-mono tracking-widest"
                    placeholder="000000"
                    maxLength="6"
                  />
                </div>

                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-600">⚠️ {error}</p>
                  </div>
                )}

                <button
                  type="button"
                  onClick={handleOtpSubmit}
                  disabled={isLoading || otp.length !== 6}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-xl font-medium hover:from-blue-700 hover:to-blue-800 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Verifying...</span>
                    </div>
                  ) : (
                    '✅ Verify & Login'
                  )}
                </button>
              </div>

              {/* Demo OTP Display */}
              <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-800">
                  🔑 <strong>Demo OTP:</strong> <span className="font-mono bg-yellow-100 px-2 py-1 rounded">{generatedOtp}</span>
                </p>
              </div>

              {/* Resend OTP */}
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600 mb-2">Didn't receive the code?</p>
                {countdown > 0 ? (
                  <p className="text-sm text-gray-500">
                    Resend in {countdown} seconds
                  </p>
                ) : (
                  <button
                    type="button"
                    onClick={resendOtp}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
                  >
                    📤 Resend OTP
                  </button>
                )}
              </div>

              {/* Back Button */}
              <div className="mt-4 text-center">
                <button
                  type="button"
                  onClick={goBackToEmail}
                  className="text-sm text-gray-600 hover:text-gray-700 transition-colors duration-200"
                >
                  ← Change email address
                </button>
              </div>
            </>
          )}

          {/* Additional Links */}
          <div className="mt-6 text-center space-y-2">
            <p className="text-sm text-gray-600">
              Need help? <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">Contact Support</a>
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

export default StudentLogin;