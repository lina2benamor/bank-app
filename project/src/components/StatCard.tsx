import React from 'react';
import { ArrowDown, ArrowUp } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: React.ReactNode;
  iconBg: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, trend, icon, iconBg }) => {
  return (
    <div className="card hover:border-primary-200 transition-all duration-300">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="mt-2 text-3xl font-semibold text-gray-900">{value}</p>
        </div>
        <div className={`p-3 rounded-full ${iconBg}`}>
          {icon}
        </div>
      </div>
      <div className="mt-4 flex items-center">
        <div className={`flex items-center ${trend === 'up' ? 'text-success-800' : 'text-error-800'}`}>
          {trend === 'up' ? (
            <ArrowUp size={16} className="mr-1" />
          ) : (
            <ArrowDown size={16} className="mr-1" />
          )}
          <span className="text-sm font-medium">{change}</span>
        </div>
        <span className="text-sm text-gray-500 ml-2">from last month</span>
      </div>
    </div>
  );
};

export default StatCard;