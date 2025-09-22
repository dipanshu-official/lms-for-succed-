import React, { useState, useEffect } from 'react';

function PaymentForm({ payment, onSubmit, onClose }) {
  const [formData, setFormData] = useState({
    studentName: '',
    studentEmail: '',
    course: '',
    amount: '',
    dueDate: '',
    paidDate: '',
    status: 'Due',
    paymentMethod: '',
    transactionId: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const courses = [
    'Business English Mastery',
    'IELTS Preparation',
    'Conversational English',
    'Grammar Fundamentals',
    'Academic Writing Skills',
    'English Pronunciation Mastery'
  ];

  const statuses = ['Paid', 'Due', 'Overdue', 'Late Payment'];
  const paymentMethods = ['Credit Card', 'PayPal', 'Bank Transfer', 'Cash', 'Manual Entry'];

  useEffect(() => {
    if (payment) {
      setFormData({
        studentName: payment.studentName,
        studentEmail: payment.studentEmail,
        course: payment.course,
        amount: payment.amount.toString(),
        dueDate: payment.dueDate,
        paidDate: payment.paidDate || '',
        status: payment.status,
        paymentMethod: payment.paymentMethod || '',
        transactionId: payment.transactionId || ''
      });
    }
  }, [payment]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.studentName.trim()) {
      newErrors.studentName = 'Student name is required';
    }

    if (!formData.studentEmail.trim()) {
      newErrors.studentEmail = 'Student email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.studentEmail)) {
      newErrors.studentEmail = 'Email is invalid';
    }

    if (!formData.course) {
      newErrors.course = 'Course selection is required';
    }

    if (!formData.amount || formData.amount <= 0) {
      newErrors.amount = 'Amount must be greater than 0';
    }

    if (!formData.dueDate) {
      newErrors.dueDate = 'Due date is required';
    }

    if (formData.status === 'Paid' && !formData.paidDate) {
      newErrors.paidDate = 'Paid date is required when status is Paid';
    }

    if (formData.status === 'Paid' && !formData.paymentMethod) {
      newErrors.paymentMethod = 'Payment method is required when status is Paid';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const submitData = {
        ...formData,
        amount: parseFloat(formData.amount)
      };
      onSubmit(submitData);
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">
            {payment ? 'Edit Payment Record' : 'Add New Payment Record'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Student Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
              Student Information
            </h3>
            
            <div>
              <label htmlFor="studentName" className="block text-sm font-medium text-gray-700 mb-2">
                Student Name *
              </label>
              <input
                type="text"
                id="studentName"
                name="studentName"
                value={formData.studentName}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 ${
                  errors.studentName ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Enter student's full name"
              />
              {errors.studentName && <p className="mt-1 text-sm text-red-600">{errors.studentName}</p>}
            </div>

            <div>
              <label htmlFor="studentEmail" className="block text-sm font-medium text-gray-700 mb-2">
                Student Email *
              </label>
              <input
                type="email"
                id="studentEmail"
                name="studentEmail"
                value={formData.studentEmail}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 ${
                  errors.studentEmail ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Enter student's email address"
              />
              {errors.studentEmail && <p className="mt-1 text-sm text-red-600">{errors.studentEmail}</p>}
            </div>
          </div>

          {/* Course and Payment Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
              Course & Payment Details
            </h3>
            
            <div>
              <label htmlFor="course" className="block text-sm font-medium text-gray-700 mb-2">
                Course *
              </label>
              <select
                id="course"
                name="course"
                value={formData.course}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 ${
                  errors.course ? 'border-red-300' : 'border-gray-300'
                }`}
              >
                <option value="">Select a course</option>
                {courses.map((course) => (
                  <option key={course} value={course}>{course}</option>
                ))}
              </select>
              {errors.course && <p className="mt-1 text-sm text-red-600">{errors.course}</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
                  Amount (USD) *
                </label>
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  value={formData.amount}
                  onChange={handleInputChange}
                  min="0"
                  step="0.01"
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 ${
                    errors.amount ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Enter payment amount"
                />
                {errors.amount && <p className="mt-1 text-sm text-red-600">{errors.amount}</p>}
              </div>

              <div>
                <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-2">
                  Due Date *
                </label>
                <input
                  type="date"
                  id="dueDate"
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 ${
                    errors.dueDate ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
                {errors.dueDate && <p className="mt-1 text-sm text-red-600">{errors.dueDate}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                  Payment Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                >
                  {statuses.map((status) => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="paidDate" className="block text-sm font-medium text-gray-700 mb-2">
                  Paid Date {formData.status === 'Paid' && '*'}
                </label>
                <input
                  type="date"
                  id="paidDate"
                  name="paidDate"
                  value={formData.paidDate}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 ${
                    errors.paidDate ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
                {errors.paidDate && <p className="mt-1 text-sm text-red-600">{errors.paidDate}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700 mb-2">
                  Payment Method {formData.status === 'Paid' && '*'}
                </label>
                <select
                  id="paymentMethod"
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 ${
                    errors.paymentMethod ? 'border-red-300' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select payment method</option>
                  {paymentMethods.map((method) => (
                    <option key={method} value={method}>{method}</option>
                  ))}
                </select>
                {errors.paymentMethod && <p className="mt-1 text-sm text-red-600">{errors.paymentMethod}</p>}
              </div>

              <div>
                <label htmlFor="transactionId" className="block text-sm font-medium text-gray-700 mb-2">
                  Transaction ID
                </label>
                <input
                  type="text"
                  id="transactionId"
                  name="transactionId"
                  value={formData.transactionId}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter transaction ID (optional)"
                />
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors duration-200 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>{payment ? 'Updating...' : 'Creating...'}</span>
                </>
              ) : (
                <span>{payment ? 'Update Payment' : 'Create Payment Record'}</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PaymentForm;