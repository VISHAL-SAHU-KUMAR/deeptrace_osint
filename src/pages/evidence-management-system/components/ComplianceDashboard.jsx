import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const ComplianceDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('30d');

  const complianceMetrics = {
    cjis: {
      name: 'CJIS Compliance',
      status: 'compliant',
      score: 98,
      lastAudit: '2024-01-10',
      nextAudit: '2024-04-10',
      requirements: [
        { name: 'Access Control', status: 'compliant', score: 100 },
        { name: 'Audit Logging', status: 'compliant', score: 98 },
        { name: 'Data Encryption', status: 'compliant', score: 100 },
        { name: 'Personnel Security', status: 'warning', score: 95 },
        { name: 'Physical Security', status: 'compliant', score: 97 }
      ]
    },
    sox: {
      name: 'SOX Compliance',
      status: 'compliant',
      score: 96,
      lastAudit: '2024-01-05',
      nextAudit: '2024-07-05',
      requirements: [
        { name: 'Financial Controls', status: 'compliant', score: 98 },
        { name: 'Evidence Integrity', status: 'compliant', score: 100 },
        { name: 'Retention Policies', status: 'compliant', score: 94 },
        { name: 'Access Management', status: 'warning', score: 92 },
        { name: 'Change Management', status: 'compliant', score: 96 }
      ]
    },
    gdpr: {
      name: 'GDPR Compliance',
      status: 'warning',
      score: 89,
      lastAudit: '2024-01-12',
      nextAudit: '2024-04-12',
      requirements: [
        { name: 'Data Protection', status: 'compliant', score: 95 },
        { name: 'Consent Management', status: 'warning', score: 85 },
        { name: 'Data Portability', status: 'compliant', score: 92 },
        { name: 'Right to Erasure', status: 'warning', score: 88 },
        { name: 'Privacy by Design', status: 'compliant', score: 90 }
      ]
    }
  };

  const auditHistory = [
    { month: 'Oct', cjis: 96, sox: 94, gdpr: 87 },
    { month: 'Nov', cjis: 97, sox: 95, gdpr: 88 },
    { month: 'Dec', cjis: 98, sox: 96, gdpr: 89 },
    { month: 'Jan', cjis: 98, sox: 96, gdpr: 89 }
  ];

  const evidenceRetention = [
    { name: 'Active Cases', value: 45, color: '#3B82F6' },
    { name: 'Legal Hold', value: 23, color: '#EF4444' },
    { name: 'Archived', value: 32, color: '#6B7280' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'compliant': return 'text-success bg-success-50';
      case 'warning': return 'text-warning bg-warning-50';
      case 'critical': return 'text-error bg-error-50';
      default: return 'text-text-secondary bg-secondary-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'compliant': return 'CheckCircle';
      case 'warning': return 'AlertTriangle';
      case 'critical': return 'XCircle';
      default: return 'Circle';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-heading font-semibold text-text-primary">
            Compliance Dashboard
          </h3>
          <p className="text-sm text-text-secondary mt-1">
            Monitor regulatory compliance and audit requirements
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 border border-border rounded-lg text-sm bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
          <Button
            variant="primary"
            size="sm"
            iconName="Download"
            onClick={() => console.log('Generate compliance report')}
          >
            Generate Report
          </Button>
        </div>
      </div>

      {/* Compliance Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.entries(complianceMetrics).map(([key, metric]) => (
          <div key={key} className="bg-surface border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-heading font-semibold text-text-primary">
                {metric.name}
              </h4>
              <Icon
                name={getStatusIcon(metric.status)}
                size={20}
                className={metric.status === 'compliant' ? 'text-success' : 
                          metric.status === 'warning' ? 'text-warning' : 'text-error'}
              />
            </div>

            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl font-heading font-bold text-text-primary">
                  {metric.score}%
                </span>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(metric.status)}`}>
                  {metric.status.toUpperCase()}
                </span>
              </div>
              <div className="w-full bg-secondary-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${
                    metric.status === 'compliant' ? 'bg-success' :
                    metric.status === 'warning' ? 'bg-warning' : 'bg-error'
                  }`}
                  style={{ width: `${metric.score}%` }}
                ></div>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              {metric.requirements.map((req, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-xs text-text-secondary">{req.name}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-text-primary">{req.score}%</span>
                    <Icon
                      name={getStatusIcon(req.status)}
                      size={12}
                      className={req.status === 'compliant' ? 'text-success' : 
                                req.status === 'warning' ? 'text-warning' : 'text-error'}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="text-xs text-text-secondary">
              <div className="flex items-center justify-between">
                <span>Last Audit: {formatDate(metric.lastAudit)}</span>
                <span>Next: {formatDate(metric.nextAudit)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Compliance Trends */}
        <div className="bg-surface border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-heading font-semibold text-text-primary">
              Compliance Trends
            </h4>
            <Button
              variant="ghost"
              size="xs"
              iconName="TrendingUp"
              onClick={() => console.log('View detailed trends')}
            />
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={auditHistory}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="cjis" fill="#3B82F6" name="CJIS" />
                <Bar dataKey="sox" fill="#10B981" name="SOX" />
                <Bar dataKey="gdpr" fill="#F59E0B" name="GDPR" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Evidence Retention */}
        <div className="bg-surface border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-heading font-semibold text-text-primary">
              Evidence Retention Status
            </h4>
            <Button
              variant="ghost"
              size="xs"
              iconName="Archive"
              onClick={() => console.log('Manage retention policies')}
            />
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={evidenceRetention}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {evidenceRetention.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center space-x-4 mt-4">
            {evidenceRetention.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-xs text-text-secondary">
                  {item.name} ({item.value}%)
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Audit Activities */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-sm font-heading font-semibold text-text-primary">
            Recent Audit Activities
          </h4>
          <Button
            variant="ghost"
            size="sm"
            iconName="ExternalLink"
            onClick={() => console.log('View all activities')}
          >
            View All
          </Button>
        </div>

        <div className="space-y-3">
          {[
            {
              id: 1,
              type: 'audit',
              title: 'CJIS Quarterly Audit Completed',
              description: 'All access controls and audit logs reviewed successfully',
              timestamp: '2024-01-15T14:30:00Z',
              status: 'completed',
              auditor: 'External Auditor'
            },
            {
              id: 2,
              type: 'policy',
              title: 'Evidence Retention Policy Updated',
              description: 'Updated retention periods for financial investigation evidence',
              timestamp: '2024-01-14T10:15:00Z',
              status: 'updated',
              auditor: 'Compliance Officer'
            },
            {
              id: 3,
              type: 'violation',
              title: 'GDPR Consent Management Issue',
              description: 'Minor issue identified in consent tracking for EU subjects',
              timestamp: '2024-01-13T16:45:00Z',
              status: 'resolved',
              auditor: 'Privacy Officer'
            },
            {
              id: 4,
              type: 'training',
              title: 'SOX Compliance Training Completed',
              description: 'All evidence custodians completed mandatory training',
              timestamp: '2024-01-12T09:00:00Z',
              status: 'completed',
              auditor: 'Training Coordinator'
            }
          ].map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3 p-3 hover:bg-background rounded-lg transition-micro">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                activity.type === 'audit' ? 'bg-primary-100 text-primary' :
                activity.type === 'policy' ? 'bg-success-100 text-success' :
                activity.type === 'violation'? 'bg-warning-100 text-warning' : 'bg-accent-100 text-accent'
              }`}>
                <Icon
                  name={
                    activity.type === 'audit' ? 'Shield' :
                    activity.type === 'policy' ? 'FileText' :
                    activity.type === 'violation'? 'AlertTriangle' : 'GraduationCap'
                  }
                  size={16}
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h5 className="text-sm font-medium text-text-primary">
                    {activity.title}
                  </h5>
                  <span className="text-xs text-text-secondary">
                    {formatDate(activity.timestamp)}
                  </span>
                </div>
                <p className="text-sm text-text-secondary mt-1">
                  {activity.description}
                </p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-text-secondary">
                    By: {activity.auditor}
                  </span>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    activity.status === 'completed' ? 'bg-success-100 text-success' :
                    activity.status === 'updated' ? 'bg-primary-100 text-primary' :
                    activity.status === 'resolved'? 'bg-warning-100 text-warning' : 'bg-secondary-100 text-text-secondary'
                  }`}>
                    {activity.status.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ComplianceDashboard;