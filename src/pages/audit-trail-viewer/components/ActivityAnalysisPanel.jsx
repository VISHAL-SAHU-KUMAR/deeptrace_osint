import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const ActivityAnalysisPanel = ({ logs, selectedTimeRange }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const activityData = [
    { hour: '00:00', activities: 45 },
    { hour: '04:00', activities: 12 },
    { hour: '08:00', activities: 156 },
    { hour: '12:00', activities: 234 },
    { hour: '16:00', activities: 189 },
    { hour: '20:00', activities: 78 }
  ];

  const userActivityData = [
    { name: 'Data Access', value: 45, color: '#3B82F6' },
    { name: 'Authentication', value: 32, color: '#10B981' },
    { name: 'Configuration', value: 18, color: '#F59E0B' },
    { name: 'Export', value: 5, color: '#EF4444' }
  ];

  const topUsers = [
    { user: 'john.doe@deeptrace.com', actions: 234, risk: 'low' },
    { user: 'sarah.wilson@deeptrace.com', actions: 189, risk: 'medium' },
    { user: 'mike.chen@deeptrace.com', actions: 156, risk: 'low' },
    { user: 'admin@deeptrace.com', actions: 145, risk: 'high' },
    { user: 'analyst.team@deeptrace.com', actions: 98, risk: 'low' }
  ];

  const anomalies = [
    {
      id: 1,
      type: 'Unusual Access Pattern',
      user: 'sarah.wilson@deeptrace.com',
      description: 'Multiple failed login attempts from different IP addresses',
      timestamp: new Date(Date.now() - 1800000),
      severity: 'high'
    },
    {
      id: 2,
      type: 'Off-Hours Activity',
      user: 'mike.chen@deeptrace.com',
      description: 'Data export activity at 2:30 AM outside normal working hours',
      timestamp: new Date(Date.now() - 3600000),
      severity: 'medium'
    },
    {
      id: 3,
      type: 'Bulk Data Access',
      user: 'admin@deeptrace.com',
      description: 'Accessed 500+ records in a 10-minute window',
      timestamp: new Date(Date.now() - 7200000),
      severity: 'medium'
    }
  ];

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'high': return 'text-error bg-error-50';
      case 'medium': return 'text-warning bg-warning-50';
      case 'low': return 'text-success bg-success-50';
      default: return 'text-text-secondary bg-secondary-50';
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'text-error bg-error-50';
      case 'medium': return 'text-warning bg-warning-50';
      case 'low': return 'text-success bg-success-50';
      default: return 'text-text-secondary bg-secondary-50';
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'BarChart3' },
    { id: 'users', label: 'User Activity', icon: 'Users' },
    { id: 'anomalies', label: 'Anomalies', icon: 'AlertTriangle' },
    { id: 'patterns', label: 'Patterns', icon: 'TrendingUp' }
  ];

  return (
    <div className="bg-surface border border-border rounded-lg shadow-primary h-full flex flex-col">
      {/* Panel Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-heading font-semibold text-text-primary">
            Activity Analysis
          </h3>
          <Button
            variant="ghost"
            size="sm"
            iconName="Settings"
            onClick={() => console.log('Analysis settings')}
          />
        </div>
        
        {/* Tab Navigation */}
        <div className="flex space-x-1 mt-4">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-3 py-2 text-sm rounded-lg transition-micro ${
                activeTab === tab.id
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

      {/* Panel Content */}
      <div className="flex-1 p-4 overflow-y-auto">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Activity Timeline */}
            <div>
              <h4 className="text-sm font-heading font-medium text-text-primary mb-3">
                Activity Timeline (24h)
              </h4>
              <div className="h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={activityData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis dataKey="hour" stroke="#6B7280" fontSize={12} />
                    <YAxis stroke="#6B7280" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#FFFFFF',
                        border: '1px solid #E5E7EB',
                        borderRadius: '8px'
                      }}
                    />
                    <Bar dataKey="activities" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Activity Distribution */}
            <div>
              <h4 className="text-sm font-heading font-medium text-text-primary mb-3">
                Activity Distribution
              </h4>
              <div className="h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={userActivityData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {userActivityData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-3">
                {userActivityData.map((item, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-xs text-text-secondary font-caption">
                      {item.name}: {item.value}%
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-background rounded-lg p-3">
                <div className="flex items-center space-x-2">
                  <Icon name="Activity" size={16} className="text-primary" />
                  <span className="text-xs text-text-secondary font-caption">Total Events</span>
                </div>
                <p className="text-lg font-heading font-semibold text-text-primary mt-1">
                  2,847
                </p>
              </div>
              <div className="bg-background rounded-lg p-3">
                <div className="flex items-center space-x-2">
                  <Icon name="Users" size={16} className="text-success" />
                  <span className="text-xs text-text-secondary font-caption">Active Users</span>
                </div>
                <p className="text-lg font-heading font-semibold text-text-primary mt-1">
                  47
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="space-y-4">
            <h4 className="text-sm font-heading font-medium text-text-primary">
              Top Active Users
            </h4>
            <div className="space-y-3">
              {topUsers.map((user, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-background rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-heading font-medium">
                      {user.user.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-heading font-medium text-text-primary">
                        {user.user}
                      </p>
                      <p className="text-xs text-text-secondary font-caption">
                        {user.actions} actions
                      </p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 text-xs font-caption rounded-full ${getRiskColor(user.risk)}`}>
                    {user.risk} risk
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'anomalies' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-heading font-medium text-text-primary">
                Detected Anomalies
              </h4>
              <span className="px-2 py-1 bg-error-50 text-error text-xs rounded-md font-caption">
                {anomalies.length} active
              </span>
            </div>
            <div className="space-y-3">
              {anomalies.map((anomaly) => (
                <div key={anomaly.id} className="p-3 bg-background rounded-lg border-l-4 border-warning">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <Icon name="AlertTriangle" size={16} className="text-warning" />
                        <h5 className="text-sm font-heading font-medium text-text-primary">
                          {anomaly.type}
                        </h5>
                        <span className={`px-2 py-1 text-xs font-caption rounded-full ${getSeverityColor(anomaly.severity)}`}>
                          {anomaly.severity}
                        </span>
                      </div>
                      <p className="text-xs text-text-secondary mt-1 font-caption">
                        User: {anomaly.user}
                      </p>
                      <p className="text-sm text-text-primary mt-2">
                        {anomaly.description}
                      </p>
                      <p className="text-xs text-text-tertiary mt-2 font-caption">
                        {anomaly.timestamp.toLocaleString()}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="xs"
                      iconName="ExternalLink"
                      onClick={() => console.log('View anomaly details', anomaly.id)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'patterns' && (
          <div className="space-y-6">
            <h4 className="text-sm font-heading font-medium text-text-primary">
              Access Patterns
            </h4>
            
            {/* Pattern Analysis */}
            <div className="space-y-4">
              <div className="p-3 bg-background rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="Clock" size={16} className="text-primary" />
                  <span className="text-sm font-heading font-medium text-text-primary">
                    Peak Activity Hours
                  </span>
                </div>
                <p className="text-xs text-text-secondary font-caption">
                  Highest activity between 9:00 AM - 5:00 PM (business hours)
                </p>
                <div className="mt-2 flex space-x-2">
                  <span className="px-2 py-1 bg-primary-50 text-primary text-xs rounded font-caption">
                    12:00 PM - 2:00 PM
                  </span>
                  <span className="px-2 py-1 bg-secondary-50 text-text-secondary text-xs rounded font-caption">
                    234 avg events/hour
                  </span>
                </div>
              </div>

              <div className="p-3 bg-background rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="MapPin" size={16} className="text-success" />
                  <span className="text-sm font-heading font-medium text-text-primary">
                    Geographic Distribution
                  </span>
                </div>
                <p className="text-xs text-text-secondary font-caption">
                  Most access from primary office locations
                </p>
                <div className="mt-2 space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-text-secondary font-caption">New York Office</span>
                    <span className="text-text-primary font-caption">45%</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-text-secondary font-caption">London Office</span>
                    <span className="text-text-primary font-caption">32%</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-text-secondary font-caption">Remote Access</span>
                    <span className="text-text-primary font-caption">23%</span>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-background rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="Smartphone" size={16} className="text-accent" />
                  <span className="text-sm font-heading font-medium text-text-primary">
                    Device Types
                  </span>
                </div>
                <p className="text-xs text-text-secondary font-caption">
                  Access patterns by device category
                </p>
                <div className="mt-2 space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-text-secondary font-caption">Desktop</span>
                    <span className="text-text-primary font-caption">78%</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-text-secondary font-caption">Mobile</span>
                    <span className="text-text-primary font-caption">15%</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-text-secondary font-caption">Tablet</span>
                    <span className="text-text-primary font-caption">7%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivityAnalysisPanel;