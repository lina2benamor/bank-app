import React from 'react';

const Settings: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">System Settings</h1>
      </div>
      <div className="bg-white p-8 rounded-lg shadow-sm">
        <p className="text-gray-600 text-center">
          This is a placeholder for the System Settings page. <br />
          It would include global configuration, security settings, and system preferences.
        </p>
      </div>
    </div>
  );
};

export default Settings;