import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ComplianceReporting = ({ onGenerateReport }) => {
  const [selectedCompliance, setSelectedCompliance] = useState('');
  const [reportConfig, setReportConfig] = useState({
    dateRange: { start: '', end: '' },
    includeAnomalies: true,
    includeUserActivity: true,
    includeSystemEvents: true,
    format: 'pdf'
  });

  const complianceTypes = [
    {
      id: 'sox',
      name: 'SOX Compliance',
      description: 'Sarbanes-Oxley Act financial reporting compliance',
      icon: 'FileText',
      requirements: ['Financial data access', 'User authentication logs', 'System configuration changes']
    },
    {
      id: 'gdpr',
      name: 'GDPR Compliance',
      description: 'General Data Protection Regulation compliance',
      icon: 'Shield',
      requirements: ['Personal data access', 'Data processing activities', 'User consent tracking']
    },
    {
      id: 'cjis',
      name: 'CJIS Compliance',
      description: 'Criminal Justice Information Services compliance',
      icon: 'Lock',
      requirements: ['Law enforcement data access', 'Security incident logs', 'Access control events']
    },
    {
      id: 'hipaa',
      name: 'HIPAA Compliance',
      description: 'Health Insurance Portability and Accountability Act',
      icon: 'Heart',
      requirements: ['Healthcare data access', 'Patient information logs', 'Security breach incidents']
    }
  ];

  const reportTemplates = [
    {
      id: 'executive-summary',
      name: 'Executive Summary',
      description: 'High-level overview for management',
      duration: '2-3 minutes'
    },
    {
      id: 'detailed-audit',
      name: 'Detailed Audit Report',
      description: 'Comprehensive audit trail analysis',
      duration: '5-10 minutes'
    },
    {
      id: 'incident-response',
      name: 'Incident Response Report',
      description: 'Security incident investigation summary',
      duration: '3-5 minutes'
    },
    {
      id: 'user-activity',
      name: 'User Activity Report',
      description: 'Individual user behavior analysis',
      duration: '2-4 minutes'
    }
  ];

  const recentReports = [
    {
      id: 1,
      name: 'Q4 2024 SOX Compliance Report',
      type: 'SOX',
      generatedBy: 'compliance.officer@deeptrace.com',
      generatedAt: new Date(Date.now() - 86400000),
      status: 'completed',
      format: 'PDF'
    },
    {
      id: 2,
      name: 'GDPR Data Access Audit - December',
      type: 'GDPR',
      generatedBy: 'data.protection@deeptrace.com',
      generatedAt: new Date(Date.now() - 172800000),
      status: 'completed',
      format: 'JSON'
    },
    {
      id: 3,
      name: 'Security Incident Report - Case #2024-001',
      type: 'CJIS',
      generatedBy: 'security.analyst@deeptrace.com',
      generatedAt: new Date(Date.now() - 259200000),
      status: 'processing',
      format: 'PDF'
    }
  ];

  const handleConfigChange = (key, value) => {
    setReportConfig(prev => ({ ...prev, [key]: value }));
  };

  const handleDateRangeChange = (type, value) => {
    setReportConfig(prev => ({
      ...prev,
      dateRange: { ...prev.dateRange, [type]: value }
    }));
  };

  const generateReport = () => {
    const reportData = {
      complianceType: selectedCompliance,
      config: reportConfig,
      timestamp: new Date()
    };
    onGenerateReport(reportData);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-success bg-success-50';
      case 'processing': return 'text-warning bg-warning-50';
      case 'failed': return 'text-error bg-error-50';
      default: return 'text-text-secondary bg-secondary-50';
    }
  };

  return (
    <div className="space-y-6">
      {/* Compliance Type Selection */}
      <div className="bg-surface border border-border rounded-lg shadow-primary p-6">
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
          Compliance Reporting
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {complianceTypes.map((compliance) => (
            <div
              key={compliance.id}
              className={`p-4 border rounded-lg cursor-pointer transition-micro ${
                selectedCompliance === compliance.id
                  ? 'border-primary bg-primary-50' :'border-border hover:border-primary hover:bg-background'
              }`}
              onClick={() => setSelectedCompliance(compliance.id)}
            >
              <div className="flex items-start space-x-3">
                <Icon
                  name={compliance.icon}
                  size={20}
                  className={selectedCompliance === compliance.id ? 'text-primary' : 'text-text-secondary'}
                />
                <div className="flex-1">
                  <h4 className="text-sm font-heading font-medium text-text-primary">
                    {compliance.name}
                  </h4>
                  <p className="text-xs text-text-secondary mt-1 font-caption">
                    {compliance.description}
                  </p>
                  <div className="mt-2">
                    <p className="text-xs text-text-secondary font-caption mb-1">Key Requirements:</p>
                    <ul className="text-xs text-text-secondary space-y-1">
                      {compliance.requirements.map((req, index) => (
                        <li key={index} className="flex items-center space-x-1">
                          <Icon name="Check" size={12} className="text-success" />
                          <span className="font-caption">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Report Configuration */}
        {selectedCompliance && (
          <div className="border-t border-border pt-6">
            <h4 className="text-md font-heading font-medium text-text-primary mb-4">
              Report Configuration
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Date Range */}
              <div>
                <label className="block text-sm font-heading font-medium text-text-primary mb-2">
                  Reporting Period
                </label>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs text-text-secondary mb-1 font-caption">From</label>
                    <Input
                      type="date"
                      value={reportConfig.dateRange.start}
                      onChange={(e) => handleDateRangeChange('start', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-text-secondary mb-1 font-caption">To</label>
                    <Input
                      type="date"
                      value={reportConfig.dateRange.end}
                      onChange={(e) => handleDateRangeChange('end', e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Report Options */}
              <div>
                <label className="block text-sm font-heading font-medium text-text-primary mb-2">
                  Report Options
                </label>
                <div className="space-y-3">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={reportConfig.includeAnomalies}
                      onChange={(e) => handleConfigChange('includeAnomalies', e.target.checked)}
                      className="rounded border-border"
                    />
                    <span className="text-sm text-text-primary font-caption">Include anomalies</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={reportConfig.includeUserActivity}
                      onChange={(e) => handleConfigChange('includeUserActivity', e.target.checked)}
                      className="rounded border-border"
                    />
                    <span className="text-sm text-text-primary font-caption">Include user activity</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={reportConfig.includeSystemEvents}
                      onChange={(e) => handleConfigChange('includeSystemEvents', e.target.checked)}
                      className="rounded border-border"
                    />
                    <span className="text-sm text-text-primary font-caption">Include system events</span>
                  </label>
                </div>

                {/* Format Selection */}
                <div className="mt-4">
                  <label className="block text-sm font-heading font-medium text-text-primary mb-2">
                    Export Format
                  </label>
                  <div className="flex space-x-2">
                    {['pdf', 'json', 'csv', 'xml'].map((format) => (
                      <button
                        key={format}
                        onClick={() => handleConfigChange('format', format)}
                        className={`px-3 py-1 text-xs rounded-full border transition-micro ${
                          reportConfig.format === format
                            ? 'bg-primary text-primary-foreground border-primary'
                            : 'bg-background text-text-secondary border-border hover:border-primary'
                        }`}
                      >
                        {format.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Generate Button */}
            <div className="mt-6 pt-4 border-t border-border">
              <Button
                variant="primary"
                iconName="FileText"
                onClick={generateReport}
                disabled={!reportConfig.dateRange.start || !reportConfig.dateRange.end}
              >
                Generate Compliance Report
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Report Templates */}
      <div className="bg-surface border border-border rounded-lg shadow-primary p-6">
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
          Report Templates
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reportTemplates.map((template) => (
            <div
              key={template.id}
              className="p-4 border border-border rounded-lg hover:border-primary transition-micro cursor-pointer"
              onClick={() => console.log('Use template:', template.id)}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-sm font-heading font-medium text-text-primary">
                    {template.name}
                  </h4>
                  <p className="text-xs text-text-secondary mt-1 font-caption">
                    {template.description}
                  </p>
                  <div className="flex items-center space-x-2 mt-2">
                    <Icon name="Clock" size={12} className="text-text-secondary" />
                    <span className="text-xs text-text-secondary font-caption">
                      {template.duration}
                    </span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="xs"
                  iconName="ArrowRight"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Reports */}
      <div className="bg-surface border border-border rounded-lg shadow-primary p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-heading font-semibold text-text-primary">
            Recent Reports
          </h3>
          <Button
            variant="ghost"
            size="sm"
            iconName="RefreshCw"
            onClick={() => window.location.reload()}
          />
        </div>
        
        <div className="space-y-3">
          {recentReports.map((report) => (
            <div
              key={report.id}
              className="p-4 border border-border rounded-lg hover:border-primary transition-micro"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h4 className="text-sm font-heading font-medium text-text-primary">
                      {report.name}
                    </h4>
                    <span className={`px-2 py-1 text-xs font-caption rounded-full ${getStatusColor(report.status)}`}>
                      {report.status}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4 mt-2 text-xs text-text-secondary">
                    <span className="font-caption">Type: {report.type}</span>
                    <span className="font-caption">Format: {report.format}</span>
                    <span className="font-caption">Generated: {report.generatedAt.toLocaleDateString()}</span>
                  </div>
                  <p className="text-xs text-text-secondary mt-1 font-caption">
                    By: {report.generatedBy}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="xs"
                    iconName="Download"
                    onClick={() => console.log('Download report:', report.id)}
                  />
                  <Button
                    variant="ghost"
                    size="xs"
                    iconName="Eye"
                    onClick={() => console.log('View report:', report.id)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ComplianceReporting;