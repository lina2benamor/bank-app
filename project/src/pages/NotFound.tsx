import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BanknoteIcon, ArrowLeft } from 'lucide-react';

const NotFound: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="w-16 h-16 bg-primary-700 rounded-2xl flex items-center justify-center mb-6">
        <BanknoteIcon size={32} className="text-white" />
      </div>
      <h1 className="text-4xl font-bold text-gray-900 mb-2">404</h1>
      <p className="text-xl text-gray-600 mb-8">Page not found</p>
      <p className="text-gray-500 max-w-md text-center mb-8">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <button 
        className="btn btn-primary"
        onClick={() => navigate('/')}
      >
        <ArrowLeft size={16} className="mr-2" />
        Back to Dashboard
      </button>
    </div>
  );
};

export default NotFound;