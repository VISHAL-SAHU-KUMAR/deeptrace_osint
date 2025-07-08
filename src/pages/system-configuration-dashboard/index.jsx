import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

import ConfigurationTable from './components/ConfigurationTable';
import IntegrationMonitor from './components/IntegrationMonitor';
import PerformanceMetrics from './components/PerformanceMetrics';
import ChangeManagement from './components/ChangeManagement';
import SecurityPolicies from './components/SecurityPolicies';

const SystemConfigurationDashboard = () => {
  const [activeTab, setActiveTab] = useState('configurations');
  const [selectedItems, setSelectedItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showBulkActions, setShowBulkActions] = useState(false);

  // Mock data for configurations
  const [configurations, setConfigurations] = useState([
    {
      id: 1,
      name: "API_RATE_LIMIT",
      category: "Performance",
      currentValue: "1000",
      defaultValue: "500",
      lastModified: "2024-01-15 14:30",
      modifiedBy: "admin@deeptrace.com",
      status: "valid",
      impact: "medium",
      canEdit: true,
      isModified: true
    },
    {
      id: 2,
      name: "SESSION_TIMEOUT",
      category: "Security",
      currentValue: "3600",
      defaultValue: "1800",
      lastModified: "2024-01-14 09:15",
      modifiedBy: "security@deeptrace.com",
      status: "valid",
      impact: "high",
      canEdit: true,
      isModified: true
    },
    {
      id: 3,
      name: "MAX_CONCURRENT_USERS",
      category: "Performance",
      currentValue: "500",
      defaultValue: "100",
      lastModified: "2024-01-13 16:45",
      modifiedBy: "admin@deeptrace.com",
      status: "warning",
      impact: "critical",
      canEdit: true,
      isModified: true
    },
    {
      id: 4,
      name: "ENCRYPTION_ALGORITHM",
      category: "Security",
      currentValue: "AES-256",
      defaultValue: "AES-128",
      lastModified: "2024-01-12 11:20",
      modifiedBy: "security@deeptrace.com",
      status: "valid",
      impact: "high",
      canEdit: false,
      isModified: true
    },
    {
      id: 5,
      name: "LOG_RETENTION_DAYS",
      category: "Audit",
      currentValue: "90",
      defaultValue: "30",
      lastModified: "2024-01-11 13:10",
      modifiedBy: "audit@deeptrace.com",
      status: "valid",
      impact: "low",
      canEdit: true,
      isModified: true
    }
  ]);

  // Mock data for integrations
  const [integrations, setIntegrations] = useState([
    {
      id: 1,
      name: "Twitter API",
      type: "Social Media",
      icon: "Twitter",
      status: "active",
      health: "healthy",
      responseTime: 145,
      avgResponseTime: 132,
      rateLimitUsed: 750,
      rateLimitTotal: 1000,
      lastCheck: "2 min ago",
      uptime: "99.8%",
      requestsToday: 2847,
      errorCount: 3,
      endpoint: "https://api.twitter.com/2/",
      version: "v2.0",
      timeout: 30,
      retryCount: 3,
      description: "Twitter API integration for social media intelligence gathering",
      recentActivity: [
        { type: "success", message: "Rate limit reset", time: "2 min ago" },
        { type: "success", message: "Health check passed", time: "5 min ago" },
        { type: "error", message: "Timeout on request", time: "1 hour ago" }
      ]
    },
    {
      id: 2,
      name: "VirusTotal",
      type: "Threat Intelligence",
      icon: "Shield",
      status: "active",
      health: "warning",
      responseTime: 890,
      avgResponseTime: 456,
      rateLimitUsed: 450,
      rateLimitTotal: 500,
      lastCheck: "1 min ago",
      uptime: "97.2%",
      requestsToday: 1234,
      errorCount: 12,
      endpoint: "https://www.virustotal.com/vtapi/v2/",
      version: "v2.0",
      timeout: 45,
      retryCount: 2,
      description: "VirusTotal API for malware and threat analysis",
      recentActivity: [
        { type: "error", message: "High response time detected", time: "1 min ago" },
        { type: "success", message: "API key validated", time: "10 min ago" }
      ]
    },
    {
      id: 3,
      name: "Shodan",
      type: "Network Intelligence",
      icon: "Globe",
      status: "active",
      health: "healthy",
      responseTime: 234,
      avgResponseTime: 298,
      rateLimitUsed: 89,
      rateLimitTotal: 1000,
      lastCheck: "30 sec ago",
      uptime: "99.9%",
      requestsToday: 567,
      errorCount: 1,
      endpoint: "https://api.shodan.io/",
      version: "v1.0",
      timeout: 30,
      retryCount: 3,
      description: "Shodan API for internet-connected device discovery",
      recentActivity: [
        { type: "success", message: "Query executed successfully", time: "30 sec ago" },
        { type: "success", message: "Connection established", time: "2 min ago" }
      ]
    }
  ]);

  // Mock data for performance metrics
  const performanceMetrics = {
    cpu: 67,
    memory: 78,
    storage: 45,
    network: 23,
    cpuCores: 8,
    cpuLoad: 2.3,
    memoryUsed: 12.5,
    memoryTotal: 16,
    storageUsed: 2.3,
    storageTotal: 5,
    networkIn: 45.2,
    networkOut: 23.8,
    activeUsers: 89,
    queriesPerSecond: 234,
    avgQueryTime: 145,
    slowQueries: 12,
    failedQueries: 3,
    cacheHitRate: 87,
    indexUsage: 92,
    alerts: [
      {
        severity: "warning",
        title: "High Memory Usage",
        message: "Memory usage has exceeded 75% threshold",
        timestamp: "2024-01-15 14:30:00"
      },
      {
        severity: "critical",
        title: "CPU Spike Detected",
        message: "CPU usage spiked to 95% for 5 minutes",
        timestamp: "2024-01-15 13:45:00"
      }
    ]
  };

  // Mock data for change management
  const [changes, setChanges] = useState([
    {
      id: 1,
      title: "Update API Rate Limits",
      description: "Increase API rate limits to handle growing user base and prevent service degradation during peak hours",
      status: "pending",
      priority: "high",
      impact: "medium",
      requestedBy: "John Smith",
      requestedDate: "2024-01-15",
      scheduledDate: "2024-01-20",
      estimatedDuration: "2 hours",
      downtime: "None",
      canRollback: true,
      category: "Performance",
      affectedSystems: ["API Gateway", "Load Balancer", "Monitoring"],
      approvals: [
        { approver: "Tech Lead", status: "approved", date: "2024-01-15" },
        { approver: "Security Team", status: "pending", date: null }
      ],
      comments: [
        { author: "John Smith", message: "This change is critical for handling increased load", date: "2024-01-15 10:30" }
      ]
    },
    {
      id: 2,
      title: "Security Policy Update",
      description: "Implement new password complexity requirements and multi-factor authentication for all administrative accounts",
      status: "approved",
      priority: "critical",
      impact: "high",
      requestedBy: "Sarah Johnson",
      requestedDate: "2024-01-14",
      scheduledDate: "2024-01-18",
      estimatedDuration: "4 hours",
      downtime: "15 minutes",
      canRollback: false,
      category: "Security",
      affectedSystems: ["Authentication Service", "User Management", "Admin Portal"],
      approvals: [
        { approver: "Security Lead", status: "approved", date: "2024-01-14" },
        { approver: "Operations Manager", status: "approved", date: "2024-01-15" }
      ],
      comments: [
        { author: "Sarah Johnson", message: "Compliance requirement for SOC2 certification", date: "2024-01-14 14:20" },
        { author: "Security Lead", message: "Approved with minor modifications", date: "2024-01-14 16:45" }
      ]
    }
  ]);

  // Mock data for security policies
  const [securityPolicies, setSecurityPolicies] = useState([
    {
      id: 1,
      name: "Password Policy",
      category: "authentication",
      description: "Enforces strong password requirements including minimum length, complexity, and rotation policies",
      status: "active",
      severity: "high",
      enforcement: "block",
      autoRemediation: true,
      compliance: ["SOC2", "ISO 27001", "NIST"],
      lastUpdated: "2024-01-10",
      rules: [
        { name: "Minimum Length", description: "Password must be at least 12 characters", enabled: true },
        { name: "Complexity", description: "Must contain uppercase, lowercase, numbers, and symbols", enabled: true },
        { name: "History", description: "Cannot reuse last 12 passwords", enabled: true }
      ],
      violations: [
        { type: "Weak Password", description: "User attempted to set password with insufficient complexity", timestamp: "2024-01-15 14:30", user: "user@example.com" }
      ]
    },
    {
      id: 2,
      name: "Multi-Factor Authentication",
      category: "authentication",
      description: "Requires additional authentication factors for sensitive operations and administrative access",
      status: "active",
      severity: "critical",
      enforcement: "block",
      autoRemediation: false,
      compliance: ["SOC2", "PCI DSS", "HIPAA"],
      lastUpdated: "2024-01-08",
      rules: [
        { name: "Admin MFA", description: "All administrative accounts must use MFA", enabled: true },
        { name: "Sensitive Operations", description: "MFA required for configuration changes", enabled: true }
      ],
      violations: []
    }
  ]);

  useEffect(() => {
    setShowBulkActions(selectedItems.length > 0);
  }, [selectedItems]);

  const handleConfigurationUpdate = (id, newValue) => {
    setConfigurations(prev => prev.map(config => 
      config.id === id 
        ? { ...config, currentValue: newValue, lastModified: new Date().toLocaleString(), isModified: true }
        : config
    ));
  };

  const handleBulkUpdate = (updates) => {
    console.log('Bulk update:', updates);
    // Implement bulk update logic
  };

  const handleIntegrationRefresh = (id) => {
    setIntegrations(prev => prev.map(integration =>
      integration.id === id
        ? { ...integration, lastCheck: 'Just now', health: 'healthy' }
        : integration
    ));
  };

  const handleIntegrationToggle = (id) => {
    setIntegrations(prev => prev.map(integration =>
      integration.id === id
        ? { ...integration, status: integration.status === 'active' ? 'inactive' : 'active' }
        : integration
    ));
  };

  const handleChangeApprove = (id) => {
    setChanges(prev => prev.map(change =>
      change.id === id ? { ...change, status: 'approved' } : change
    ));
  };

  const handleChangeReject = (id) => {
    setChanges(prev => prev.map(change =>
      change.id === id ? { ...change, status: 'rejected' } : change
    ));
  };

  const handleChangeRollback = (id) => {
    setChanges(prev => prev.map(change =>
      change.id === id ? { ...change, status: 'rolled_back' } : change
    ));
  };

  const handlePolicyUpdate = (id, updatedPolicy) => {
    setSecurityPolicies(prev => prev.map(policy =>
      policy.id === id ? { ...updatedPolicy, lastUpdated: new Date().toISOString().split('T')[0] } : policy
    ));
  };

  const handlePolicyToggle = (id) => {
    setSecurityPolicies(prev => prev.map(policy =>
      policy.id === id
        ? { ...policy, status: policy.status === 'active' ? 'inactive' : 'active' }
        : policy
    ));
  };

  const tabs = [
    { id: 'configurations', label: 'Configuration Settings', icon: 'Settings' },
    { id: 'integrations', label: 'API Integrations', icon: 'Zap' },
    { id: 'performance', label: 'Performance Metrics', icon: 'BarChart3' },
    { id: 'changes', label: 'Change Management', icon: 'GitBranch' },
    { id: 'security', label: 'Security Policies', icon: 'Shield' }
  ];

  const handleKeyboardShortcuts = (e) => {
    if (e.ctrlKey || e.metaKey) {
      switch (e.key) {
        case 'c':
          e.preventDefault();
          setActiveTab('configurations');
          break;
        case 'v':
          e.preventDefault();
          console.log('Validate configurations');
          break;
        case 'r':
          e.preventDefault();
          console.log('Rollback changes');
          break;
        default:
          break;
      }
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyboardShortcuts);
    return () => document.removeEventListener('keydown', handleKeyboardShortcuts);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar />
      
      <main className="ml-64 mt-16 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-heading font-bold text-text-primary">
                  System Configuration Dashboard
                </h1>
                <p className="text-text-secondary font-caption mt-1">
                  Centralized management of platform settings, integrations, and operational parameters
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Download"
                  onClick={() => console.log('Export configuration')}
                >
                  Export Config
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Upload"
                  onClick={() => console.log('Import configuration')}
                >
                  Import Config
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  iconName="Save"
                  onClick={() => console.log('Save all changes')}
                >
                  Save All
                </Button>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-surface border border-border rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                  <Icon name="Settings" size={20} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm text-text-secondary font-caption">Total Configurations</p>
                  <p className="text-xl font-heading font-semibold text-text-primary">
                    {configurations.length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-surface border border-border rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-success-100 rounded-lg flex items-center justify-center">
                  <Icon name="Zap" size={20} className="text-success" />
                </div>
                <div>
                  <p className="text-sm text-text-secondary font-caption">Active Integrations</p>
                  <p className="text-xl font-heading font-semibold text-text-primary">
                    {integrations.filter(i => i.status === 'active').length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-surface border border-border rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-warning-100 rounded-lg flex items-center justify-center">
                  <Icon name="GitBranch" size={20} className="text-warning" />
                </div>
                <div>
                  <p className="text-sm text-text-secondary font-caption">Pending Changes</p>
                  <p className="text-xl font-heading font-semibold text-text-primary">
                    {changes.filter(c => c.status === 'pending').length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-surface border border-border rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-accent-100 rounded-lg flex items-center justify-center">
                  <Icon name="Shield" size={20} className="text-accent" />
                </div>
                <div>
                  <p className="text-sm text-text-secondary font-caption">Security Policies</p>
                  <p className="text-xl font-heading font-semibold text-text-primary">
                    {securityPolicies.filter(p => p.status === 'active').length}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="bg-surface border border-border rounded-lg mb-6">
            <div className="flex overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-4 text-sm font-heading font-medium border-b-2 transition-micro whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-primary text-primary bg-primary-50' :'border-transparent text-text-secondary hover:text-text-primary hover:bg-background'
                  }`}
                >
                  <Icon name={tab.icon} size={16} />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Bulk Actions Bar */}
          {showBulkActions && (
            <div className="bg-primary-50 border border-primary-200 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Icon name="CheckSquare" size={20} className="text-primary" />
                  <span className="text-sm font-heading font-medium text-primary">
                    {selectedItems.length} items selected
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="primary"
                    size="sm"
                    iconName="Edit"
                    onClick={() => handleBulkUpdate(selectedItems)}
                  >
                    Bulk Edit
                  </Button>
                  <Button
                    variant="warning"
                    size="sm"
                    iconName="RotateCcw"
                    onClick={() => console.log('Bulk reset', selectedItems)}
                  >
                    Reset to Default
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="X"
                    onClick={() => setSelectedItems([])}
                  >
                    Clear Selection
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Tab Content */}
          <div className="bg-surface border border-border rounded-lg p-6">
            {activeTab === 'configurations' && (
              <ConfigurationTable
                configurations={configurations}
                onUpdate={handleConfigurationUpdate}
                onBulkUpdate={handleBulkUpdate}
                selectedItems={selectedItems}
                onSelectionChange={setSelectedItems}
              />
            )}

            {activeTab === 'integrations' && (
              <IntegrationMonitor
                integrations={integrations}
                onRefresh={handleIntegrationRefresh}
                onToggle={handleIntegrationToggle}
              />
            )}

            {activeTab === 'performance' && (
              <PerformanceMetrics metrics={performanceMetrics} />
            )}

            {activeTab === 'changes' && (
              <ChangeManagement
                changes={changes}
                onApprove={handleChangeApprove}
                onReject={handleChangeReject}
                onRollback={handleChangeRollback}
              />
            )}

            {activeTab === 'security' && (
              <SecurityPolicies
                policies={securityPolicies}
                onUpdate={handlePolicyUpdate}
                onToggle={handlePolicyToggle}
              />
            )}
          </div>

          {/* Keyboard Shortcuts Help */}
          <div className="mt-6 bg-background border border-border rounded-lg p-4">
            <h3 className="text-sm font-heading font-medium text-text-primary mb-2">
              Keyboard Shortcuts
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="flex items-center space-x-2">
                <kbd className="px-2 py-1 bg-secondary-100 text-text-secondary rounded font-data">Ctrl+C</kbd>
                <span className="text-text-secondary font-caption">Switch to Configurations</span>
              </div>
              <div className="flex items-center space-x-2">
                <kbd className="px-2 py-1 bg-secondary-100 text-text-secondary rounded font-data">Ctrl+V</kbd>
                <span className="text-text-secondary font-caption">Validate Settings</span>
              </div>
              <div className="flex items-center space-x-2">
                <kbd className="px-2 py-1 bg-secondary-100 text-text-secondary rounded font-data">Ctrl+R</kbd>
                <span className="text-text-secondary font-caption">Rollback Changes</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SystemConfigurationDashboard;