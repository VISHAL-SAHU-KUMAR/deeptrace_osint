import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import ThreatFeedStatus from './components/ThreatFeedStatus';
import AlertQueue from './components/AlertQueue';
import ThreatAnalysisPanel from './components/ThreatAnalysisPanel';
import ThreatCorrelationEngine from './components/ThreatCorrelationEngine';
import ThreatActorChat from './components/ThreatActorChat';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const ThreatIntelligenceDashboard = () => {
  const [activeView, setActiveView] = useState('dashboard');
  const [dashboardStats, setDashboardStats] = useState({});

  useEffect(() => {
    // Mock dashboard statistics
    const mockStats = {
      totalThreats: 1247,
      criticalAlerts: 23,
      activeInvestigations: 8,
      feedsOnline: 6,
      averageConfidence: 87,
      threatActors: 45,
      iocCount: 15420,
      lastUpdate: new Date(Date.now() - 120000)
    };
    setDashboardStats(mockStats);
  }, []);

  const formatTimeAgo = (date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  const quickActions = [
    {
      id: 'new-investigation',
      label: 'New Investigation',
      icon: 'Plus',
      description: 'Start threat investigation',
      action: () => console.log('New investigation')
    },
    {
      id: 'bulk-ioc',
      label: 'Bulk IOC Import',
      icon: 'Upload',
      description: 'Import threat indicators',
      action: () => console.log('Bulk IOC import')
    },
    {
      id: 'threat-hunt',
      label: 'Threat Hunt',
      icon: 'Search',
      description: 'Proactive threat hunting',
      action: () => console.log('Threat hunt')
    },
    {
      id: 'export-intel',
      label: 'Export Intelligence',
      icon: 'Download',
      description: 'Export threat data',
      action: () => console.log('Export intelligence')
    }
  ];

  const viewTabs = [
    { id: 'dashboard', label: 'Dashboard', icon: 'BarChart3' },
    { id: 'correlation', label: 'Correlation', icon: 'GitBranch' },
    { id: 'collaboration', label: 'Collaboration', icon: 'MessageSquare' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar />
      
      <main className="ml-64 pt-16">
        <div className="p-6">
          {/* Page Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl font-heading font-bold text-text-primary">
                  Threat Intelligence Dashboard
                </h1>
                <p className="text-text-secondary font-caption">
                  Real-time threat monitoring and analysis platform
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="text-sm text-text-secondary font-caption">
                  Last updated: {formatTimeAgo(dashboardStats.lastUpdate)}
                </div>
                <Button
                  variant="primary"
                  iconName="RefreshCw"
                  onClick={() => window.location.reload()}
                >
                  Refresh
                </Button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-4 gap-4 mb-6">
              <div className="bg-surface rounded-lg border border-border shadow-primary p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-heading font-bold text-text-primary">
                      {dashboardStats.totalThreats?.toLocaleString()}
                    </div>
                    <div className="text-sm text-text-secondary font-caption">
                      Total Threats
                    </div>
                  </div>
                  <Icon name="Shield" size={24} className="text-primary" />
                </div>
              </div>
              <div className="bg-surface rounded-lg border border-border shadow-primary p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-heading font-bold text-error">
                      {dashboardStats.criticalAlerts}
                    </div>
                    <div className="text-sm text-text-secondary font-caption">
                      Critical Alerts
                    </div>
                  </div>
                  <Icon name="AlertTriangle" size={24} className="text-error" />
                </div>
              </div>
              <div className="bg-surface rounded-lg border border-border shadow-primary p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-heading font-bold text-warning">
                      {dashboardStats.activeInvestigations}
                    </div>
                    <div className="text-sm text-text-secondary font-caption">
                      Active Cases
                    </div>
                  </div>
                  <Icon name="FolderOpen" size={24} className="text-warning" />
                </div>
              </div>
              <div className="bg-surface rounded-lg border border-border shadow-primary p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-heading font-bold text-success">
                      {dashboardStats.feedsOnline}
                    </div>
                    <div className="text-sm text-text-secondary font-caption">
                      Feeds Online
                    </div>
                  </div>
                  <Icon name="Rss" size={24} className="text-success" />
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-4 gap-4 mb-6">
              {quickActions.map((action) => (
                <button
                  key={action.id}
                  onClick={action.action}
                  className="bg-surface rounded-lg border border-border shadow-primary p-4 hover:shadow-elevated transition-micro hover-lift text-left"
                >
                  <div className="flex items-center space-x-3 mb-2">
                    <Icon name={action.icon} size={20} className="text-primary" />
                    <span className="text-sm font-heading font-medium text-text-primary">
                      {action.label}
                    </span>
                  </div>
                  <p className="text-xs text-text-secondary font-caption">
                    {action.description}
                  </p>
                </button>
              ))}
            </div>

            {/* View Tabs */}
            <div className="border-b border-border">
              <nav className="flex space-x-8">
                {viewTabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveView(tab.id)}
                    className={`flex items-center space-x-2 py-3 px-1 border-b-2 font-heading font-medium text-sm transition-micro ${
                      activeView === tab.id
                        ? 'border-primary text-primary' :'border-transparent text-text-secondary hover:text-text-primary'
                    }`}
                  >
                    <Icon name={tab.icon} size={16} />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          {activeView === 'dashboard' && (
            <div className="grid grid-cols-12 gap-6 h-[calc(100vh-400px)]">
              {/* Threat Feed Status - 20% */}
              <div className="col-span-2">
                <ThreatFeedStatus />
              </div>
              
              {/* Alert Queue - 40% */}
              <div className="col-span-5">
                <AlertQueue />
              </div>
              
              {/* Threat Analysis Panel - 40% */}
              <div className="col-span-5">
                <ThreatAnalysisPanel />
              </div>
            </div>
          )}

          {activeView === 'correlation' && (
            <div className="h-[calc(100vh-400px)]">
              <ThreatCorrelationEngine />
            </div>
          )}

          {activeView === 'collaboration' && (
            <div className="h-[calc(100vh-400px)]">
              <ThreatActorChat />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ThreatIntelligenceDashboard;