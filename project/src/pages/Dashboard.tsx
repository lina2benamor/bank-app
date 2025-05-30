import React from 'react';
import { 
  Users, CreditCard, TrendingUp, ArrowUp, ArrowDown, AlertCircle, CheckCircle2
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';

// Components
import StatCard from '../components/StatCard';
import TransactionList from '../components/TransactionList';
import AlertCard from '../components/AlertCard';

// Demo data
const chartData = [
  { name: 'Jan', deposits: 4000, withdrawals: 2400 },
  { name: 'Feb', deposits: 3000, withdrawals: 1398 },
  { name: 'Mar', deposits: 2000, withdrawals: 9800 },
  { name: 'Apr', deposits: 2780, withdrawals: 3908 },
  { name: 'May', deposits: 1890, withdrawals: 4800 },
  { name: 'Jun', deposits: 2390, withdrawals: 3800 },
];

const alerts = [
  {
    id: 1,
    title: 'Multiple failed login attempts',
    description: 'User account "john.doe" had 5 failed login attempts',
    type: 'warning',
    time: '35 minutes ago'
  },
  {
    id: 2,
    title: 'Large transaction detected',
    description: 'Transaction of $25,000 requires approval',
    type: 'alert',
    time: '2 hours ago'
  },
  {
    id: 3,
    title: 'New account created',
    description: 'Business account for Smith Enterprises created successfully',
    type: 'success',
    time: '3 hours ago'
  },
];

const Dashboard: React.FC = () => {
  const today = new Date();
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-1">{format(today, 'EEEE, MMMM d, yyyy')}</p>
        </div>
        <div>
          <button className="btn btn-primary">Generate Report</button>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Users"
          value="24,521"
          change="+5.2%"
          trend="up"
          icon={<Users className="text-primary-900" />}
          iconBg="bg-primary-100"
        />
        <StatCard 
          title="Active Accounts"
          value="18,372"
          change="+3.1%"
          trend="up"
          icon={<CreditCard className="text-secondary-900" />}
          iconBg="bg-secondary-100"
        />
        <StatCard 
          title="Total Deposits"
          value="$1.2M"
          change="+12.5%"
          trend="up"
          icon={<TrendingUp className="text-success-800" />}
          iconBg="bg-success-100"
        />
        <StatCard 
          title="Loans Issued"
          value="$850K"
          change="-2.3%"
          trend="down"
          icon={<CreditCard className="text-warning-800" />}
          iconBg="bg-warning-100"
        />
      </div>

      {/* Charts and activity row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Monthly Transactions</h2>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-primary-500 rounded-full mr-2"></div>
                <span>Deposits</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-secondary-500 rounded-full mr-2"></div>
                <span>Withdrawals</span>
              </div>
            </div>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  formatter={(value) => [`$${value}`, undefined]}
                  labelStyle={{ color: '#0A2342' }}
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    borderRadius: '0.375rem',
                    border: '1px solid #E2E8F0'
                  }}
                />
                <Bar dataKey="deposits" fill="#0A2342" radius={[4, 4, 0, 0]} />
                <Bar dataKey="withdrawals" fill="#3CB371" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Alerts */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Alerts</h2>
            <button className="text-sm text-primary-700 hover:text-primary-800 font-medium">
              View all
            </button>
          </div>
          <div className="space-y-4">
            {alerts.map((alert) => (
              <AlertCard 
                key={alert.id}
                title={alert.title}
                description={alert.description}
                time={alert.time}
                type={alert.type}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Recent transactions */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Recent Transactions</h2>
          <button className="text-sm text-primary-700 hover:text-primary-800 font-medium">
            View all transactions
          </button>
        </div>
        <TransactionList />
      </div>
    </div>
  );
};

export default Dashboard;