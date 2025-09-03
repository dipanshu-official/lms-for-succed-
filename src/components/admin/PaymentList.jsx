import React from 'react';

function PaymentList({ payments, onEdit, onDelete, onMarkAsPaid }) {
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'paid':
        return 'bg-green-100 text-green-700';
      case 'due':
        return 'bg-yellow-100 text-yellow-700';
      case 'overdue':
        return 'bg-red-100 text-red-700';
      case 'late payment':
        return 'bg-orange-100 text-orange-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const isOverdue = (dueDate, status) => {
    if (status === 'Paid' || status === 'Late Payment') return false;
    return new Date(dueDate) < new Date();
  };

  if (payments.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-12 shadow-lg text-center">
        <div className="text-6xl mb-4">💳</div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No Payment Records Found</h3>
        <p className="text-gray-600">No payment records match your current search criteria.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Student</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Course</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Amount</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Due Date</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Paid Date</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Payment Method</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {payments.map((payment) => (
              <tr key={payment.id} className="hover:bg-gray-50 transition-colors duration-200">
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      {payment.studentName.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{payment.studentName}</h3>
                      <p className="text-sm text-gray-600">{payment.studentEmail}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm font-medium text-gray-900">{payment.course}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-lg font-bold text-gray-900">${payment.amount}</span>
                </td>
                <td className="px-6 py-4">
                  <span className={`text-sm ${isOverdue(payment.dueDate, payment.status) ? 'text-red-600 font-semibold' : 'text-gray-600'}`}>
                    {formatDate(payment.dueDate)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-600">{formatDate(payment.paidDate)}</span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(payment.status)}`}>
                    {payment.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-600">{payment.paymentMethod || 'N/A'}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    {(payment.status === 'Due' || payment.status === 'Overdue') && (
                      <button
                        onClick={() => onMarkAsPaid(payment.id)}
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-200"
                        title="Mark as Paid"
                      >
                        ✅
                      </button>
                    )}
                    <button
                      onClick={() => onEdit(payment)}
                      className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors duration-200"
                      title="Edit Payment"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => onDelete(payment.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                      title="Delete Payment"
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

      {/* Mobile Card View */}
      <div className="lg:hidden p-4 space-y-4">
        {payments.map((payment) => (
          <div key={payment.id} className="border border-gray-200 rounded-xl p-4 hover:border-primary-300 transition-colors duration-200">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white font-semibold">
                  {payment.studentName.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{payment.studentName}</h3>
                  <p className="text-sm text-gray-600">{payment.studentEmail}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {(payment.status === 'Due' || payment.status === 'Overdue') && (
                  <button
                    onClick={() => onMarkAsPaid(payment.id)}
                    className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-200"
                  >
                    ✅
                  </button>
                )}
                <button
                  onClick={() => onEdit(payment)}
                  className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors duration-200"
                >
                  ✏️
                </button>
                <button
                  onClick={() => onDelete(payment.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                >
                  🗑️
                </button>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Course:</span>
                <span className="text-sm font-medium text-gray-900">{payment.course}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Amount:</span>
                <span className="text-lg font-bold text-gray-900">${payment.amount}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Due Date:</span>
                <span className={`text-sm ${isOverdue(payment.dueDate, payment.status) ? 'text-red-600 font-semibold' : 'text-gray-600'}`}>
                  {formatDate(payment.dueDate)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Paid Date:</span>
                <span className="text-sm text-gray-600">{formatDate(payment.paidDate)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Status:</span>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(payment.status)}`}>
                  {payment.status}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Payment Method:</span>
                <span className="text-sm text-gray-600">{payment.paymentMethod || 'N/A'}</span>
              </div>
              {payment.transactionId && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Transaction ID:</span>
                  <span className="text-sm text-gray-500 font-mono">{payment.transactionId}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PaymentList;