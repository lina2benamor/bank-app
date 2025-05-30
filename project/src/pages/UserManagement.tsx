import React, { useState } from 'react';
import { Search, Plus, ChevronLeft, ChevronRight, MoreHorizontal, Edit, Trash2, UserCheck } from 'lucide-react';

// Mock user data
const mockUsers = [
  { id: '1', name: 'John Smith', email: 'john.smith@example.com', role: 'Customer', status: 'Active', created: '2025-01-15' },
  { id: '2', name: 'Sarah Johnson', email: 'sarah.j@example.com', role: 'Customer', status: 'Active', created: '2025-02-03' },
  { id: '3', name: 'Michael Williams', email: 'm.williams@example.com', role: 'Business', status: 'Active', created: '2025-01-27' },
  { id: '4', name: 'Emily Davis', email: 'emily.davis@example.com', role: 'Customer', status: 'Inactive', created: '2024-11-09' },
  { id: '5', name: 'David Wilson', email: 'd.wilson@example.com', role: 'Business', status: 'Active', created: '2025-03-12' },
  { id: '6', name: 'Lisa Garcia', email: 'lisa.g@example.com', role: 'Customer', status: 'Pending', created: '2025-04-21' },
  { id: '7', name: 'James Taylor', email: 'j.taylor@example.com', role: 'Business', status: 'Active', created: '2025-02-18' },
  { id: '8', name: 'Patricia Martinez', email: 'p.martinez@example.com', role: 'Customer', status: 'Active', created: '2025-03-05' },
  { id: '9', name: 'Robert Anderson', email: 'r.anderson@example.com', role: 'Customer', status: 'Inactive', created: '2024-12-14' },
  { id: '10', name: 'Jennifer Thomas', email: 'j.thomas@example.com', role: 'Business', status: 'Active', created: '2025-01-30' },
];

const UserManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  
  const itemsPerPage = 8;
  
  // Filter users based on search term
  const filteredUsers = mockUsers.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Calculate pagination
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
        <button className="btn btn-primary">
          <Plus size={16} className="mr-2" />
          Add New User
        </button>
      </div>
      
      {/* Filters and search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="w-full sm:w-64 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search users..."
            className="input pl-10 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex items-center space-x-4 w-full sm:w-auto">
          <select className="input">
            <option value="">All Roles</option>
            <option value="customer">Customer</option>
            <option value="business">Business</option>
          </select>
          <select className="input">
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </div>
      
      {/* Users table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{user.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{user.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{user.role}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      user.status === 'Active' 
                        ? 'bg-success-100 text-success-800' 
                        : user.status === 'Inactive'
                          ? 'bg-gray-100 text-gray-800'
                          : 'bg-warning-100 text-warning-800'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(user.created)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="relative">
                      <button 
                        onClick={() => setSelectedUser(selectedUser === user.id ? null : user.id)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <MoreHorizontal size={18} />
                      </button>
                      
                      {selectedUser === user.id && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                          <button className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            <Edit size={16} className="mr-2" />
                            Edit User
                          </button>
                          <button className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            <UserCheck size={16} className="mr-2" />
                            Change Status
                          </button>
                          <button className="flex w-full items-center px-4 py-2 text-sm text-error-600 hover:bg-gray-100">
                            <Trash2 size={16} className="mr-2" />
                            Delete User
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="px-6 py-4 bg-white border-t border-gray-200 flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to{' '}
            <span className="font-medium">
              {Math.min(currentPage * itemsPerPage, filteredUsers.length)}
            </span>{' '}
            of <span className="font-medium">{filteredUsers.length}</span> users
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:hover:bg-white"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:hover:bg-white"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;