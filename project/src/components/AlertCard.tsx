import React from 'react';
import { AlertCircle, CheckCircle2, AlertTriangle } from 'lucide-react';

interface AlertCardProps {
  title: string;
  description: string;
  time: string;
  type: 'success' | 'warning' | 'alert';
}

const AlertCard: React.FC<AlertCardProps> = ({ title, description, time, type }) => {
  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle2 size={18} className="text-success-800" />;
      case 'warning':
        return <AlertTriangle size={18} className="text-warning-800" />;
      case 'alert':
        return <AlertCircle size={18} className="text-error-800" />;
      default:
        return <AlertCircle size={18} className="text-error-800" />;
    }
  };

  const getBgColor = () => {
    switch (type) {
      case 'success':
        return 'bg-success-100';
      case 'warning':
        return 'bg-warning-100';
      case 'alert':
        return 'bg-error-100';
      default:
        return 'bg-gray-100';
    }
  };

  return (
    <div className="flex items-start p-3 rounded-md hover:bg-gray-50 transition-colors animate-slide-in">
      <div className={`p-2 rounded-full ${getBgColor()} mr-3 mt-0.5`}>
        {getIcon()}
      </div>
      <div className="flex-1">
        <h3 className="font-medium text-gray-900">{title}</h3>
        <p className="text-sm text-gray-500 mt-1">{description}</p>
        <p className="text-xs text-gray-400 mt-2">{time}</p>
      </div>
    </div>
  );
};

export default AlertCard;