import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SystemStatusBar = ({ integrationStatus, systemMetrics }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case 'online': return 'text-success';
      case 'warning': return 'text-warning';
      case 'offline': return 'text-error';
      case 'maintenance': return 'text-accent';
      default: return 'text-text-secondary';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'online': return 'CheckCircle';
      case 'warning': return 'AlertTriangle';
      case 'offline': return 'XCircle';
      case 'maintenance': return 'Settings';
      default: return 'Circle';
    }
  };

  const getStatusBg = (status) => {
    switch (status) {
      case 'online': return 'bg-success-50';
      case 'warning': return 'bg-warning-50';
      case 'offline': return 'bg-error-50';
      case 'maintenance': return 'bg-accent-50';
      default: return 'bg-secondary-50';
    }
  };

  const formatUptime = (seconds) => {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (days > 0) return `${days}d ${hours}h`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  const formatBytes = (bytes) => {
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 B';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  };

  const overallStatus = integrationStatus.every(s => s.status === 'online') ? 'online' : 
                      integrationStatus.some(s => s.status === 'offline') ? 'warning' : 'online';

  return (
    <div className="bg-surface border-t border-border">
      {/* Main Status Bar */}
      <div className="px-4 py-2">
        <div className="flex items-center justify-between">
          {/* Left Side - Overall Status */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${overallStatus === 'online' ? 'bg-success pulse-subtle' : 'bg-warning'}`} />
              <span className="text-sm font-medium text-text-primary">
                System Status: {overallStatus === 'online' ? 'Operational' : 'Degraded'}
              </span>
            </div>

            {/* Quick Integration Status */}
            <div className="flex items-center space-x-3">
              {integrationStatus.slice(0, 4).map((integration) => (
                <div
                  key={integration.id}
                  className="flex items-center space-x-1"
                  title={`${integration.name}: ${integration.status}`}
                >
                  <Icon
                    name={getStatusIcon(integration.status)}
                    size={14}
                    className={getStatusColor(integration.status)}
                  />
                  <span className="text-xs text-text-secondary">
                    {integration.name}
                  </span>
                </div>
              ))}
              {integrationStatus.length > 4 && (
                <span className="text-xs text-text-secondary">
                  +{integrationStatus.length - 4} more
                </span>
              )}
            </div>
          </div>

          {/* Right Side - System Metrics & Actions */}
          <div className="flex items-center space-x-4">
            {/* Key Metrics */}
            <div className="flex items-center space-x-4 text-xs text-text-secondary">
              <div className="flex items-center space-x-1">
                <Icon name="Activity" size={12} />
                <span>CPU: {systemMetrics.cpu}%</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="HardDrive" size={12} />
                <span>Memory: {systemMetrics.memory}%</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Clock" size={12} />
                <span>Uptime: {formatUptime(systemMetrics.uptime)}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="xs"
                iconName={isExpanded ? 'ChevronDown' : 'ChevronUp'}
                onClick={() => setIsExpanded(!isExpanded)}
              >
                Details
              </Button>
              <Button
                variant="ghost"
                size="xs"
                iconName="RefreshCw"
                onClick={() => console.log('Refresh status')}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Expanded Details */}
      {isExpanded && (
        <div className="px-4 pb-4 border-t border-border bg-background">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4">
            {/* Integration Status Details */}
            <div>
              <h4 className="text-sm font-heading font-semibold text-text-primary mb-3">
                Integration Status
              </h4>
              <div className="space-y-2">
                {integrationStatus.map((integration) => (
                  <div
                    key={integration.id}
                    className={`p-3 rounded-lg border ${getStatusBg(integration.status)}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Icon
                          name={getStatusIcon(integration.status)}
                          size={16}
                          className={getStatusColor(integration.status)}
                        />
                        <div>
                          <p className="text-sm font-medium text-text-primary">
                            {integration.name}
                          </p>
                          <p className="text-xs text-text-secondary">
                            {integration.description}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`text-xs font-medium ${getStatusColor(integration.status)}`}>
                          {integration.status.toUpperCase()}
                        </p>
                        <p className="text-xs text-text-secondary">
                          Last sync: {integration.lastSync}
                        </p>
                      </div>
                    </div>
                    {integration.status === 'warning' && integration.message && (
                      <div className="mt-2 p-2 bg-warning-100 rounded text-xs text-warning-700">
                        {integration.message}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* System Metrics Details */}
            <div>
              <h4 className="text-sm font-heading font-semibold text-text-primary mb-3">
                System Metrics
              </h4>
              <div className="space-y-4">
                {/* Performance Metrics */}
                <div className="p-3 bg-surface rounded-lg border border-border">
                  <h5 className="text-xs font-medium text-text-secondary mb-2">
                    Performance
                  </h5>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-text-secondary">CPU Usage</span>
                        <span className="text-xs font-medium text-text-primary">
                          {systemMetrics.cpu}%
                        </span>
                      </div>
                      <div className="w-full bg-secondary-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            systemMetrics.cpu > 80 ? 'bg-error' :
                            systemMetrics.cpu > 60 ? 'bg-warning' : 'bg-success'
                          }`}
                          style={{ width: `${systemMetrics.cpu}%` }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-text-secondary">Memory</span>
                        <span className="text-xs font-medium text-text-primary">
                          {systemMetrics.memory}%
                        </span>
                      </div>
                      <div className="w-full bg-secondary-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            systemMetrics.memory > 80 ? 'bg-error' :
                            systemMetrics.memory > 60 ? 'bg-warning' : 'bg-success'
                          }`}
                          style={{ width: `${systemMetrics.memory}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Storage & Network */}
                <div className="p-3 bg-surface rounded-lg border border-border">
                  <h5 className="text-xs font-medium text-text-secondary mb-2">
                    Resources
                  </h5>
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-text-secondary">Storage Used</span>
                        <span className="font-medium text-text-primary">
                          {formatBytes(systemMetrics.storageUsed)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-text-secondary">Network I/O</span>
                        <span className="font-medium text-text-primary">
                          {formatBytes(systemMetrics.networkIO)}/s
                        </span>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-text-secondary">Active Cases</span>
                        <span className="font-medium text-text-primary">
                          {systemMetrics.activeCases}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-text-secondary">Data Sources</span>
                        <span className="font-medium text-text-primary">
                          {systemMetrics.dataSources}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="xs"
                    iconName="BarChart3"
                    onClick={() => console.log('View detailed metrics')}
                  >
                    Detailed Metrics
                  </Button>
                  <Button
                    variant="outline"
                    size="xs"
                    iconName="Settings"
                    onClick={() => console.log('System settings')}
                  >
                    Settings
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SystemStatusBar;