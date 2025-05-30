import React from 'react';
import { ArrowUpRight, ArrowDownLeft } from 'lucide-react';

// Demo transaction data
const transactions = [
  {
    id: '1',
    type: 'deposit',
    amount: 1200.00,
    account: 'Main Checking **** 4832',
    customer: 'John Smith',
    date: '2025-05-01T10:30:00',
    status: 'completed'
  },
  {
    id: '2',
    type: 'withdrawal',
    amount: 350.50,
    account: 'Savings **** 7645',
    customer: 'Sarah Johnson',
    date: '2025-05-01T09:15:00',
    status: 'completed'
  },
  {
    id: '3',
    type: 'deposit',
    amount: 5000.00,
    account: 'Business **** 9213',
    customer: 'Acme Corporation',
    date: '2025-04-30T16:45:00',
    status: 'pending'
  },
  {
    id: '4',
    type: 'withdrawal',
    amount: 725.80,
    account: 'Joint Checking **** 3391',
    customer: 'Michael & Lisa Chen',
    date: '2025-04-30T14:20:00',
    status: 'completed'
  },
  {
    id: '5',
    type: 'deposit',
    amount: 2500.00,
    account: 'Savings **** 6278',
    customer: 'David Wilson',
    date: '2025-04-29T11:10:00',
    status: 'completed'
  }
];

const TransactionList: React.FC = () => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Transaction
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
          {transactions.map((transaction) => (
            <tr key={transaction.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className={`p-2 rounded-full mr-3 ${
                    transaction.type === 'deposit' ? 'bg-success-100' : 'bg-warning-100'
                  }`}>
                    {transaction.type === 'deposit' ? (
                      <ArrowDownLeft size={16} className="text-success-800" />
                    ) : (
                      <ArrowUpRight size={16} className="text-warning-800" />
                    )}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 capitalize">
                      {transaction.type}
                    </div>
                    <div className="text-sm text-gray-500">
                      ${transaction.amount.toFixed(2)}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{transaction.customer}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{transaction.account}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {formatDate(transaction.date)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  transaction.status === 'completed' 
                    ? 'bg-success-100 text-success-800' 
                    : 'bg-warning-100 text-warning-800'
                }`}>
                  {transaction.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button className="text-primary-600 hover:text-primary-900 mr-3">
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionList;