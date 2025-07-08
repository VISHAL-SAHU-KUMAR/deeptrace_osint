import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';


const PermissionDetailPanel = ({ selectedUser, onPermissionUpdate }) => {
  const [activeTab, setActiveTab] = useState('permissions');
  const [editMode, setEditMode] = useState(false);

  if (!selectedUser) {
    return (
      <div className="h-full bg-surface border-l border-border flex items-center justify-center">
        <div className="text-center">
          <Icon name="UserCheck" size={48} className="text-text-tertiary mx-auto mb-4" />
          <h3 className="text-lg font-heading font-medium text-text-primary mb-2">
            Select a User
          </h3>
          <p className="text-sm text-text-secondary">
            Choose a user from the list to view and manage their permissions
          </p>
        </div>
      </div>
    );
  }

  const permissionCategories = [
    {
      id: 'investigations',
      name: 'Investigations',
      icon: 'Search',
      permissions: [
        { id: 'create_case', name: 'Create Cases', granted: true, level: 'full' },
        { id: 'view_cases', name: 'View Cases', granted: true, level: 'department' },
        { id: 'edit_cases', name: 'Edit Cases', granted: true, level: 'own' },
        { id: 'delete_cases', name: 'Delete Cases', granted: false, level: 'none' },
        { id: 'assign_cases', name: 'Assign Cases', granted: true, level: 'team' }
      ]
    },
    {
      id: 'data_collection',
      name: 'Data Collection',
      icon: 'Database',
      permissions: [
        { id: 'social_media', name: 'Social Media APIs', granted: true, level: 'full' },
        { id: 'domain_analysis', name: 'Domain Analysis', granted: true, level: 'full' },
        { id: 'email_investigation', name: 'Email Investigation', granted: true, level: 'restricted' },
        { id: 'phone_lookup', name: 'Phone Lookup', granted: false, level: 'none' },
        { id: 'image_search', name: 'Image Search', granted: true, level: 'full' }
      ]
    },
    {
      id: 'analysis_tools',
      name: 'Analysis Tools',
      icon: 'Brain',
      permissions: [
        { id: 'network_analysis', name: 'Network Analysis', granted: true, level: 'full' },
        { id: 'timeline_creation', name: 'Timeline Creation', granted: true, level: 'full' },
        { id: 'geospatial_mapping', name: 'Geospatial Mapping', granted: true, level: 'restricted' },
        { id: 'entity_extraction', name: 'Entity Extraction', granted: true, level: 'full' },
        { id: 'sentiment_analysis', name: 'Sentiment Analysis', granted: false, level: 'none' }
      ]
    },
    {
      id: 'reporting',
      name: 'Reporting',
      icon: 'FileText',
      permissions: [
        { id: 'generate_reports', name: 'Generate Reports', granted: true, level: 'full' },
        { id: 'export_data', name: 'Export Data', granted: true, level: 'restricted' },
        { id: 'share_reports', name: 'Share Reports', granted: true, level: 'internal' },
        { id: 'schedule_reports', name: 'Schedule Reports', granted: false, level: 'none' }
      ]
    },
    {
      id: 'administration',
      name: 'Administration',
      icon: 'Settings',
      permissions: [
        { id: 'user_management', name: 'User Management', granted: false, level: 'none' },
        { id: 'system_config', name: 'System Configuration', granted: false, level: 'none' },
        { id: 'audit_logs', name: 'Audit Logs', granted: true, level: 'view_only' },
        { id: 'backup_restore', name: 'Backup & Restore', granted: false, level: 'none' }
      ]
    }
  ];

  const sessionHistory = [
    {
      id: 'sess_001',
      timestamp: new Date('2024-01-15T14:30:00'),
      ipAddress: '192.168.1.100',
      location: 'New York, NY',
      device: 'Chrome on Windows',
      duration: '2h 15m',
      status: 'active'
    },
    {
      id: 'sess_002',
      timestamp: new Date('2024-01-15T09:15:00'),
      ipAddress: '192.168.1.100',
      location: 'New York, NY',
      device: 'Chrome on Windows',
      duration: '4h 30m',
      status: 'ended'
    },
    {
      id: 'sess_003',
      timestamp: new Date('2024-01-14T16:45:00'),
      ipAddress: '10.0.0.50',
      location: 'New York, NY',
      device: 'Firefox on macOS',
      duration: '1h 45m',
      status: 'ended'
    }
  ];

  const auditEvents = [
    {
      id: 'audit_001',
      timestamp: new Date('2024-01-15T14:25:00'),
      action: 'Permission Updated',
      details: 'Email investigation access granted',
      performedBy: 'admin@deeptrace.com',
      severity: 'medium'
    },
    {
      id: 'audit_002',
      timestamp: new Date('2024-01-15T10:30:00'),
      action: 'Login Success',
      details: 'Successful authentication from 192.168.1.100',
      performedBy: selectedUser.email,
      severity: 'low'
    },
    {
      id: 'audit_003',
      timestamp: new Date('2024-01-14T17:15:00'),
      action: 'Case Access',
      details: 'Accessed case INV-2024-001',
      performedBy: selectedUser.email,
      severity: 'low'
    }
  ];

  const getPermissionLevelColor = (level) => {
    switch (level) {
      case 'full':
        return 'text-success';
      case 'restricted': case'department': case'team': case'own':
        return 'text-warning';
      case 'view_only':
        return 'text-primary';
      case 'none':
        return 'text-text-tertiary';
      default:
        return 'text-text-secondary';
    }
  };

  const getPermissionLevelLabel = (level) => {
    const labels = {
      full: 'Full Access',
      restricted: 'Restricted',
      department: 'Department',
      team: 'Team Only',
      own: 'Own Only',
      view_only: 'View Only',
      internal: 'Internal Only',
      none: 'No Access'
    };
    return labels[level] || level;
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high':
        return 'text-error';
      case 'medium':
        return 'text-warning';
      case 'low':
        return 'text-success';
      default:
        return 'text-text-secondary';
    }
  };

  const formatTimestamp = (date) => {
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const tabs = [
    { id: 'permissions', label: 'Permissions', icon: 'Shield' },
    { id: 'sessions', label: 'Sessions', icon: 'Monitor' },
    { id: 'audit', label: 'Audit Trail', icon: 'History' }
  ];

  return (
    <div className="h-full bg-surface border-l border-border flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <img
              src={selectedUser.avatar}
              alt={selectedUser.fullName}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h2 className="text-lg font-heading font-semibold text-text-primary">
                {selectedUser.fullName}
              </h2>
              <p className="text-sm text-text-secondary">
                {selectedUser.role} • {selectedUser.clearanceLevel}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant={editMode ? 'primary' : 'outline'}
              size="sm"
              iconName={editMode ? 'Save' : 'Edit'}
              onClick={() => setEditMode(!editMode)}
            >
              {editMode ? 'Save' : 'Edit'}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              iconName="MoreVertical"
              onClick={() => console.log('More actions')}
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-background rounded-lg p-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-3 py-2 text-sm font-medium rounded-md transition-micro ${
                activeTab === tab.id
                  ? 'bg-surface text-primary shadow-primary'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              <Icon name={tab.icon} size={16} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'permissions' && (
          <div className="space-y-6">
            {permissionCategories.map((category) => (
              <div key={category.id} className="bg-background rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-4">
                  <Icon name={category.icon} size={20} className="text-primary" />
                  <h3 className="text-lg font-heading font-semibold text-text-primary">
                    {category.name}
                  </h3>
                </div>
                <div className="space-y-3">
                  {category.permissions.map((permission) => (
                    <div key={permission.id} className="flex items-center justify-between py-2">
                      <div className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={permission.granted}
                          disabled={!editMode}
                          onChange={() => console.log('Toggle permission', permission.id)}
                          className="rounded border-border focus:ring-primary"
                        />
                        <span className="text-sm font-medium text-text-primary">
                          {permission.name}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`text-xs font-medium ${getPermissionLevelColor(permission.level)}`}>
                          {getPermissionLevelLabel(permission.level)}
                        </span>
                        {editMode && (
                          <select
                            value={permission.level}
                            onChange={(e) => console.log('Change level', permission.id, e.target.value)}
                            className="text-xs border border-border rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-primary"
                          >
                            <option value="full">Full Access</option>
                            <option value="restricted">Restricted</option>
                            <option value="department">Department</option>
                            <option value="team">Team Only</option>
                            <option value="own">Own Only</option>
                            <option value="view_only">View Only</option>
                            <option value="none">No Access</option>
                          </select>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'sessions' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-heading font-semibold text-text-primary">
                Active Sessions
              </h3>
              <Button
                variant="outline"
                size="sm"
                iconName="LogOut"
                onClick={() => console.log('Terminate all sessions')}
              >
                Terminate All
              </Button>
            </div>
            <div className="space-y-3">
              {sessionHistory.map((session) => (
                <div key={session.id} className="bg-background rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${
                        session.status === 'active' ? 'bg-success pulse-subtle' : 'bg-text-tertiary'
                      }`} />
                      <span className="text-sm font-medium text-text-primary">
                        {session.device}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        session.status === 'active' ?'bg-success-100 text-success-700' :'bg-secondary-100 text-secondary-700'
                      }`}>
                        {session.status}
                      </span>
                    </div>
                    {session.status === 'active' && (
                      <Button
                        variant="ghost"
                        size="xs"
                        iconName="X"
                        onClick={() => console.log('Terminate session', session.id)}
                      />
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm text-text-secondary">
                    <div>
                      <span className="font-medium">IP Address:</span> {session.ipAddress}
                    </div>
                    <div>
                      <span className="font-medium">Location:</span> {session.location}
                    </div>
                    <div>
                      <span className="font-medium">Started:</span> {formatTimestamp(session.timestamp)}
                    </div>
                    <div>
                      <span className="font-medium">Duration:</span> {session.duration}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'audit' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-heading font-semibold text-text-primary">
                Recent Activity
              </h3>
              <Button
                variant="outline"
                size="sm"
                iconName="Download"
                onClick={() => console.log('Export audit log')}
              >
                Export
              </Button>
            </div>
            <div className="space-y-3">
              {auditEvents.map((event) => (
                <div key={event.id} className="bg-background rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${getSeverityColor(event.severity).replace('text-', 'bg-')}`} />
                      <span className="text-sm font-medium text-text-primary">
                        {event.action}
                      </span>
                    </div>
                    <span className="text-xs text-text-tertiary">
                      {formatTimestamp(event.timestamp)}
                    </span>
                  </div>
                  <p className="text-sm text-text-secondary mb-2">
                    {event.details}
                  </p>
                  <div className="flex items-center justify-between text-xs text-text-tertiary">
                    <span>Performed by: {event.performedBy}</span>
                    <span className={`px-2 py-1 rounded-full ${
                      event.severity === 'high' ? 'bg-error-100 text-error-700' :
                      event.severity === 'medium'? 'bg-warning-100 text-warning-700' : 'bg-success-100 text-success-700'
                    }`}>
                      {event.severity}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PermissionDetailPanel;