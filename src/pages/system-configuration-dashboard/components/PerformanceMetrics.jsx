import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, AreaChart, Area } from 'recharts';
import Icon from '../../../components/AppIcon';

const PerformanceMetrics = ({ metrics }) => {
  const systemResourceData = [
    { name: 'CPU', usage: metrics.cpu, limit: 100 },
    { name: 'Memory', usage: metrics.memory, limit: 100 },
    { name: 'Storage', usage: metrics.storage, limit: 100 },
    { name: 'Network', usage: metrics.network, limit: 100 }
  ];

  const responseTimeData = [
    { time: '00:00', api: 120, database: 45, search: 89 },
    { time: '04:00', api: 135, database: 52, search: 94 },
    { time: '08:00', api: 180, database: 78, search: 156 },
    { time: '12:00', api: 220, database: 95, search: 189 },
    { time: '16:00', api: 195, database: 82, search: 167 },
    { time: '20:00', api: 165, database: 68, search: 134 }
  ];

  const userActivityData = [
    { hour: '00', active: 12, queries: 45 },
    { hour: '04', active: 8, queries: 23 },
    { hour: '08', active: 45, queries: 234 },
    { hour: '12', active: 67, queries: 456 },
    { hour: '16', active: 89, queries: 567 },
    { hour: '20', active: 56, queries: 345 }
  ];

  const getUsageColor = (usage) => {
    if (usage > 80) return 'text-error';
    if (usage > 60) return 'text-warning';
    return 'text-success';
  };

  const getUsageBarColor = (usage) => {
    if (usage > 80) return '#DC2626';
    if (usage > 60) return '#D97706';
    return '#059669';
  };

  return (
    <div className="space-y-6">
      {/* System Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-surface border border-border rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Icon name="Cpu" size={16} className="text-primary" />
              <span className="text-sm font-heading font-medium text-text-primary">CPU Usage</span>
            </div>
            <span className={`text-sm font-data ${getUsageColor(metrics.cpu)}`}>
              {metrics.cpu}%
            </span>
          </div>
          <div className="w-full bg-secondary-200 rounded-full h-2">
            <div
              className="h-2 rounded-full transition-all"
              style={{
                width: `${metrics.cpu}%`,
                backgroundColor: getUsageBarColor(metrics.cpu)
              }}
            />
          </div>
          <p className="text-xs text-text-secondary font-caption mt-2">
            {metrics.cpuCores} cores • {metrics.cpuLoad} load avg
          </p>
        </div>

        <div className="bg-surface border border-border rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Icon name="HardDrive" size={16} className="text-accent" />
              <span className="text-sm font-heading font-medium text-text-primary">Memory</span>
            </div>
            <span className={`text-sm font-data ${getUsageColor(metrics.memory)}`}>
              {metrics.memory}%
            </span>
          </div>
          <div className="w-full bg-secondary-200 rounded-full h-2">
            <div
              className="h-2 rounded-full transition-all"
              style={{
                width: `${metrics.memory}%`,
                backgroundColor: getUsageBarColor(metrics.memory)
              }}
            />
          </div>
          <p className="text-xs text-text-secondary font-caption mt-2">
            {metrics.memoryUsed}GB / {metrics.memoryTotal}GB
          </p>
        </div>

        <div className="bg-surface border border-border rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Icon name="Database" size={16} className="text-success" />
              <span className="text-sm font-heading font-medium text-text-primary">Storage</span>
            </div>
            <span className={`text-sm font-data ${getUsageColor(metrics.storage)}`}>
              {metrics.storage}%
            </span>
          </div>
          <div className="w-full bg-secondary-200 rounded-full h-2">
            <div
              className="h-2 rounded-full transition-all"
              style={{
                width: `${metrics.storage}%`,
                backgroundColor: getUsageBarColor(metrics.storage)
              }}
            />
          </div>
          <p className="text-xs text-text-secondary font-caption mt-2">
            {metrics.storageUsed}TB / {metrics.storageTotal}TB
          </p>
        </div>

        <div className="bg-surface border border-border rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Icon name="Wifi" size={16} className="text-warning" />
              <span className="text-sm font-heading font-medium text-text-primary">Network</span>
            </div>
            <span className={`text-sm font-data ${getUsageColor(metrics.network)}`}>
              {metrics.network}%
            </span>
          </div>
          <div className="w-full bg-secondary-200 rounded-full h-2">
            <div
              className="h-2 rounded-full transition-all"
              style={{
                width: `${metrics.network}%`,
                backgroundColor: getUsageBarColor(metrics.network)
              }}
            />
          </div>
          <p className="text-xs text-text-secondary font-caption mt-2">
            {metrics.networkIn}MB/s ↓ {metrics.networkOut}MB/s ↑
          </p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* System Resources Chart */}
        <div className="bg-surface border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-heading font-semibold text-text-primary">
              System Resources
            </h3>
            <div className="flex items-center space-x-2">
              <Icon name="TrendingUp" size={16} className="text-success" />
              <span className="text-sm text-success font-caption">Stable</span>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={systemResourceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="usage" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Response Time Chart */}
        <div className="bg-surface border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-heading font-semibold text-text-primary">
              Response Times
            </h3>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-primary rounded-full" />
                <span className="text-xs text-text-secondary font-caption">API</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-accent rounded-full" />
                <span className="text-xs text-text-secondary font-caption">Database</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-success rounded-full" />
                <span className="text-xs text-text-secondary font-caption">Search</span>
              </div>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={responseTimeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="time" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px'
                  }}
                />
                <Line type="monotone" dataKey="api" stroke="#3B82F6" strokeWidth={2} />
                <Line type="monotone" dataKey="database" stroke="#F59E0B" strokeWidth={2} />
                <Line type="monotone" dataKey="search" stroke="#059669" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* User Activity Chart */}
        <div className="bg-surface border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-heading font-semibold text-text-primary">
              User Activity
            </h3>
            <div className="flex items-center space-x-2">
              <Icon name="Users" size={16} className="text-primary" />
              <span className="text-sm text-text-primary font-caption">
                {metrics.activeUsers} active users
              </span>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={userActivityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="hour" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px'
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="active"
                  stackId="1"
                  stroke="#3B82F6"
                  fill="#3B82F6"
                  fillOpacity={0.6}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Query Performance */}
        <div className="bg-surface border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-heading font-semibold text-text-primary">
              Query Performance
            </h3>
            <div className="flex items-center space-x-2">
              <Icon name="Search" size={16} className="text-accent" />
              <span className="text-sm text-text-primary font-caption">
                {metrics.queriesPerSecond} queries/sec
              </span>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-secondary font-caption">Average Query Time</span>
              <span className="text-sm font-data text-text-primary">{metrics.avgQueryTime}ms</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-secondary font-caption">Slow Queries (&gt;1s)</span>
              <span className="text-sm font-data text-warning">{metrics.slowQueries}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-secondary font-caption">Failed Queries</span>
              <span className="text-sm font-data text-error">{metrics.failedQueries}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-secondary font-caption">Cache Hit Rate</span>
              <span className="text-sm font-data text-success">{metrics.cacheHitRate}%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-secondary font-caption">Index Usage</span>
              <span className="text-sm font-data text-text-primary">{metrics.indexUsage}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Alerts */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
          Performance Alerts
        </h3>
        <div className="space-y-3">
          {metrics.alerts.map((alert, index) => (
            <div
              key={index}
              className={`flex items-start space-x-3 p-3 rounded-lg ${
                alert.severity === 'critical' ? 'bg-error-50' :
                alert.severity === 'warning' ? 'bg-warning-50' : 'bg-accent-50'
              }`}
            >
              <Icon
                name={alert.severity === 'critical' ? 'AlertTriangle' : 'AlertCircle'}
                size={16}
                className={
                  alert.severity === 'critical' ? 'text-error' :
                  alert.severity === 'warning' ? 'text-warning' : 'text-accent'
                }
              />
              <div className="flex-1">
                <p className="text-sm font-heading font-medium text-text-primary">
                  {alert.title}
                </p>
                <p className="text-sm text-text-secondary font-caption">
                  {alert.message}
                </p>
                <p className="text-xs text-text-tertiary font-caption mt-1">
                  {alert.timestamp}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PerformanceMetrics;