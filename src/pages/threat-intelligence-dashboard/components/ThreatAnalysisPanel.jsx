import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';


const ThreatAnalysisPanel = () => {
  const [selectedThreat, setSelectedThreat] = useState(null);
  const [analysisTab, setAnalysisTab] = useState('overview');
  const [relatedThreats, setRelatedThreats] = useState([]);
  const [iocData, setIocData] = useState([]);

  useEffect(() => {
    // Mock selected threat data
    const mockThreat = {
      id: 1,
      title: 'Emotet Banking Trojan Campaign',
      severity: 'critical',
      type: 'malware',
      confidence: 95,
      firstSeen: new Date(Date.now() - 86400000),
      lastSeen: new Date(Date.now() - 300000),
      source: 'MISP',
      description: `Advanced banking trojan campaign targeting financial institutions across North America and Europe. The malware exhibits sophisticated evasion techniques and modular architecture allowing for dynamic payload delivery.

This variant demonstrates enhanced anti-analysis capabilities including VM detection, sandbox evasion, and encrypted C2 communications. The campaign appears to be operated by a financially motivated threat actor with ties to Eastern European cybercriminal networks.`,
      
      technicalDetails: {
        family: 'Emotet',
        variant: 'Epoch 5',
        architecture: 'x86/x64',
        persistence: 'Registry Run Keys, Scheduled Tasks',
        communication: 'HTTPS over port 443, 8080',
        encryption: 'RSA-2048, AES-256',
        capabilities: ['Banking credential theft', 'Email harvesting', 'Lateral movement', 'Payload delivery']
      },
      
      geolocation: {
        primaryTargets: ['United States', 'Germany', 'United Kingdom', 'Canada'],
        c2Locations: ['Netherlands', 'Romania', 'Ukraine'],
        infectionCount: 15420
      },
      
      timeline: [
        { date: new Date(Date.now() - 86400000), event: 'Initial detection in MISP feeds' },
        { date: new Date(Date.now() - 72000000), event: 'C2 infrastructure identified' },
        { date: new Date(Date.now() - 43200000), event: 'Banking module analysis completed' },
        { date: new Date(Date.now() - 21600000), event: 'Attribution to TA542 confirmed' },
        { date: new Date(Date.now() - 3600000), event: 'IOC sharing with partner organizations' }
      ],
      
      mitigation: {
        immediate: [
          'Block identified C2 domains and IPs',
          'Update email security filters',
          'Deploy behavioral detection rules',
          'Increase monitoring of banking applications'
        ],
        longTerm: [
          'Implement application whitelisting',
          'Enhance user security awareness training',
          'Deploy advanced endpoint protection',
          'Establish threat hunting procedures'
        ]
      },
      
      attribution: {
        threatActor: 'TA542 (Mummy Spider)',
        motivation: 'Financial gain',
        sophistication: 'High',
        resources: 'Well-funded criminal organization',
        ttps: ['T1566.001', 'T1055', 'T1083', 'T1005', 'T1041']
      }
    };

    const mockRelatedThreats = [
      {
        id: 2,
        title: 'TrickBot Banking Trojan',
        similarity: 87,
        relationship: 'Same threat actor',
        lastSeen: new Date(Date.now() - 172800000)
      },
      {
        id: 3,
        title: 'Qbot Credential Harvester',
        similarity: 73,
        relationship: 'Similar TTPs',
        lastSeen: new Date(Date.now() - 259200000)
      },
      {
        id: 4,
        title: 'IcedID Banking Malware',
        similarity: 69,
        relationship: 'Shared infrastructure',
        lastSeen: new Date(Date.now() - 345600000)
      }
    ];

    const mockIocData = [
      {
        type: 'hash',
        value: 'a1b2c3d4e5f6789012345678901234567890abcd',
        description: 'Main executable SHA-1 hash',
        confidence: 95,
        firstSeen: new Date(Date.now() - 86400000)
      },
      {
        type: 'domain',
        value: 'malicious-c2.example.com',
        description: 'Primary command and control server',
        confidence: 92,
        firstSeen: new Date(Date.now() - 72000000)
      },
      {
        type: 'ip',
        value: '185.243.112.45',
        description: 'C2 server IP address',
        confidence: 88,
        firstSeen: new Date(Date.now() - 64800000)
      },
      {
        type: 'url',
        value: 'https://fake-bank-login.example.com/auth',
        description: 'Phishing landing page',
        confidence: 91,
        firstSeen: new Date(Date.now() - 57600000)
      },
      {
        type: 'email',
        value: 'invoice@fake-company.com',
        description: 'Malicious sender address',
        confidence: 85,
        firstSeen: new Date(Date.now() - 50400000)
      }
    ];

    setSelectedThreat(mockThreat);
    setRelatedThreats(mockRelatedThreats);
    setIocData(mockIocData);
  }, []);

  const getSeverityColor = (severity) => {
    switch (severity) {
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
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Less than 1 hour ago';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} days ago`;
  };

  const getIocIcon = (type) => {
    switch (type) {
      case 'hash':
        return 'Hash';
      case 'domain':
        return 'Globe';
      case 'ip':
        return 'Server';
      case 'url':
        return 'Link';
      case 'email':
        return 'Mail';
      default:
        return 'AlertTriangle';
    }
  };

  if (!selectedThreat) {
    return (
      <div className="bg-surface rounded-lg border border-border shadow-primary h-full flex items-center justify-center">
        <div className="text-center">
          <Icon name="Shield" size={48} className="text-text-secondary mx-auto mb-4" />
          <h3 className="text-lg font-heading font-medium text-text-primary mb-2">
            No Threat Selected
          </h3>
          <p className="text-text-secondary font-caption">
            Select a threat from the alert queue to view detailed analysis
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface rounded-lg border border-border shadow-primary h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <span className={`px-2 py-1 rounded-full text-xs font-caption border ${getSeverityColor(selectedThreat.severity)}`}>
                {selectedThreat.severity.toUpperCase()}
              </span>
              <span className="text-sm text-text-secondary font-caption">
                {selectedThreat.type.toUpperCase()}
              </span>
              <span className="text-sm text-text-secondary font-caption">
                Confidence: {selectedThreat.confidence}%
              </span>
            </div>
            <h3 className="text-lg font-heading font-semibold text-text-primary mb-1">
              {selectedThreat.title}
            </h3>
            <p className="text-sm text-text-secondary font-caption">
              Source: {selectedThreat.source} • First seen: {formatTimeAgo(selectedThreat.firstSeen)}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              iconName="Share"
              onClick={() => console.log('Share threat intelligence')}
            />
            <Button
              variant="ghost"
              size="sm"
              iconName="Download"
              onClick={() => console.log('Export threat data')}
            />
            <Button
              variant="ghost"
              size="sm"
              iconName="MoreVertical"
              onClick={() => console.log('More actions')}
            />
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-border">
        <nav className="flex space-x-8 px-4">
          {[
            { id: 'overview', label: 'Overview', icon: 'Eye' },
            { id: 'technical', label: 'Technical', icon: 'Code' },
            { id: 'iocs', label: 'IOCs', icon: 'Target' },
            { id: 'timeline', label: 'Timeline', icon: 'Clock' },
            { id: 'attribution', label: 'Attribution', icon: 'Users' },
            { id: 'mitigation', label: 'Mitigation', icon: 'Shield' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setAnalysisTab(tab.id)}
              className={`flex items-center space-x-2 py-3 px-1 border-b-2 font-heading font-medium text-sm transition-micro ${
                analysisTab === tab.id
                  ? 'border-primary text-primary' :'border-transparent text-text-secondary hover:text-text-primary'
              }`}
            >
              <Icon name={tab.icon} size={16} />
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {analysisTab === 'overview' && (
          <div className="space-y-6">
            <div>
              <h4 className="text-md font-heading font-semibold text-text-primary mb-3">
                Threat Description
              </h4>
              <div className="prose prose-sm max-w-none">
                <p className="text-text-primary font-body whitespace-pre-line">
                  {selectedThreat.description}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <h4 className="text-md font-heading font-semibold text-text-primary mb-3">
                  Geographic Distribution
                </h4>
                <div className="space-y-2">
                  <div>
                    <span className="text-sm font-caption text-text-secondary">Primary Targets:</span>
                    <div className="mt-1">
                      {selectedThreat.geolocation.primaryTargets.map((country, index) => (
                        <span key={index} className="inline-block bg-primary-50 text-primary px-2 py-1 rounded text-xs font-caption mr-2 mb-1">
                          {country}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="text-sm font-caption text-text-secondary">C2 Locations:</span>
                    <div className="mt-1">
                      {selectedThreat.geolocation.c2Locations.map((country, index) => (
                        <span key={index} className="inline-block bg-error-50 text-error px-2 py-1 rounded text-xs font-caption mr-2 mb-1">
                          {country}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="mt-3">
                    <span className="text-sm font-caption text-text-secondary">Total Infections:</span>
                    <span className="ml-2 text-lg font-heading font-bold text-error">
                      {selectedThreat.geolocation.infectionCount.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-md font-heading font-semibold text-text-primary mb-3">
                  Related Threats
                </h4>
                <div className="space-y-2">
                  {relatedThreats.map((threat) => (
                    <div key={threat.id} className="p-3 bg-background rounded-lg border border-border">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-heading font-medium text-text-primary">
                          {threat.title}
                        </span>
                        <span className="text-xs text-success font-data">
                          {threat.similarity}% match
                        </span>
                      </div>
                      <div className="text-xs text-text-secondary font-caption">
                        {threat.relationship} • {formatTimeAgo(threat.lastSeen)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {analysisTab === 'technical' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h4 className="text-md font-heading font-semibold text-text-primary mb-3">
                  Malware Details
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm font-caption text-text-secondary">Family:</span>
                    <span className="text-sm font-data text-text-primary">{selectedThreat.technicalDetails.family}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-caption text-text-secondary">Variant:</span>
                    <span className="text-sm font-data text-text-primary">{selectedThreat.technicalDetails.variant}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-caption text-text-secondary">Architecture:</span>
                    <span className="text-sm font-data text-text-primary">{selectedThreat.technicalDetails.architecture}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-caption text-text-secondary">Persistence:</span>
                    <span className="text-sm font-data text-text-primary">{selectedThreat.technicalDetails.persistence}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-caption text-text-secondary">Communication:</span>
                    <span className="text-sm font-data text-text-primary">{selectedThreat.technicalDetails.communication}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-caption text-text-secondary">Encryption:</span>
                    <span className="text-sm font-data text-text-primary">{selectedThreat.technicalDetails.encryption}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-md font-heading font-semibold text-text-primary mb-3">
                  Capabilities
                </h4>
                <div className="space-y-2">
                  {selectedThreat.technicalDetails.capabilities.map((capability, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Icon name="CheckCircle" size={16} className="text-success" />
                      <span className="text-sm text-text-primary font-body">{capability}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {analysisTab === 'iocs' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-md font-heading font-semibold text-text-primary">
                Indicators of Compromise
              </h4>
              <Button
                variant="ghost"
                size="sm"
                iconName="Download"
                onClick={() => console.log('Export IOCs')}
              >
                Export STIX
              </Button>
            </div>
            <div className="space-y-3">
              {iocData.map((ioc, index) => (
                <div key={index} className="p-4 bg-background rounded-lg border border-border">
                  <div className="flex items-start space-x-3">
                    <Icon name={getIocIcon(ioc.type)} size={20} className="text-primary mt-1" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-heading font-medium text-text-primary uppercase">
                          {ioc.type}
                        </span>
                        <span className="text-xs text-success font-data">
                          {ioc.confidence}% confidence
                        </span>
                      </div>
                      <div className="text-sm font-data text-text-primary bg-secondary-50 p-2 rounded mb-2 break-all">
                        {ioc.value}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-text-secondary font-caption">
                          {ioc.description}
                        </span>
                        <span className="text-xs text-text-secondary font-caption">
                          First seen: {formatTimeAgo(ioc.firstSeen)}
                        </span>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="xs"
                      iconName="Copy"
                      onClick={() => navigator.clipboard.writeText(ioc.value)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {analysisTab === 'timeline' && (
          <div>
            <h4 className="text-md font-heading font-semibold text-text-primary mb-4">
              Investigation Timeline
            </h4>
            <div className="space-y-4">
              {selectedThreat.timeline.map((event, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-2 h-2 bg-primary rounded-full mt-2" />
                  <div className="flex-1">
                    <div className="text-sm font-heading font-medium text-text-primary">
                      {event.event}
                    </div>
                    <div className="text-xs text-text-secondary font-caption">
                      {formatTimeAgo(event.date)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {analysisTab === 'attribution' && (
          <div className="space-y-6">
            <div>
              <h4 className="text-md font-heading font-semibold text-text-primary mb-3">
                Threat Actor Profile
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm font-caption text-text-secondary">Actor:</span>
                    <span className="text-sm font-data text-text-primary">{selectedThreat.attribution.threatActor}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-caption text-text-secondary">Motivation:</span>
                    <span className="text-sm font-data text-text-primary">{selectedThreat.attribution.motivation}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-caption text-text-secondary">Sophistication:</span>
                    <span className="text-sm font-data text-text-primary">{selectedThreat.attribution.sophistication}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-caption text-text-secondary">Resources:</span>
                    <span className="text-sm font-data text-text-primary">{selectedThreat.attribution.resources}</span>
                  </div>
                </div>
                <div>
                  <span className="text-sm font-caption text-text-secondary">MITRE ATT&CK TTPs:</span>
                  <div className="mt-2 space-y-1">
                    {selectedThreat.attribution.ttps.map((ttp, index) => (
                      <span key={index} className="inline-block bg-accent-50 text-accent px-2 py-1 rounded text-xs font-data mr-2 mb-1">
                        {ttp}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {analysisTab === 'mitigation' && (
          <div className="space-y-6">
            <div>
              <h4 className="text-md font-heading font-semibold text-text-primary mb-3">
                Immediate Actions
              </h4>
              <div className="space-y-2">
                {selectedThreat.mitigation.immediate.map((action, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-error-50 rounded-lg">
                    <Icon name="AlertTriangle" size={16} className="text-error mt-0.5" />
                    <span className="text-sm text-text-primary font-body">{action}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-md font-heading font-semibold text-text-primary mb-3">
                Long-term Recommendations
              </h4>
              <div className="space-y-2">
                {selectedThreat.mitigation.longTerm.map((action, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-primary-50 rounded-lg">
                    <Icon name="Shield" size={16} className="text-primary mt-0.5" />
                    <span className="text-sm text-text-primary font-body">{action}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ThreatAnalysisPanel;