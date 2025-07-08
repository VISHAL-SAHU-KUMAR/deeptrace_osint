import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import OrganizationHierarchy from './components/OrganizationHierarchy';
import UserManagementGrid from './components/UserManagementGrid';
import PermissionDetailPanel from './components/PermissionDetailPanel';

const UserAccessControlCenter = () => {
  const [selectedDepartment, setSelectedDepartment] = useState('root');
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedUsers, setSelectedUsers] = useState([]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey || event.metaKey) {
        switch (event.key.toLowerCase()) {
          case 'u':
            event.preventDefault();
            console.log('New user shortcut');
            break;
          case 'r':
            event.preventDefault();
            console.log('Role change shortcut');
            break;
          case 'd':
            event.preventDefault();
            console.log('Disable user shortcut');
            break;
          case 'k':
            event.preventDefault();
            // Focus search input
            const searchInput = document.querySelector('input[type="search"]');
            if (searchInput) {
              searchInput.focus();
            }
            break;
          default:
            break;
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleDepartmentSelect = (departmentId, departmentName) => {
    setSelectedDepartment(departmentId);
    setSelectedUser(null); // Clear selected user when changing department
  };

  const handleUserSelect = (user) => {
    setSelectedUser(user);
  };

  const handleBulkAction = (action, userIds) => {
    console.log(`Bulk action: ${action} for users:`, userIds);
    // Handle bulk operations like activate, deactivate, permissions update
    switch (action) {
      case 'activate': console.log('Activating users:', userIds);
        break;
      case 'deactivate': console.log('Deactivating users:', userIds);
        break;
      case 'permissions': console.log('Updating permissions for users:', userIds);
        break;
      default:
        break;
    }
  };

  const handlePermissionUpdate = (userId, permissions) => {
    console.log('Updating permissions for user:', userId, permissions);
    // Handle individual permission updates
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>User Access Control Center - DeepTrace OSINT</title>
        <meta name="description" content="Manage role-based permissions, security clearances, and system access for OSINT platform users across multiple organizational levels." />
      </Helmet>

      <Header />
      <Sidebar />

      <main className="ml-64 mt-16 h-screen overflow-hidden">
        <div className="h-full flex">
          {/* Organization Hierarchy Panel - 25% */}
          <div className="w-1/4 h-full">
            <OrganizationHierarchy
              onDepartmentSelect={handleDepartmentSelect}
              selectedDepartment={selectedDepartment}
            />
          </div>

          {/* User Management Grid - 50% */}
          <div className="w-1/2 h-full">
            <UserManagementGrid
              selectedDepartment={selectedDepartment}
              onUserSelect={handleUserSelect}
              selectedUsers={selectedUsers}
              onBulkAction={handleBulkAction}
            />
          </div>

          {/* Permission Detail Panel - 25% */}
          <div className="w-1/4 h-full">
            <PermissionDetailPanel
              selectedUser={selectedUser}
              onPermissionUpdate={handlePermissionUpdate}
            />
          </div>
        </div>
      </main>

      {/* Keyboard Shortcuts Help */}
      <div className="fixed bottom-4 right-4 bg-surface border border-border rounded-lg p-3 shadow-elevated opacity-75 hover:opacity-100 transition-micro">
        <div className="text-xs text-text-secondary space-y-1">
          <div className="flex items-center justify-between space-x-4">
            <span>New User:</span>
            <kbd className="px-2 py-1 bg-secondary-100 rounded text-xs">Ctrl+U</kbd>
          </div>
          <div className="flex items-center justify-between space-x-4">
            <span>Role Change:</span>
            <kbd className="px-2 py-1 bg-secondary-100 rounded text-xs">Ctrl+R</kbd>
          </div>
          <div className="flex items-center justify-between space-x-4">
            <span>Disable User:</span>
            <kbd className="px-2 py-1 bg-secondary-100 rounded text-xs">Ctrl+D</kbd>
          </div>
          <div className="flex items-center justify-between space-x-4">
            <span>Search:</span>
            <kbd className="px-2 py-1 bg-secondary-100 rounded text-xs">Ctrl+K</kbd>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAccessControlCenter;