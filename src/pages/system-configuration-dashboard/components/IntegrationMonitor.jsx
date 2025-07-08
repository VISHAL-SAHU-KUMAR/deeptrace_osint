import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const IntegrationMonitor = ({ integrations, onRefresh, onToggle }) => {
  const [selectedIntegration, setSelectedIntegration] = useState(null);

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'text-success bg-success-50';
      case 'warning':
        return 'text-warning bg-warning-50';
      case 'error':
        return 'text-error bg-error-50';
      case 'inactive':
        return 'text-text-secondary bg-secondary-100';
      default:
        return 'text-text-secondary bg-secondary-100';
    }
  };

  const getHealthIcon = (health) => {
    switch (health) {
      case 'healthy':
        return 'CheckCircle';
      case 'warning':
        return 'AlertTriangle';
      case 'error':
        return 'XCircle';
      default:
        return 'Circle';
    }
  };

  const formatRateLimit = (current, limit) => {
    const percentage = (current / limit) * 100;
    return {
      percentage,
      color: percentage > 80 ? 'text-error' : percentage > 60 ? 'text-warning' : 'text-success'
    };
  };

  return (
    <div className="space-y-6">
      {/* Integration Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {integrations.map((integration) => {
          const rateLimit = formatRateLimit(integration.rateLimitUsed, integration.rateLimitTotal);
          
          return (
            <div
              key={integration.id}
              className={`bg-surface border rounded-lg p-4 cursor-pointer transition-micro hover-lift ${
                selectedIntegration?.id === integration.id ? 'border-primary' : 'border-border'
              }`}
              onClick={() => setSelectedIntegration(integration)}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                    <Icon name={integration.icon} size={20} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm font-heading font-medium text-text-primary">
                      {integration.name}
                    </h3>
                    <p className="text-xs text-text-secondary font-caption">
                      {integration.type}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon
                    name={getHealthIcon(integration.health)}
                    size={16}
                    className={integration.health === 'healthy' ? 'text-success' : 
                              integration.health === 'warning' ? 'text-warning' : 'text-error'}
                  />
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-caption ${getStatusColor(integration.status)}`}>
                    {integration.status}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-text-secondary font-caption">Response Time</span>
                  <span className="text-text-primary font-data">{integration.responseTime}ms</span>
                </div>
                
                <div className="flex items-center justify-between text-xs">
                  <span className="text-text-secondary font-caption">Rate Limit</span>
                  <span className={`font-data ${rateLimit.color}`}>
                    {integration.rateLimitUsed}/{integration.rateLimitTotal}
                  </span>
                </div>
                
                <div className="w-full bg-secondary-200 rounded-full h-1.5">
                  <div
                    className={`h-1.5 rounded-full transition-all ${
                      rateLimit.percentage > 80 ? 'bg-error' : 
                      rateLimit.percentage > 60 ? 'bg-warning' : 'bg-success'
                    }`}
                    style={{ width: `${rateLimit.percentage}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-text-secondary font-caption">Last Check</span>
                  <span className="text-text-primary font-caption">{integration.lastCheck}</span>
                </div>
              </div>

              <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                <Button
                  variant="ghost"
                  size="xs"
                  iconName="RefreshCw"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRefresh(integration.id);
                  }}
                >
                  Refresh
                </Button>
                <Button
                  variant={integration.status === 'active' ? 'warning' : 'success'}
                  size="xs"
                  iconName={integration.status === 'active' ? 'Pause' : 'Play'}
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggle(integration.id);
                  }}
                >
                  {integration.status === 'active' ? 'Pause' : 'Activate'}
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detailed View */}
      {selectedIntegration && (
        <div className="bg-surface border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                <Icon name={selectedIntegration.icon} size={24} className="text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-heading font-semibold text-text-primary">
                  {selectedIntegration.name}
                </h3>
                <p className="text-sm text-text-secondary font-caption">
                  {selectedIntegration.description}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              iconName="X"
              onClick={() => setSelectedIntegration(null)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-background rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="Activity" size={16} className="text-primary" />
                <span className="text-sm font-heading font-medium text-text-primary">Status</span>
              </div>
              <p className="text-lg font-heading font-semibold text-text-primary">
                {selectedIntegration.status}
              </p>
              <p className="text-xs text-text-secondary font-caption">
                Uptime: {selectedIntegration.uptime}
              </p>
            </div>

            <div className="bg-background rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="Zap" size={16} className="text-accent" />
                <span className="text-sm font-heading font-medium text-text-primary">Performance</span>
              </div>
              <p className="text-lg font-heading font-semibold text-text-primary">
                {selectedIntegration.responseTime}ms
              </p>
              <p className="text-xs text-text-secondary font-caption">
                Avg: {selectedIntegration.avgResponseTime}ms
              </p>
            </div>

            <div className="bg-background rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="BarChart3" size={16} className="text-success" />
                <span className="text-sm font-heading font-medium text-text-primary">Requests</span>
              </div>
              <p className="text-lg font-heading font-semibold text-text-primary">
                {selectedIntegration.requestsToday}
              </p>
              <p className="text-xs text-text-secondary font-caption">
                Today's usage
              </p>
            </div>

            <div className="bg-background rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="AlertTriangle" size={16} className="text-warning" />
                <span className="text-sm font-heading font-medium text-text-primary">Errors</span>
              </div>
              <p className="text-lg font-heading font-semibold text-text-primary">
                {selectedIntegration.errorCount}
              </p>
              <p className="text-xs text-text-secondary font-caption">
                Last 24 hours
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-heading font-medium text-text-primary mb-3">
                Configuration
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary font-caption">API Endpoint</span>
                  <code className="text-text-primary font-data">{selectedIntegration.endpoint}</code>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary font-caption">Version</span>
                  <span className="text-text-primary font-data">{selectedIntegration.version}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary font-caption">Timeout</span>
                  <span className="text-text-primary font-data">{selectedIntegration.timeout}s</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary font-caption">Retry Count</span>
                  <span className="text-text-primary font-data">{selectedIntegration.retryCount}</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-heading font-medium text-text-primary mb-3">
                Recent Activity
              </h4>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {selectedIntegration.recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center space-x-2 text-sm">
                    <Icon
                      name={activity.type === 'success' ? 'CheckCircle' : 'XCircle'}
                      size={14}
                      className={activity.type === 'success' ? 'text-success' : 'text-error'}
                    />
                    <span className="text-text-primary font-caption">{activity.message}</span>
                    <span className="text-text-secondary font-caption ml-auto">{activity.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IntegrationMonitor;