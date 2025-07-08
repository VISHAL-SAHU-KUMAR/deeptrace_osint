import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import AuditLogGrid from './components/AuditLogGrid';
import ActivityAnalysisPanel from './components/ActivityAnalysisPanel';
import FilterPanel from './components/FilterPanel';
import RealTimeStream from './components/RealTimeStream';
import ComplianceReporting from './components/ComplianceReporting';

const AuditTrailViewer = () => {
  const [activeView, setActiveView] = useState('audit-logs');
  const [selectedLogs, setSelectedLogs] = useState([]);
  const [filters, setFilters] = useState({});
  const [isRealTimeActive, setIsRealTimeActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Mock audit log data
  const auditLogs = [
    {
      id: 1,
      timestamp: new Date(Date.now() - 300000),
      user: 'john.doe@deeptrace.com',
      userRole: 'Senior Analyst',
      action: 'Data Export',
      actionIcon: 'Download',
      actionCategory: 'Data Access',
      resource: '/api/investigations/case-2024-001/evidence',
      ipAddress: '192.168.1.45',
      status: 'success',
      severity: 'medium',
      anomaly: false
    },
    {
      id: 2,
      timestamp: new Date(Date.now() - 600000),
      user: 'sarah.wilson@deeptrace.com',
      userRole: 'Threat Analyst',
      action: 'Failed Login',
      actionIcon: 'LogIn',
      actionCategory: 'Authentication',
      resource: '/auth/login',
      ipAddress: '203.0.113.15',
      status: 'failed',
      severity: 'high',
      anomaly: true
    },
    {
      id: 3,
      timestamp: new Date(Date.now() - 900000),
      user: 'admin@deeptrace.com',
      userRole: 'System Administrator',
      action: 'Configuration Change',
      actionIcon: 'Settings',
      actionCategory: 'System Admin',
      resource: '/admin/system/security-settings',
      ipAddress: '192.168.1.10',
      status: 'success',
      severity: 'critical',
      anomaly: false
    },
    {
      id: 4,
      timestamp: new Date(Date.now() - 1200000),
      user: 'mike.chen@deeptrace.com',
      userRole: 'Digital Forensics',
      action: 'Evidence Access',
      actionIcon: 'FileText',
      actionCategory: 'Data Access',
      resource: '/evidence/digital-forensics/case-2024-002',
      ipAddress: '192.168.1.78',
      status: 'success',
      severity: 'low',
      anomaly: false
    },
    {
      id: 5,
      timestamp: new Date(Date.now() - 1500000),
      user: 'analyst.team@deeptrace.com',
      userRole: 'Intelligence Analyst',
      action: 'Report Generation',
      actionIcon: 'FileText',
      actionCategory: 'Reporting',
      resource: '/reports/threat-intelligence/weekly-summary',
      ipAddress: '192.168.1.92',
      status: 'success',
      severity: 'low',
      anomaly: false
    }
  ];

  const savedFilters = [
    {
      name: 'Security Incidents',
      filters: {
        severity: ['high', 'critical'],
        status: ['failed'],
        anomaliesOnly: true
      }
    },
    {
      name: 'Admin Activities',
      filters: {
        users: ['Administrators'],
        actions: ['Configuration Change', 'System Admin']
      }
    },
    {
      name: 'Data Access',
      filters: {
        actions: ['Data Export', 'Evidence Access', 'Data Access']
      }
    }
  ];

  const viewTabs = [
    { id: 'audit-logs', label: 'Audit Logs', icon: 'List' },
    { id: 'real-time', label: 'Real-Time Stream', icon: 'Activity' },
    { id: 'compliance', label: 'Compliance Reports', icon: 'FileText' },
    { id: 'analytics', label: 'Analytics', icon: 'BarChart3' }
  ];

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 'f':
            e.preventDefault();
            document.querySelector('input[placeholder*="Search"]')?.focus();
            break;
          case 'e':
            e.preventDefault();
            if (selectedLogs.length > 0) {
              handleExport(selectedLogs);
            }
            break;
          case 'r':
            e.preventDefault();
            setIsRealTimeActive(!isRealTimeActive);
            break;
          default:
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [selectedLogs, isRealTimeActive]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    console.log('Filters applied:', newFilters);
  };

  const handleSaveFilter = (filterData) => {
    console.log('Save filter:', filterData);
    // Implementation for saving filters
  };

  const handleExport = (logIds) => {
    console.log('Export logs:', logIds);
    // Implementation for exporting logs
  };

  const handleCreateAlert = (logIds) => {
    console.log('Create alert for logs:', logIds);
    // Implementation for creating alerts
  };

  const handleGenerateReport = (reportData) => {
    console.log('Generate compliance report:', reportData);
    // Implementation for generating compliance reports
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      console.log('Search query:', searchQuery);
      // Implementation for search functionality
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar />
      
      <main className="ml-64 pt-16">
        <div className="p-6">
          {/* Page Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-heading font-bold text-text-primary">
                  Audit Trail Viewer
                </h1>
                <p className="text-text-secondary mt-1 font-caption">
                  Comprehensive system activity monitoring and compliance reporting
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 text-sm text-text-secondary">
                  <Icon name="Clock" size={16} />
                  <span className="font-caption">Last updated: {new Date().toLocaleTimeString()}</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  iconName="RefreshCw"
                  onClick={() => window.location.reload()}
                >
                  Refresh
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  iconName="Download"
                  onClick={() => handleExport(selectedLogs)}
                  disabled={selectedLogs.length === 0}
                >
                  Export ({selectedLogs.length})
                </Button>
              </div>
            </div>

            {/* View Tabs */}
            <div className="flex space-x-1 mt-6">
              {viewTabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveView(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 text-sm rounded-lg transition-micro ${
                    activeView === tab.id
                      ? 'bg-primary text-primary-foreground'
                      : 'text-text-secondary hover:text-text-primary hover:bg-background'
                  }`}
                >
                  <Icon name={tab.icon} size={16} />
                  <span className="font-caption">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Main Content */}
          {activeView === 'audit-logs' && (
            <div className="grid grid-cols-12 gap-6">
              {/* Filter Panel */}
              <div className="col-span-3">
                <FilterPanel
                  onFilterChange={handleFilterChange}
                  onSaveFilter={handleSaveFilter}
                  savedFilters={savedFilters}
                />
              </div>

              {/* Audit Log Grid */}
              <div className="col-span-6">
                <AuditLogGrid
                  logs={auditLogs}
                  selectedLogs={selectedLogs}
                  onSelectionChange={setSelectedLogs}
                  onExport={handleExport}
                  onCreateAlert={handleCreateAlert}
                />
              </div>

              {/* Activity Analysis Panel */}
              <div className="col-span-3">
                <ActivityAnalysisPanel
                  logs={auditLogs}
                  selectedTimeRange="24h"
                />
              </div>
            </div>
          )}

          {activeView === 'real-time' && (
            <div className="max-w-6xl mx-auto">
              <RealTimeStream
                isActive={isRealTimeActive}
                onToggle={() => setIsRealTimeActive(!isRealTimeActive)}
              />
            </div>
          )}

          {activeView === 'compliance' && (
            <div className="max-w-6xl mx-auto">
              <ComplianceReporting
                onGenerateReport={handleGenerateReport}
              />
            </div>
          )}

          {activeView === 'analytics' && (
            <div className="max-w-6xl mx-auto">
              <ActivityAnalysisPanel
                logs={auditLogs}
                selectedTimeRange="7d"
              />
            </div>
          )}
        </div>

        {/* Keyboard Shortcuts Help */}
        <div className="fixed bottom-4 right-4 bg-surface border border-border rounded-lg shadow-elevated p-3 text-xs text-text-secondary">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <kbd className="px-1 py-0.5 bg-secondary-100 rounded font-data">Ctrl+F</kbd>
              <span className="font-caption">Search</span>
            </div>
            <div className="flex items-center space-x-1">
              <kbd className="px-1 py-0.5 bg-secondary-100 rounded font-data">Ctrl+E</kbd>
              <span className="font-caption">Export</span>
            </div>
            <div className="flex items-center space-x-1">
              <kbd className="px-1 py-0.5 bg-secondary-100 rounded font-data">Ctrl+R</kbd>
              <span className="font-caption">Real-time</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AuditTrailViewer;