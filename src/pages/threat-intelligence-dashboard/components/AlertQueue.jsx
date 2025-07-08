import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const AlertQueue = () => {
  const [alerts, setAlerts] = useState([]);
  const [selectedAlerts, setSelectedAlerts] = useState(new Set());
  const [filterSeverity, setFilterSeverity] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('timestamp');
  const [sortOrder, setSortOrder] = useState('desc');

  useEffect(() => {
    // Mock alert data
    const mockAlerts = [
      {
        id: 1,
        severity: 'critical',
        type: 'malware',
        title: 'Emotet Banking Trojan Campaign',
        description: 'New Emotet variant detected targeting financial institutions',
        affectedAssets: ['mail.company.com', '192.168.1.100'],
        confidence: 95,
        timestamp: new Date(Date.now() - 300000),
        source: 'MISP',
        ioc: 'hash:a1b2c3d4e5f6',
        status: 'new',
        analyst: null,
        ttl: new Date(Date.now() + 86400000)
      },
      {
        id: 2,
        severity: 'high',
        type: 'phishing',
        title: 'Credential Harvesting Campaign',
        description: 'Phishing emails impersonating Microsoft Office 365 login',
        affectedAssets: ['user@company.com', 'login.company.com'],
        confidence: 88,
        timestamp: new Date(Date.now() - 600000),
        source: 'AlienVault OTX',
        ioc: 'domain:fake-office365.com',
        status: 'investigating',
        analyst: 'J. Smith',
        ttl: new Date(Date.now() + 72000000)
      },
      {
        id: 3,
        severity: 'medium',
        type: 'apt',
        title: 'APT29 Infrastructure Update',
        description: 'New command and control servers identified for Cozy Bear',
        affectedAssets: ['external-api.company.com'],
        confidence: 76,
        timestamp: new Date(Date.now() - 900000),
        source: 'Recorded Future',
        ioc: 'ip:185.243.112.45',
        status: 'acknowledged',
        analyst: 'M. Johnson',
        ttl: new Date(Date.now() + 259200000)
      },
      {
        id: 4,
        severity: 'critical',
        type: 'ransomware',
        title: 'Conti Ransomware Indicators',
        description: 'Active Conti ransomware campaign targeting healthcare sector',
        affectedAssets: ['backup.company.com', '10.0.0.50'],
        confidence: 92,
        timestamp: new Date(Date.now() - 1200000),
        source: 'VirusTotal',
        ioc: 'hash:9f8e7d6c5b4a',
        status: 'escalated',
        analyst: 'A. Davis',
        ttl: new Date(Date.now() + 43200000)
      },
      {
        id: 5,
        severity: 'high',
        type: 'botnet',
        title: 'Mirai Botnet Activity',
        description: 'IoT devices compromised by Mirai variant',
        affectedAssets: ['iot-gateway.company.com'],
        confidence: 84,
        timestamp: new Date(Date.now() - 1500000),
        source: 'IBM X-Force',
        ioc: 'ip:203.0.113.42',
        status: 'resolved',
        analyst: 'K. Wilson',
        ttl: new Date(Date.now() + 21600000)
      }
    ];

    // Generate more alerts to reach 30+
    const additionalAlerts = [];
    for (let i = 6; i <= 35; i++) {
      const severities = ['critical', 'high', 'medium', 'low'];
      const types = ['malware', 'phishing', 'apt', 'ransomware', 'botnet', 'ddos'];
      const statuses = ['new', 'investigating', 'acknowledged', 'escalated', 'resolved'];
      const sources = ['MISP', 'AlienVault OTX', 'VirusTotal', 'Recorded Future', 'IBM X-Force'];
      
      additionalAlerts.push({
        id: i,
        severity: severities[Math.floor(Math.random() * severities.length)],
        type: types[Math.floor(Math.random() * types.length)],
        title: `Threat Alert ${i}`,
        description: `Automated threat detection alert ${i} from intelligence feeds`,
        affectedAssets: [`asset${i}.company.com`],
        confidence: Math.floor(Math.random() * 40) + 60,
        timestamp: new Date(Date.now() - (i * 300000)),
        source: sources[Math.floor(Math.random() * sources.length)],
        ioc: `indicator:${i}`,
        status: statuses[Math.floor(Math.random() * statuses.length)],
        analyst: Math.random() > 0.5 ? 'Analyst' : null,
        ttl: new Date(Date.now() + (Math.random() * 259200000))
      });
    }

    setAlerts([...mockAlerts, ...additionalAlerts]);
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

  const getStatusColor = (status) => {
    switch (status) {
      case 'new':
        return 'text-primary bg-primary-50 border-primary-200';
      case 'investigating':
        return 'text-warning bg-warning-50 border-warning-200';
      case 'acknowledged':
        return 'text-accent bg-accent-50 border-accent-200';
      case 'escalated':
        return 'text-error bg-error-50 border-error-200';
      case 'resolved':
        return 'text-success bg-success-50 border-success-200';
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

  const formatTTL = (date) => {
    const now = new Date();
    const diffInHours = Math.floor((date - now) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Expires soon';
    if (diffInHours < 24) return `${diffInHours}h left`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d left`;
  };

  const filteredAlerts = alerts.filter(alert => {
    const matchesSeverity = filterSeverity === 'all' || alert.severity === filterSeverity;
    const matchesType = filterType === 'all' || alert.type === filterType;
    const matchesSearch = searchTerm === '' || 
      alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesSeverity && matchesType && matchesSearch;
  });

  const sortedAlerts = [...filteredAlerts].sort((a, b) => {
    let aValue, bValue;
    
    switch (sortBy) {
      case 'severity':
        const severityOrder = { critical: 4, high: 3, medium: 2, low: 1 };
        aValue = severityOrder[a.severity];
        bValue = severityOrder[b.severity];
        break;
      case 'confidence':
        aValue = a.confidence;
        bValue = b.confidence;
        break;
      case 'timestamp':
        aValue = a.timestamp.getTime();
        bValue = b.timestamp.getTime();
        break;
      default:
        aValue = a[sortBy];
        bValue = b[sortBy];
    }
    
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const handleSelectAlert = (alertId) => {
    const newSelected = new Set(selectedAlerts);
    if (newSelected.has(alertId)) {
      newSelected.delete(alertId);
    } else {
      newSelected.add(alertId);
    }
    setSelectedAlerts(newSelected);
  };

  const handleSelectAll = () => {
    if (selectedAlerts.size === sortedAlerts.length) {
      setSelectedAlerts(new Set());
    } else {
      setSelectedAlerts(new Set(sortedAlerts.map(alert => alert.id)));
    }
  };

  const handleBulkAction = (action) => {
    console.log(`Bulk action: ${action} on alerts:`, Array.from(selectedAlerts));
    setSelectedAlerts(new Set());
  };

  const handleKeyboardShortcut = (e, alertId) => {
    if (e.key === 'a') {
      e.preventDefault();
      console.log('Acknowledge alert:', alertId);
    } else if (e.key === 'e') {
      e.preventDefault();
      console.log('Escalate alert:', alertId);
    } else if (e.key === 'r') {
      e.preventDefault();
      console.log('Relate alert:', alertId);
    }
  };

  return (
    <div className="bg-surface rounded-lg border border-border shadow-primary h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-heading font-semibold text-text-primary">
              Alert Queue
            </h3>
            <p className="text-sm text-text-secondary font-caption">
              {sortedAlerts.length} threats • {selectedAlerts.size} selected
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              iconName="Filter"
              onClick={() => console.log('Advanced filters')}
            />
            <Button
              variant="ghost"
              size="sm"
              iconName="Download"
              onClick={() => console.log('Export alerts')}
            />
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex items-center space-x-4 mb-4">
          <div className="flex-1">
            <Input
              type="search"
              placeholder="Search alerts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          <select
            value={filterSeverity}
            onChange={(e) => setFilterSeverity(e.target.value)}
            className="px-3 py-2 border border-border rounded-lg text-sm bg-surface"
          >
            <option value="all">All Severities</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-3 py-2 border border-border rounded-lg text-sm bg-surface"
          >
            <option value="all">All Types</option>
            <option value="malware">Malware</option>
            <option value="phishing">Phishing</option>
            <option value="apt">APT</option>
            <option value="ransomware">Ransomware</option>
            <option value="botnet">Botnet</option>
            <option value="ddos">DDoS</option>
          </select>
        </div>

        {/* Bulk Actions */}
        {selectedAlerts.size > 0 && (
          <div className="flex items-center space-x-2 p-3 bg-primary-50 rounded-lg">
            <span className="text-sm text-primary font-caption">
              {selectedAlerts.size} alerts selected
            </span>
            <Button
              variant="ghost"
              size="xs"
              onClick={() => handleBulkAction('acknowledge')}
            >
              Acknowledge
            </Button>
            <Button
              variant="ghost"
              size="xs"
              onClick={() => handleBulkAction('escalate')}
            >
              Escalate
            </Button>
            <Button
              variant="ghost"
              size="xs"
              onClick={() => handleBulkAction('assign')}
            >
              Assign
            </Button>
            <Button
              variant="ghost"
              size="xs"
              onClick={() => handleBulkAction('export')}
            >
              Export IOCs
            </Button>
          </div>
        )}
      </div>

      {/* Table Header */}
      <div className="px-4 py-2 border-b border-border bg-background">
        <div className="grid grid-cols-12 gap-4 text-xs font-heading font-medium text-text-secondary uppercase tracking-wider">
          <div className="col-span-1">
            <input
              type="checkbox"
              checked={selectedAlerts.size === sortedAlerts.length && sortedAlerts.length > 0}
              onChange={handleSelectAll}
              className="rounded border-border"
            />
          </div>
          <div className="col-span-2 cursor-pointer" onClick={() => setSortBy('severity')}>
            Severity
            {sortBy === 'severity' && (
              <Icon name={sortOrder === 'asc' ? 'ChevronUp' : 'ChevronDown'} size={12} className="inline ml-1" />
            )}
          </div>
          <div className="col-span-2">Type</div>
          <div className="col-span-3">Threat</div>
          <div className="col-span-1 cursor-pointer" onClick={() => setSortBy('confidence')}>
            Confidence
            {sortBy === 'confidence' && (
              <Icon name={sortOrder === 'asc' ? 'ChevronUp' : 'ChevronDown'} size={12} className="inline ml-1" />
            )}
          </div>
          <div className="col-span-1">Status</div>
          <div className="col-span-1 cursor-pointer" onClick={() => setSortBy('timestamp')}>
            Time
            {sortBy === 'timestamp' && (
              <Icon name={sortOrder === 'asc' ? 'ChevronUp' : 'ChevronDown'} size={12} className="inline ml-1" />
            )}
          </div>
          <div className="col-span-1">TTL</div>
        </div>
      </div>

      {/* Alert List */}
      <div className="flex-1 overflow-y-auto">
        {sortedAlerts.map((alert) => (
          <div
            key={alert.id}
            className={`px-4 py-3 border-b border-border hover:bg-background transition-micro cursor-pointer ${
              selectedAlerts.has(alert.id) ? 'bg-primary-50' : ''
            }`}
            onClick={() => handleSelectAlert(alert.id)}
            onKeyDown={(e) => handleKeyboardShortcut(e, alert.id)}
            tabIndex={0}
          >
            <div className="grid grid-cols-12 gap-4 items-center">
              <div className="col-span-1">
                <input
                  type="checkbox"
                  checked={selectedAlerts.has(alert.id)}
                  onChange={() => handleSelectAlert(alert.id)}
                  className="rounded border-border"
                />
              </div>
              <div className="col-span-2">
                <span className={`px-2 py-1 rounded-full text-xs font-caption border ${getSeverityColor(alert.severity)}`}>
                  {alert.severity.toUpperCase()}
                </span>
              </div>
              <div className="col-span-2">
                <span className="text-sm text-text-primary font-data capitalize">
                  {alert.type}
                </span>
              </div>
              <div className="col-span-3">
                <div className="text-sm font-heading font-medium text-text-primary truncate">
                  {alert.title}
                </div>
                <div className="text-xs text-text-secondary font-caption truncate">
                  {alert.description}
                </div>
                <div className="text-xs text-text-tertiary font-caption mt-1">
                  IOC: {alert.ioc}
                </div>
              </div>
              <div className="col-span-1">
                <div className="text-sm font-data text-text-primary">
                  {alert.confidence}%
                </div>
                <div className="w-full bg-secondary-200 rounded-full h-1 mt-1">
                  <div
                    className={`h-1 rounded-full ${
                      alert.confidence >= 90 ? 'bg-success' :
                      alert.confidence >= 70 ? 'bg-warning' : 'bg-error'
                    }`}
                    style={{ width: `${alert.confidence}%` }}
                  />
                </div>
              </div>
              <div className="col-span-1">
                <span className={`px-2 py-1 rounded-full text-xs font-caption border ${getStatusColor(alert.status)}`}>
                  {alert.status}
                </span>
              </div>
              <div className="col-span-1">
                <div className="text-xs text-text-secondary font-caption">
                  {formatTimeAgo(alert.timestamp)}
                </div>
              </div>
              <div className="col-span-1">
                <div className="text-xs text-text-secondary font-caption">
                  {formatTTL(alert.ttl)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-border">
        <div className="flex items-center justify-between text-xs text-text-secondary font-caption">
          <span>Keyboard shortcuts: A (acknowledge), E (escalate), R (relate)</span>
          <span>Auto-refresh: 30s</span>
        </div>
      </div>
    </div>
  );
};

export default AlertQueue;