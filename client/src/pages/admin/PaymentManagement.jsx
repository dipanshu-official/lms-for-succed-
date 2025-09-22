import React, { useState } from 'react';
import toast from 'react-hot-toast';
import PaymentList from '../../components/admin/PaymentList';
import PaymentForm from '../../components/admin/PaymentForm';

function PaymentManagement() {
  const [payments, setPayments] = useState([
    {
      id: 1,
      studentName: 'Alice Johnson',
      studentEmail: 'alice.johnson@email.com',
      course: 'Business English Mastery',
      amount: 199,
      dueDate: '2025-01-15',
      paidDate: '2025-01-10',
      status: 'Paid',
      paymentMethod: 'Credit Card',
      transactionId: 'TXN001234567'
    },
    {
      id: 2,
      studentName: 'Mike Chen',
      studentEmail: 'mike.chen@email.com',
      course: 'IELTS Preparation',
      amount: 299,
      dueDate: '2025-01-20',
      paidDate: null,
      status: 'Due',
      paymentMethod: null,
      transactionId: null
    },
    {
      id: 3,
      studentName: 'Sarah Williams',
      studentEmail: 'sarah.williams@email.com',
      course: 'Conversational English',
      amount: 149,
      dueDate: '2025-01-25',
      paidDate: '2025-01-22',
      status: 'Paid',
      paymentMethod: 'PayPal',
      transactionId: 'TXN001234568'
    },
    {
      id: 4,
      studentName: 'David Brown',
      studentEmail: 'david.brown@email.com',
      course: 'Grammar Fundamentals',
      amount: 179,
      dueDate: '2025-01-18',
      paidDate: null,
      status: 'Overdue',
      paymentMethod: null,
      transactionId: null
    },
    {
      id: 5,
      studentName: 'Emma Davis',
      studentEmail: 'emma.davis@email.com',
      course: 'Academic Writing',
      amount: 249,
      dueDate: '2025-02-01',
      paidDate: null,
      status: 'Due',
      paymentMethod: null,
      transactionId: null
    },
    {
      id: 6,
      studentName: 'John Smith',
      studentEmail: 'john.smith@email.com',
      course: 'Business English Mastery',
      amount: 199,
      dueDate: '2025-01-12',
      paidDate: '2025-01-14',
      status: 'Late Payment',
      paymentMethod: 'Bank Transfer',
      transactionId: 'TXN001234569'
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingPayment, setEditingPayment] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const handleAddPayment = (paymentData) => {
    const newPayment = {
      ...paymentData,
      id: Math.max(...payments.map(p => p.id)) + 1,
      transactionId: `TXN${Date.now()}`
    };
    setPayments([...payments, newPayment]);
    setShowForm(false);
    toast.success(`Payment record for ${paymentData.studentName} has been added successfully!`);
  };

  const handleEditPayment = (paymentData) => {
    setPayments(payments.map(payment => 
      payment.id === editingPayment.id 
        ? { ...payment, ...paymentData }
        : payment
    ));
    setEditingPayment(null);
    setShowForm(false);
    toast.success(`Payment record for ${paymentData.studentName} has been updated successfully!`);
  };

  const handleDeletePayment = (paymentId) => {
    const payment = payments.find(p => p.id === paymentId);
    if (window.confirm(`Are you sure you want to delete the payment record for ${payment.studentName}? This action cannot be undone.`)) {
      setPayments(payments.filter(payment => payment.id !== paymentId));
      toast.success(`Payment record for ${payment.studentName} has been deleted successfully!`);
    }
  };

  const handleMarkAsPaid = (paymentId) => {
    const payment = payments.find(p => p.id === paymentId);
    const updatedPayment = {
      ...payment,
      status: 'Paid',
      paidDate: new Date().toISOString().split('T')[0],
      paymentMethod: 'Manual Entry',
      transactionId: `TXN${Date.now()}`
    };
    
    setPayments(payments.map(p => p.id === paymentId ? updatedPayment : p));
    toast.success(`Payment for ${payment.studentName} has been marked as paid!`);
  };

  const openEditForm = (payment) => {
    setEditingPayment(payment);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingPayment(null);
  };

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = payment.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.studentEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.course.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' || payment.status.toLowerCase().replace(' ', '') === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  // Calculate statistics
  const totalRevenue = payments.filter(p => p.status === 'Paid' || p.status === 'Late Payment').reduce((sum, p) => sum + p.amount, 0);
  const pendingAmount = payments.filter(p => p.status === 'Due' || p.status === 'Overdue').reduce((sum, p) => sum + p.amount, 0);
  const paidCount = payments.filter(p => p.status === 'Paid' || p.status === 'Late Payment').length;
  const overdueCount = payments.filter(p => p.status === 'Overdue').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Payment Management</h2>
          <p className="text-gray-600">Track student payments, dues, and payment history</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="px-6 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors duration-200 font-medium flex items-center space-x-2"
        >
          <span>💳</span>
          <span>Add Payment Record</span>
        </button>
      </div>

      {/* Payment Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <span className="text-green-600 text-xl">💰</span>
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">${totalRevenue.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
              <span className="text-yellow-600 text-xl">⏳</span>
            </div>
            <div>
              <p className="text-sm text-gray-600">Pending Amount</p>
              <p className="text-2xl font-bold text-gray-900">${pendingAmount.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <span className="text-blue-600 text-xl">✅</span>
            </div>
            <div>
              <p className="text-sm text-gray-600">Paid Payments</p>
              <p className="text-2xl font-bold text-gray-900">{paidCount}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
              <span className="text-red-600 text-xl">⚠️</span>
            </div>
            <div>
              <p className="text-sm text-gray-600">Overdue</p>
              <p className="text-2xl font-bold text-gray-900">{overdueCount}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search by student name, email, or course..."
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
              <option value="all">All Payments</option>
              <option value="paid">Paid</option>
              <option value="due">Due</option>
              <option value="overdue">Overdue</option>
              <option value="latepayment">Late Payment</option>
            </select>
          </div>
        </div>
      </div>

      {/* Payment List */}
      <PaymentList 
        payments={filteredPayments}
        onEdit={openEditForm}
        onDelete={handleDeletePayment}
        onMarkAsPaid={handleMarkAsPaid}
      />

      {/* Payment Form Modal */}
      {showForm && (
        <PaymentForm
          payment={editingPayment}
          onSubmit={editingPayment ? handleEditPayment : handleAddPayment}
          onClose={closeForm}
        />
      )}
    </div>
  );
}

export default PaymentManagement;