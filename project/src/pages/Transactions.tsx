import React, { useState } from 'react';
import { Search, Filter, Download, Eye, Check, X, ArrowUpRight, ArrowDownLeft } from 'lucide-react';

// Mock transaction data
const mockTransactions = [
  { id: 'TRX001', type: 'deposit', amount: 5000.00, accountNumber: '**** 4832', customer: 'John Smith', date: '2025-05-02T10:30:00', status: 'completed' },
  { id: 'TRX002', type: 'withdrawal', amount: 1200.50, accountNumber: '**** 7645', customer: 'Sarah Johnson', date: '2025-05-02T09:15:00', status: 'completed' },
  { id: 'TRX003', type: 'transfer', amount: 3500.00, accountNumber: '**** 9213', customer: 'Acme Corporation', date: '2025-05-01T16:45:00', status: 'pending' },
  { id: 'TRX004', type: 'payment', amount: 750.80, accountNumber: '**** 3391', customer: 'Michael Chen', date: '2025-05-01T14:20:00', status: 'completed' },
  { id: 'TRX005', type: 'deposit', amount: 10000.00, accountNumber: '**** 6278', customer: 'David Wilson', date: '2025-04-30T11:10:00', status: 'flagged' },
  { id: 'TRX006', type: 'withdrawal', amount: 2000.00, accountNumber: '**** 1234', customer: 'Emma Thompson', date: '2025-04-30T10:05:00', status: 'rejected' },
  { id: 'TRX007', type: 'transfer', amount: 1750.25, accountNumber: '**** 5678', customer: 'Robert Johnson', date: '2025-04-29T15:30:00', status: 'completed' },
  { id: 'TRX008', type: 'payment', amount: 430.50, accountNumber: '**** 9876', customer: 'Lisa Garcia', date: '2025-04-29T13:45:00', status: 'completed' },
  { id: 'TRX009', type: 'deposit', amount: 6500.00, accountNumber: '**** 5432', customer: 'James Taylor', date: '2025-04-28T09:20:00', status: 'completed' },
  { id: 'TRX010', type: 'withdrawal', amount: 900.00, accountNumber: '**** 2468', customer: 'Patricia Martinez', date: '2025-04-28T16:15:00', status: 'pending' },
];

const Transactions: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<string | null>(null);
  
  // Filter transactions based on filters
  const filteredTransactions = mockTransactions.filter(transaction => {
    const matchesSearch = 
      transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.accountNumber.includes(searchTerm);
    
    const matchesStatus = statusFilter === 'all' || transaction.status === statusFilter;
    const matchesType = typeFilter === 'all' || transaction.type === typeFilter;
    
    // Simple date filter (in a real app would be more sophisticated)
    let matchesDate = true;
    if (dateFilter === 'today') {
      const today = new Date().toISOString().split('T')[0];
      matchesDate = transaction.date.startsWith(today);
    } else if (dateFilter === 'yesterday') {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split('T')[0];
      matchesDate = transaction.date.startsWith(yesterdayStr);
    }
    
    return matchesSearch && matchesStatus && matchesType && matchesDate;
  });
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  const getStatusBadgeClasses = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-success-100 text-success-800';
      case 'pending':
        return 'bg-warning-100 text-warning-800';
      case 'flagged':
        return 'bg-error-100 text-error-800';
      case 'rejected':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Transaction Management</h1>
        <button className="btn btn-outline">
          <Download size={16} className="mr-2" />
          Export
        </button>
      </div>
      
      {/* Filters and search */}
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by ID, customer, or account..."
              className="input pl-10 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <select 
              className="input"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="flagged">Flagged</option>
              <option value="rejected">Rejected</option>
            </select>
            
            <select 
              className="input"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="deposit">Deposit</option>
              <option value="withdrawal">Withdrawal</option>
              <option value="transfer">Transfer</option>
              <option value="payment">Payment</option>
            </select>
            
            <select 
              className="input"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
            >
              <option value="all">All Dates</option>
              <option value="today">Today</option>
              <option value="yesterday">Yesterday</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Transactions table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Transaction ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Account
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{transaction.id}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className={`p-1 rounded-full mr-2 ${
                        transaction.type === 'deposit' || transaction.type === 'transfer' 
                          ? 'bg-success-100' 
                          : 'bg-warning-100'
                      }`}>
                        {transaction.type === 'deposit' || transaction.type === 'transfer' ? (
                          <ArrowDownLeft size={14} className="text-success-800" />
                        ) : (
                          <ArrowUpRight size={14} className="text-warning-800" />
                        )}
                      </div>
                      <div className="text-sm text-gray-900 capitalize">
                        {transaction.type}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      ${transaction.amount.toFixed(2)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{transaction.customer}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{transaction.accountNumber}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(transaction.date)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      getStatusBadgeClasses(transaction.status)
                    }`}>
                      {transaction.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button 
                      className="text-primary-600 hover:text-primary-900 mr-3"
                      onClick={() => {}}
                    >
                      <Eye size={16} />
                    </button>
                    {transaction.status === 'pending' && (
                      <button 
                        className="text-success-600 hover:text-success-800 mr-3"
                        onClick={() => {
                          setSelectedTransaction(transaction.id);
                          setIsApproveModalOpen(true);
                        }}
                      >
                        <Check size={16} />
                      </button>
                    )}
                    {transaction.status === 'pending' && (
                      <button 
                        className="text-error-600 hover:text-error-800"
                        onClick={() => {}}
                      >
                        <X size={16} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination (simplified) */}
        <div className="px-6 py-4 bg-white border-t border-gray-200 flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing <span className="font-medium">1</span> to{' '}
            <span className="font-medium">{filteredTransactions.length}</span>{' '}
            of <span className="font-medium">{filteredTransactions.length}</span> transactions
          </div>
          <div className="flex items-center space-x-2">
            <button className="btn btn-outline py-1 px-3">Previous</button>
            <button className="btn btn-outline py-1 px-3">Next</button>
          </div>
        </div>
      </div>
      
      {/* Approve transaction modal */}
      {isApproveModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div className="fixed inset-0 bg-black bg-opacity-30 transition-opacity" onClick={() => setIsApproveModalOpen(false)}></div>
            
            <div className="bg-white rounded-lg max-w-md w-full mx-auto z-50 shadow-xl animate-fade-in">
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Approve Transaction
                </h3>
                <p className="text-gray-600 mb-6">
                  Are you sure you want to approve transaction {selectedTransaction}? This action cannot be undone.
                </p>
                <div className="flex justify-end space-x-3">
                  <button 
                    className="btn btn-outline"
                    onClick={() => setIsApproveModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button 
                    className="btn btn-primary"
                    onClick={() => {
                      // In a real app, would make API call to approve
                      setIsApproveModalOpen(false);
                    }}
                  >
                    Approve
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Transactions;