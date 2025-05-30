import React from 'react';
import { BanknoteIcon } from 'lucide-react';

const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="w-12 h-12 bg-primary-700 rounded-lg flex items-center justify-center">
            <BanknoteIcon size={24} className="text-white" />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          BankAdmin Portal
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Secure bank administration system
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {children}
        </div>
        <p className="mt-4 text-center text-xs text-gray-500">
          © 2025 BankAdmin. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default AuthLayout;