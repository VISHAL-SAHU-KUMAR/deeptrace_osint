import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ThreatFeedStatus = () => {
  const [feeds, setFeeds] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    // Mock threat feed data
    const mockFeeds = [
      {
        id: 1,
        name: "MISP Threat Feed",
        status: "active",
        lastUpdate: new Date(Date.now() - 120000),
        ingestionRate: 1247,
        reliability: 95,
        threats: 15420,
        errors: 0
      },
      {
        id: 2,
        name: "AlienVault OTX",
        status: "active",
        lastUpdate: new Date(Date.now() - 300000),
        ingestionRate: 892,
        reliability: 88,
        threats: 8934,
        errors: 2
      },
      {
        id: 3,
        name: "VirusTotal Intelligence",
        status: "warning",
        lastUpdate: new Date(Date.now() - 900000),
        ingestionRate: 456,
        reliability: 92,
        threats: 23456,
        errors: 5
      },
      {
        id: 4,
        name: "Recorded Future",
        status: "active",
        lastUpdate: new Date(Date.now() - 180000),
        ingestionRate: 2134,
        reliability: 97,
        threats: 45678,
        errors: 1
      },
      {
        id: 5,
        name: "ThreatConnect",
        status: "error",
        lastUpdate: new Date(Date.now() - 1800000),
        ingestionRate: 0,
        reliability: 0,
        threats: 12345,
        errors: 15
      },
      {
        id: 6,
        name: "IBM X-Force",
        status: "active",
        lastUpdate: new Date(Date.now() - 240000),
        ingestionRate: 678,
        reliability: 91,
        threats: 9876,
        errors: 0
      }
    ];
    setFeeds(mockFeeds);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'text-success';
      case 'warning':
        return 'text-warning';
      case 'error':
        return 'text-error';
      default:
        return 'text-text-secondary';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active':
        return 'CheckCircle';
      case 'warning':
        return 'AlertTriangle';
      case 'error':
        return 'XCircle';
      default:
        return 'Circle';
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

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  const totalIngestionRate = feeds.reduce((sum, feed) => sum + feed.ingestionRate, 0);
  const averageReliability = Math.round(feeds.reduce((sum, feed) => sum + feed.reliability, 0) / feeds.length);
  const activeFeedsCount = feeds.filter(feed => feed.status === 'active').length;

  return (
    <div className="bg-surface rounded-lg border border-border shadow-primary h-full">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-heading font-semibold text-text-primary">
              Threat Feed Status
            </h3>
            <p className="text-sm text-text-secondary font-caption">
              Real-time feed monitoring
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            iconName="RefreshCw"
            loading={refreshing}
            onClick={handleRefresh}
            className="hover-lift"
          />
        </div>
      </div>

      {/* Summary Stats */}
      <div className="p-4 border-b border-border">
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-heading font-bold text-success">
              {activeFeedsCount}
            </div>
            <div className="text-xs text-text-secondary font-caption">
              Active Feeds
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-heading font-bold text-primary">
              {totalIngestionRate.toLocaleString()}
            </div>
            <div className="text-xs text-text-secondary font-caption">
              IOCs/Hour
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-heading font-bold text-accent">
              {averageReliability}%
            </div>
            <div className="text-xs text-text-secondary font-caption">
              Avg Reliability
            </div>
          </div>
        </div>
      </div>

      {/* Feed List */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-2">
          {feeds.map((feed) => (
            <div
              key={feed.id}
              className="p-3 mb-2 bg-background rounded-lg border border-border hover:shadow-elevated transition-micro"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Icon
                    name={getStatusIcon(feed.status)}
                    size={16}
                    className={getStatusColor(feed.status)}
                  />
                  <span className="text-sm font-heading font-medium text-text-primary">
                    {feed.name}
                  </span>
                </div>
                <span className="text-xs text-text-secondary font-caption">
                  {formatTimeAgo(feed.lastUpdate)}
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-text-secondary font-caption">Rate:</span>
                  <span className="ml-1 text-text-primary font-data">
                    {feed.ingestionRate}/hr
                  </span>
                </div>
                <div>
                  <span className="text-text-secondary font-caption">Reliability:</span>
                  <span className="ml-1 text-text-primary font-data">
                    {feed.reliability}%
                  </span>
                </div>
                <div>
                  <span className="text-text-secondary font-caption">Total:</span>
                  <span className="ml-1 text-text-primary font-data">
                    {feed.threats.toLocaleString()}
                  </span>
                </div>
                <div>
                  <span className="text-text-secondary font-caption">Errors:</span>
                  <span className={`ml-1 font-data ${feed.errors > 0 ? 'text-error' : 'text-success'}`}>
                    {feed.errors}
                  </span>
                </div>
              </div>

              {/* Reliability Bar */}
              <div className="mt-2">
                <div className="w-full bg-secondary-200 rounded-full h-1">
                  <div
                    className={`h-1 rounded-full ${
                      feed.reliability >= 90 ? 'bg-success' :
                      feed.reliability >= 70 ? 'bg-warning' : 'bg-error'
                    }`}
                    style={{ width: `${feed.reliability}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-border">
        <div className="flex items-center justify-between text-xs text-text-secondary font-caption">
          <span>Last updated: {formatTimeAgo(new Date(Date.now() - 60000))}</span>
          <Button
            variant="ghost"
            size="xs"
            iconName="Settings"
            onClick={() => console.log('Configure feeds')}
          >
            Configure
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ThreatFeedStatus;