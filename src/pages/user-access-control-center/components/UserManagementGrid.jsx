import React, { useState, useMemo } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const UserManagementGrid = ({ selectedDepartment, onUserSelect, selectedUsers, onBulkAction }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'lastLogin', direction: 'desc' });
  const [filterRole, setFilterRole] = useState('all');
  const [filterClearance, setFilterClearance] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUserIds, setSelectedUserIds] = useState(new Set());
  const itemsPerPage = 15;

  const mockUsers = [
    {
      id: 'usr_001',
      username: 'sarah.chen',
      fullName: 'Sarah Chen',
      email: 'sarah.chen@deeptrace.com',
      role: 'Senior Analyst',
      department: 'security',
      clearanceLevel: 'Level 3',
      lastLogin: new Date('2024-01-15T14:30:00'),
      activeSessions: 2,
      status: 'active',
      complianceStatus: 'compliant',
      mfaEnabled: true,
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b9e5e8d4?w=100&h=100&fit=crop&crop=face'
    },
    {
      id: 'usr_002',
      username: 'mike.rodriguez',
      fullName: 'Michael Rodriguez',
      email: 'mike.rodriguez@deeptrace.com',
      role: 'Threat Hunter',
      department: 'security',
      clearanceLevel: 'Level 2',
      lastLogin: new Date('2024-01-15T13:45:00'),
      activeSessions: 1,
      status: 'active',
      complianceStatus: 'compliant',
      mfaEnabled: true,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
    },
    {
      id: 'usr_003',
      username: 'alex.kim',
      fullName: 'Alex Kim',
      email: 'alex.kim@deeptrace.com',
      role: 'OSINT Specialist',
      department: 'intelligence',
      clearanceLevel: 'Level 2',
      lastLogin: new Date('2024-01-15T12:20:00'),
      activeSessions: 3,
      status: 'active',
      complianceStatus: 'warning',
      mfaEnabled: false,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
    },
    {
      id: 'usr_004',
      username: 'emma.watson',
      fullName: 'Emma Watson',
      email: 'emma.watson@deeptrace.com',
      role: 'Forensics Investigator',
      department: 'forensics',
      clearanceLevel: 'Level 3',
      lastLogin: new Date('2024-01-15T11:15:00'),
      activeSessions: 1,
      status: 'inactive',
      complianceStatus: 'compliant',
      mfaEnabled: true,
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face'
    },
    {
      id: 'usr_005',
      username: 'david.park',
      fullName: 'David Park',
      email: 'david.park@deeptrace.com',
      role: 'Security Admin',
      department: 'admin',
      clearanceLevel: 'Level 4',
      lastLogin: new Date('2024-01-15T15:00:00'),
      activeSessions: 1,
      status: 'active',
      complianceStatus: 'compliant',
      mfaEnabled: true,
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face'
    }
  ];

  const filteredUsers = useMemo(() => {
    return mockUsers.filter(user => {
      const matchesSearch = user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           user.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRole = filterRole === 'all' || user.role === filterRole;
      const matchesClearance = filterClearance === 'all' || user.clearanceLevel === filterClearance;
      const matchesDepartment = !selectedDepartment || selectedDepartment === 'root' || user.department === selectedDepartment;
      
      return matchesSearch && matchesRole && matchesClearance && matchesDepartment;
    });
  }, [mockUsers, searchTerm, filterRole, filterClearance, selectedDepartment]);

  const sortedUsers = useMemo(() => {
    return [...filteredUsers].sort((a, b) => {
      if (sortConfig.key === 'lastLogin') {
        return sortConfig.direction === 'asc' 
          ? new Date(a.lastLogin) - new Date(b.lastLogin)
          : new Date(b.lastLogin) - new Date(a.lastLogin);
      }
      
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      
      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredUsers, sortConfig]);

  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedUsers.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedUsers, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(sortedUsers.length / itemsPerPage);

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleSelectUser = (userId) => {
    setSelectedUserIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(userId)) {
        newSet.delete(userId);
      } else {
        newSet.add(userId);
      }
      return newSet;
    });
  };

  const handleSelectAll = () => {
    if (selectedUserIds.size === paginatedUsers.length) {
      setSelectedUserIds(new Set());
    } else {
      setSelectedUserIds(new Set(paginatedUsers.map(user => user.id)));
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { color: 'bg-success text-success-foreground', label: 'Active' },
      inactive: { color: 'bg-secondary-400 text-secondary-foreground', label: 'Inactive' },
      suspended: { color: 'bg-error text-error-foreground', label: 'Suspended' }
    };
    
    const config = statusConfig[status] || statusConfig.inactive;
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const getComplianceBadge = (status) => {
    const statusConfig = {
      compliant: { color: 'bg-success-100 text-success-700', label: 'Compliant', icon: 'CheckCircle' },
      warning: { color: 'bg-warning-100 text-warning-700', label: 'Warning', icon: 'AlertTriangle' },
      violation: { color: 'bg-error-100 text-error-700', label: 'Violation', icon: 'XCircle' }
    };
    
    const config = statusConfig[status] || statusConfig.compliant;
    return (
      <div className={`flex items-center space-x-1 px-2 py-1 text-xs font-medium rounded-full ${config.color}`}>
        <Icon name={config.icon} size={12} />
        <span>{config.label}</span>
      </div>
    );
  };

  const formatLastLogin = (date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h ago`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)}d ago`;
    }
  };

  return (
    <div className="h-full bg-surface flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-heading font-semibold text-text-primary">
            User Management
          </h2>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              iconName="Download"
              onClick={() => console.log('Export users')}
            >
              Export
            </Button>
            <Button
              variant="primary"
              size="sm"
              iconName="UserPlus"
              onClick={() => console.log('Add user')}
            >
              Add User
            </Button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex items-center space-x-4 mb-4">
          <div className="flex-1 relative">
            <Icon
              name="Search"
              size={16}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary"
            />
            <Input
              type="search"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="px-3 py-2 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="all">All Roles</option>
            <option value="Senior Analyst">Senior Analyst</option>
            <option value="Threat Hunter">Threat Hunter</option>
            <option value="OSINT Specialist">OSINT Specialist</option>
            <option value="Forensics Investigator">Forensics Investigator</option>
            <option value="Security Admin">Security Admin</option>
          </select>
          <select
            value={filterClearance}
            onChange={(e) => setFilterClearance(e.target.value)}
            className="px-3 py-2 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="all">All Clearances</option>
            <option value="Level 1">Level 1</option>
            <option value="Level 2">Level 2</option>
            <option value="Level 3">Level 3</option>
            <option value="Level 4">Level 4</option>
          </select>
        </div>

        {/* Bulk Actions */}
        {selectedUserIds.size > 0 && (
          <div className="flex items-center justify-between p-3 bg-primary-50 border border-primary-200 rounded-lg">
            <span className="text-sm font-medium text-primary">
              {selectedUserIds.size} user{selectedUserIds.size !== 1 ? 's' : ''} selected
            </span>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                iconName="UserCheck"
                onClick={() => onBulkAction('activate', Array.from(selectedUserIds))}
              >
                Activate
              </Button>
              <Button
                variant="outline"
                size="sm"
                iconName="UserX"
                onClick={() => onBulkAction('deactivate', Array.from(selectedUserIds))}
              >
                Deactivate
              </Button>
              <Button
                variant="outline"
                size="sm"
                iconName="Settings"
                onClick={() => onBulkAction('permissions', Array.from(selectedUserIds))}
              >
                Permissions
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* User Grid */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto">
          <table className="w-full">
            <thead className="bg-background border-b border-border sticky top-0">
              <tr>
                <th className="w-12 p-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedUserIds.size === paginatedUsers.length && paginatedUsers.length > 0}
                    onChange={handleSelectAll}
                    className="rounded border-border focus:ring-primary"
                  />
                </th>
                <th className="p-3 text-left">
                  <button
                    onClick={() => handleSort('fullName')}
                    className="flex items-center space-x-1 text-sm font-heading font-medium text-text-primary hover:text-primary"
                  >
                    <span>User</span>
                    <Icon name="ArrowUpDown" size={12} />
                  </button>
                </th>
                <th className="p-3 text-left">
                  <button
                    onClick={() => handleSort('role')}
                    className="flex items-center space-x-1 text-sm font-heading font-medium text-text-primary hover:text-primary"
                  >
                    <span>Role</span>
                    <Icon name="ArrowUpDown" size={12} />
                  </button>
                </th>
                <th className="p-3 text-left">
                  <button
                    onClick={() => handleSort('clearanceLevel')}
                    className="flex items-center space-x-1 text-sm font-heading font-medium text-text-primary hover:text-primary"
                  >
                    <span>Clearance</span>
                    <Icon name="ArrowUpDown" size={12} />
                  </button>
                </th>
                <th className="p-3 text-left">
                  <button
                    onClick={() => handleSort('lastLogin')}
                    className="flex items-center space-x-1 text-sm font-heading font-medium text-text-primary hover:text-primary"
                  >
                    <span>Last Login</span>
                    <Icon name="ArrowUpDown" size={12} />
                  </button>
                </th>
                <th className="p-3 text-left">
                  <span className="text-sm font-heading font-medium text-text-primary">Sessions</span>
                </th>
                <th className="p-3 text-left">
                  <span className="text-sm font-heading font-medium text-text-primary">Status</span>
                </th>
                <th className="p-3 text-left">
                  <span className="text-sm font-heading font-medium text-text-primary">Compliance</span>
                </th>
                <th className="p-3 text-left">
                  <span className="text-sm font-heading font-medium text-text-primary">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedUsers.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-border hover:bg-background transition-micro cursor-pointer"
                  onClick={() => onUserSelect(user)}
                >
                  <td className="p-3">
                    <input
                      type="checkbox"
                      checked={selectedUserIds.has(user.id)}
                      onChange={() => handleSelectUser(user.id)}
                      onClick={(e) => e.stopPropagation()}
                      className="rounded border-border focus:ring-primary"
                    />
                  </td>
                  <td className="p-3">
                    <div className="flex items-center space-x-3">
                      <img
                        src={user.avatar}
                        alt={user.fullName}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div>
                        <p className="text-sm font-heading font-medium text-text-primary">
                          {user.fullName}
                        </p>
                        <p className="text-xs text-text-secondary font-caption">
                          @{user.username}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-3">
                    <span className="text-sm text-text-primary">{user.role}</span>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${
                        user.clearanceLevel === 'Level 4' ? 'bg-error' :
                        user.clearanceLevel === 'Level 3' ? 'bg-warning' :
                        user.clearanceLevel === 'Level 2' ? 'bg-primary' : 'bg-success'
                      }`} />
                      <span className="text-sm text-text-primary">{user.clearanceLevel}</span>
                    </div>
                  </td>
                  <td className="p-3">
                    <span className="text-sm text-text-secondary">
                      {formatLastLogin(user.lastLogin)}
                    </span>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-success rounded-full pulse-subtle" />
                      <span className="text-sm text-text-primary">{user.activeSessions}</span>
                    </div>
                  </td>
                  <td className="p-3">
                    {getStatusBadge(user.status)}
                  </td>
                  <td className="p-3">
                    {getComplianceBadge(user.complianceStatus)}
                  </td>
                  <td className="p-3">
                    <div className="flex items-center space-x-1">
                      <Button
                        variant="ghost"
                        size="xs"
                        iconName="Edit"
                        onClick={(e) => {
                          e.stopPropagation();
                          console.log('Edit user', user.id);
                        }}
                      />
                      <Button
                        variant="ghost"
                        size="xs"
                        iconName="MoreVertical"
                        onClick={(e) => {
                          e.stopPropagation();
                          console.log('More actions', user.id);
                        }}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center justify-between">
          <span className="text-sm text-text-secondary">
            Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, sortedUsers.length)} of {sortedUsers.length} users
          </span>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              iconName="ChevronLeft"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            />
            <span className="text-sm text-text-primary">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              iconName="ChevronRight"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagementGrid;