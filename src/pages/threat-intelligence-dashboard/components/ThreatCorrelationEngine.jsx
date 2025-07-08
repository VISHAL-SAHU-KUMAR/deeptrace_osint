import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ThreatCorrelationEngine = () => {
  const [correlations, setCorrelations] = useState([]);
  const [activeInvestigations, setActiveInvestigations] = useState([]);
  const [processingStatus, setProcessingStatus] = useState('active');

  useEffect(() => {
    // Mock correlation data
    const mockCorrelations = [
      {
        id: 1,
        threatId: 'THR-2024-001',
        investigationId: 'INV-2024-045',
        investigationTitle: 'Financial Sector Malware Campaign',
        correlationScore: 94,
        matchType: 'IOC Overlap',
        matchedIndicators: ['hash:a1b2c3d4e5f6', 'domain:malicious-c2.example.com'],
        confidence: 'High',
        timestamp: new Date(Date.now() - 300000),
        analyst: 'Sarah Chen',
        status: 'active'
      },
      {
        id: 2,
        threatId: 'THR-2024-002',
        investigationId: 'INV-2024-038',
        investigationTitle: 'APT29 Infrastructure Analysis',
        correlationScore: 87,
        matchType: 'TTP Similarity',
        matchedIndicators: ['technique:T1566.001', 'technique:T1055'],
        confidence: 'High',
        timestamp: new Date(Date.now() - 600000),
        analyst: 'Michael Rodriguez',
        status: 'reviewing'
      },
      {
        id: 3,
        threatId: 'THR-2024-003',
        investigationId: 'INV-2024-052',
        investigationTitle: 'Ransomware Attribution Study',
        correlationScore: 76,
        matchType: 'Geographic Pattern',
        matchedIndicators: ['location:Eastern Europe', 'timezone:UTC+2'],
        confidence: 'Medium',
        timestamp: new Date(Date.now() - 900000),
        analyst: 'Alex Thompson',
        status: 'pending'
      },
      {
        id: 4,
        threatId: 'THR-2024-004',
        investigationId: 'INV-2024-041',
        investigationTitle: 'Phishing Campaign Investigation',
        correlationScore: 82,
        matchType: 'Infrastructure Overlap',
        matchedIndicators: ['ip:185.243.112.45', 'asn:AS12345'],
        confidence: 'High',
        timestamp: new Date(Date.now() - 1200000),
        analyst: 'Jennifer Park',
        status: 'active'
      },
      {
        id: 5,
        threatId: 'THR-2024-005',
        investigationId: 'INV-2024-049',
        investigationTitle: 'Cryptocurrency Theft Analysis',
        correlationScore: 69,
        matchType: 'Behavioral Pattern',
        matchedIndicators: ['behavior:credential_theft', 'behavior:lateral_movement'],
        confidence: 'Medium',
        timestamp: new Date(Date.now() - 1500000),
        analyst: 'David Kim',
        status: 'completed'
      }
    ];

    const mockInvestigations = [
      {
        id: 'INV-2024-045',
        title: 'Financial Sector Malware Campaign',
        priority: 'critical',
        analyst: 'Sarah Chen',
        created: new Date(Date.now() - 86400000),
        lastActivity: new Date(Date.now() - 300000),
        threatCount: 12,
        status: 'active'
      },
      {
        id: 'INV-2024-052',
        title: 'Ransomware Attribution Study',
        priority: 'high',
        analyst: 'Alex Thompson',
        created: new Date(Date.now() - 172800000),
        lastActivity: new Date(Date.now() - 900000),
        threatCount: 8,
        status: 'active'
      },
      {
        id: 'INV-2024-041',
        title: 'Phishing Campaign Investigation',
        priority: 'medium',
        analyst: 'Jennifer Park',
        created: new Date(Date.now() - 259200000),
        lastActivity: new Date(Date.now() - 1200000),
        threatCount: 15,
        status: 'active'
      }
    ];

    setCorrelations(mockCorrelations);
    setActiveInvestigations(mockInvestigations);
  }, []);

  const getConfidenceColor = (confidence) => {
    switch (confidence.toLowerCase()) {
      case 'high':
        return 'text-success bg-success-50 border-success-200';
      case 'medium':
        return 'text-warning bg-warning-50 border-warning-200';
      case 'low':
        return 'text-error bg-error-50 border-error-200';
      default:
        return 'text-text-secondary bg-secondary-50 border-secondary-200';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'text-success bg-success-50 border-success-200';
      case 'reviewing':
        return 'text-warning bg-warning-50 border-warning-200';
      case 'pending':
        return 'text-accent bg-accent-50 border-accent-200';
      case 'completed':
        return 'text-text-secondary bg-secondary-50 border-secondary-200';
      default:
        return 'text-text-secondary bg-secondary-50 border-secondary-200';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical':
        return 'text-error bg-error-50 border-error-200';
      case 'high':
        return 'text-warning bg-warning-50 border-warning-200';
      case 'medium':
        return 'text-accent bg-accent-50 border-accent-200';
      case 'low':
        return 'text-text-secondary bg-secondary-50 border-secondary-200';
      default:
        return 'text-text-secondary bg-secondary-50 border-secondary-200';
    }
  };

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

  const handleCorrelationAction = (correlationId, action) => {
    console.log(`${action} correlation:`, correlationId);
  };

  const getMatchTypeIcon = (matchType) => {
    switch (matchType) {
      case 'IOC Overlap':
        return 'Target';
      case 'TTP Similarity':
        return 'GitBranch';
      case 'Geographic Pattern':
        return 'MapPin';
      case 'Infrastructure Overlap':
        return 'Server';
      case 'Behavioral Pattern':
        return 'Activity';
      default:
        return 'Link';
    }
  };

  return (
    <div className="space-y-6">
      {/* Correlation Engine Status */}
      <div className="bg-surface rounded-lg border border-border shadow-primary p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-heading font-semibold text-text-primary">
              Correlation Engine
            </h3>
            <p className="text-sm text-text-secondary font-caption">
              Automated threat-to-investigation matching
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${processingStatus === 'active' ? 'bg-success pulse-subtle' : 'bg-error'}`} />
            <span className="text-sm font-caption text-text-secondary">
              {processingStatus === 'active' ? 'Processing' : 'Offline'}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-heading font-bold text-primary">
              {correlations.length}
            </div>
            <div className="text-xs text-text-secondary font-caption">
              Active Correlations
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-heading font-bold text-success">
              {correlations.filter(c => c.confidence === 'High').length}
            </div>
            <div className="text-xs text-text-secondary font-caption">
              High Confidence
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-heading font-bold text-accent">
              {Math.round(correlations.reduce((sum, c) => sum + c.correlationScore, 0) / correlations.length)}
            </div>
            <div className="text-xs text-text-secondary font-caption">
              Avg Score
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-heading font-bold text-warning">
              {activeInvestigations.length}
            </div>
            <div className="text-xs text-text-secondary font-caption">
              Active Cases
            </div>
          </div>
        </div>
      </div>

      {/* Threat Correlations */}
      <div className="bg-surface rounded-lg border border-border shadow-primary">
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            <h4 className="text-md font-heading font-semibold text-text-primary">
              Threat Correlations
            </h4>
            <Button
              variant="ghost"
              size="sm"
              iconName="Settings"
              onClick={() => console.log('Configure correlation rules')}
            >
              Configure Rules
            </Button>
          </div>
        </div>

        <div className="divide-y divide-border">
          {correlations.map((correlation) => (
            <div key={correlation.id} className="p-4 hover:bg-background transition-micro">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <Icon
                    name={getMatchTypeIcon(correlation.matchType)}
                    size={20}
                    className="text-primary"
                  />
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-heading font-medium text-text-primary">
                        {correlation.investigationTitle}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-caption border ${getStatusColor(correlation.status)}`}>
                        {correlation.status}
                      </span>
                    </div>
                    <div className="text-xs text-text-secondary font-caption">
                      {correlation.investigationId} • {correlation.matchType}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-heading font-bold text-primary">
                    {correlation.correlationScore}%
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-caption border ${getConfidenceColor(correlation.confidence)}`}>
                    {correlation.confidence}
                  </span>
                </div>
              </div>

              <div className="mb-3">
                <span className="text-xs font-caption text-text-secondary">Matched Indicators:</span>
                <div className="mt-1 flex flex-wrap gap-1">
                  {correlation.matchedIndicators.map((indicator, index) => (
                    <span key={index} className="bg-secondary-100 text-text-primary px-2 py-1 rounded text-xs font-data">
                      {indicator}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-xs text-text-secondary font-caption">
                  Analyst: {correlation.analyst} • {formatTimeAgo(correlation.timestamp)}
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="xs"
                    iconName="Eye"
                    onClick={() => handleCorrelationAction(correlation.id, 'view')}
                  >
                    View
                  </Button>
                  <Button
                    variant="ghost"
                    size="xs"
                    iconName="Link"
                    onClick={() => handleCorrelationAction(correlation.id, 'link')}
                  >
                    Link
                  </Button>
                  <Button
                    variant="ghost"
                    size="xs"
                    iconName="X"
                    onClick={() => handleCorrelationAction(correlation.id, 'dismiss')}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Active Investigations */}
      <div className="bg-surface rounded-lg border border-border shadow-primary">
        <div className="p-4 border-b border-border">
          <h4 className="text-md font-heading font-semibold text-text-primary">
            Active Investigations
          </h4>
          <p className="text-sm text-text-secondary font-caption">
            Cases available for threat correlation
          </p>
        </div>

        <div className="divide-y divide-border">
          {activeInvestigations.map((investigation) => (
            <div key={investigation.id} className="p-4 hover:bg-background transition-micro">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <Icon name="FolderOpen" size={20} className="text-primary" />
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-heading font-medium text-text-primary">
                        {investigation.title}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-caption border ${getPriorityColor(investigation.priority)}`}>
                        {investigation.priority}
                      </span>
                    </div>
                    <div className="text-xs text-text-secondary font-caption">
                      {investigation.id} • {investigation.analyst}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-heading font-medium text-text-primary">
                    {investigation.threatCount} threats
                  </div>
                  <div className="text-xs text-text-secondary font-caption">
                    Updated {formatTimeAgo(investigation.lastActivity)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ThreatCorrelationEngine;