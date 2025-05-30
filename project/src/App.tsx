import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';

// Layouts
import DashboardLayout from './layouts/DashboardLayout';
import AuthLayout from './layouts/AuthLayout';

// Pages
import Dashboard from './pages/Dashboard';
import UserManagement from './pages/UserManagement';
import Transactions from './pages/Transactions';
import AccountsManagement from './pages/AccountsManagement';
import LoansManagement from './pages/LoansManagement';
import CustomerSupport from './pages/CustomerSupport';
import BranchManagement from './pages/BranchManagement';
import Settings from './pages/Settings';
import Login from './pages/Login';
import NotFound from './pages/NotFound';

// Auth guard component
const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

function App() {
  return (
    <Routes>
      {/* Auth routes */}
      <Route path="/login" element={<AuthLayout><Login /></AuthLayout>} />

      {/* Dashboard routes */}
      <Route path="/" element={
        <PrivateRoute>
          <DashboardLayout />
        </PrivateRoute>
      }>
        <Route index element={<Dashboard />} />
        <Route path="users" element={<UserManagement />} />
        <Route path="transactions" element={<Transactions />} />
        <Route path="accounts" element={<AccountsManagement />} />
        <Route path="loans" element={<LoansManagement />} />
        <Route path="support" element={<CustomerSupport />} />
        <Route path="branches" element={<BranchManagement />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      {/* Catch all route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;