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
      {/* Table Header */}
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Payment Records ({payments.length})</h3>
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
                Course
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Due Date
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Paid Date
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Payment Method
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {payments.map((payment) => (
              <tr key={payment.id} className="hover:bg-gray-50 transition-colors duration-200">
                {/* Student Info */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      {payment.studentName.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">{payment.studentName}</div>
                      <div className="text-sm text-gray-500">{payment.studentEmail}</div>
                    </div>
                  </div>
                </td>

                {/* Course */}
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900 max-w-xs">
                    {payment.course}
                  </div>
                </td>

                {/* Amount */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-lg font-bold text-gray-900">${payment.amount}</div>
                </td>

                {/* Due Date */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className={`text-sm ${isOverdue(payment.dueDate, payment.status) ? 'text-red-600 font-semibold' : 'text-gray-900'}`}>
                    {formatDate(payment.dueDate)}
                  </div>
                  {isOverdue(payment.dueDate, payment.status) && (
                    <div className="text-xs text-red-500 font-medium">Overdue</div>
                  )}
                </td>

                {/* Paid Date */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {formatDate(payment.paidDate)}
                  </div>
                </td>

                {/* Status */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(payment.status)}`}>
                    {payment.status}
                  </span>
                </td>

                {/* Payment Method */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {payment.paymentMethod || 'N/A'}
                  </div>
                  {payment.transactionId && (
                    <div className="text-xs text-gray-500 font-mono">
                      {payment.transactionId}
                    </div>
                  )}
                </td>

                {/* Actions */}
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <div className="flex items-center justify-end space-x-2">
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

      {/* Table Footer */}
      <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>Showing {payments.length} payment record{payments.length !== 1 ? 's' : ''}</span>
          <div className="flex items-center space-x-2">
            <span>Sort by:</span>
            <select className="border border-gray-300 rounded px-2 py-1 text-sm">
              <option>Due Date</option>
              <option>Student Name</option>
              <option>Amount</option>
              <option>Status</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentList;