import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const IntelligenceFeed = ({ feeds, alerts }) => {
  const [activeTab, setActiveTab] = useState('feeds');
  const [feedFilter, setFeedFilter] = useState('all');

  const feedTypes = {
    'threat-intel': { label: 'Threat Intel', color: 'text-error', icon: 'Shield' },
    'osint': { label: 'OSINT', color: 'text-primary', icon: 'Search' },
    'social': { label: 'Social Media', color: 'text-accent', icon: 'MessageCircle' },
    'dark-web': { label: 'Dark Web', color: 'text-secondary', icon: 'Eye' },
    'network': { label: 'Network', color: 'text-success', icon: 'Globe' }
  };

  const alertTypes = {
    'critical': { color: 'text-error', bg: 'bg-error-50', icon: 'AlertTriangle' },
    'high': { color: 'text-warning', bg: 'bg-warning-50', icon: 'AlertCircle' },
    'medium': { color: 'text-accent', bg: 'bg-accent-50', icon: 'Info' },
    'low': { color: 'text-success', bg: 'bg-success-50', icon: 'CheckCircle' }
  };

  const filteredFeeds = feedFilter === 'all' 
    ? feeds 
    : feeds.filter(feed => feed.type === feedFilter);

  const formatTimeAgo = (date) => {
    const now = new Date();
    const diff = now - new Date(date);
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
  };

  return (
    <div className="h-full bg-surface border-l border-border flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-heading font-semibold text-text-primary">
            Intelligence Feed
          </h2>
          <Button
            variant="ghost"
            size="xs"
            iconName="Settings"
            onClick={() => console.log('Feed settings')}
          />
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-background rounded-lg p-1">
          <button
            onClick={() => setActiveTab('feeds')}
            className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-micro ${
              activeTab === 'feeds' ?'bg-surface text-text-primary shadow-sm' :'text-text-secondary hover:text-text-primary'
            }`}
          >
            Feeds
          </button>
          <button
            onClick={() => setActiveTab('alerts')}
            className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-micro relative ${
              activeTab === 'alerts' ?'bg-surface text-text-primary shadow-sm' :'text-text-secondary hover:text-text-primary'
            }`}
          >
            Alerts
            {alerts.filter(a => a.unread).length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-error text-error-foreground text-xs rounded-full flex items-center justify-center">
                {alerts.filter(a => a.unread).length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        {activeTab === 'feeds' ? (
          <div className="h-full flex flex-col">
            {/* Feed Filter */}
            <div className="p-4 border-b border-border">
              <select
                value={feedFilter}
                onChange={(e) => setFeedFilter(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="all">All Sources</option>
                {Object.entries(feedTypes).map(([key, type]) => (
                  <option key={key} value={key}>{type.label}</option>
                ))}
              </select>
            </div>

            {/* Feed Items */}
            <div className="flex-1 overflow-y-auto p-2">
              {filteredFeeds.map((feed) => {
                const feedType = feedTypes[feed.type];
                return (
                  <div
                    key={feed.id}
                    className={`p-3 mb-2 rounded-lg border transition-micro hover:shadow-sm cursor-pointer ${
                      feed.unread ? 'bg-primary-50 border-primary-200' : 'bg-surface border-border hover:bg-background'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <Icon
                        name={feedType.icon}
                        size={16}
                        className={`mt-1 ${feedType.color}`}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className={`text-xs font-medium ${feedType.color}`}>
                            {feedType.label}
                          </span>
                          <span className="text-xs text-text-tertiary">
                            {formatTimeAgo(feed.timestamp)}
                          </span>
                        </div>
                        <h4 className="text-sm font-medium text-text-primary mb-1 line-clamp-2">
                          {feed.title}
                        </h4>
                        <p className="text-xs text-text-secondary line-clamp-3 mb-2">
                          {feed.content}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-text-tertiary">
                            Source: {feed.source}
                          </span>
                          {feed.confidence && (
                            <span className="text-xs font-medium text-success">
                              {feed.confidence}% confidence
                            </span>
                          )}
                        </div>
                      </div>
                      {feed.unread && (
                        <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="h-full overflow-y-auto p-2">
            {alerts.map((alert) => {
              const alertType = alertTypes[alert.severity];
              return (
                <div
                  key={alert.id}
                  className={`p-3 mb-2 rounded-lg border transition-micro hover:shadow-sm cursor-pointer ${
                    alert.unread ? `${alertType.bg} border-current` : 'bg-surface border-border hover:bg-background'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <Icon
                      name={alertType.icon}
                      size={16}
                      className={`mt-1 ${alertType.color}`}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-xs font-medium uppercase ${alertType.color}`}>
                          {alert.severity}
                        </span>
                        <span className="text-xs text-text-tertiary">
                          {formatTimeAgo(alert.timestamp)}
                        </span>
                      </div>
                      <h4 className="text-sm font-medium text-text-primary mb-1">
                        {alert.title}
                      </h4>
                      <p className="text-xs text-text-secondary mb-2">
                        {alert.message}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-text-tertiary">
                          Case: {alert.caseId}
                        </span>
                        <Button
                          variant="ghost"
                          size="xs"
                          iconName="ExternalLink"
                          onClick={(e) => {
                            e.stopPropagation();
                            console.log('View alert details');
                          }}
                        />
                      </div>
                    </div>
                    {alert.unread && (
                      <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-border bg-background">
        <div className="flex items-center justify-between text-xs text-text-secondary">
          <span>
            {activeTab === 'feeds' ? filteredFeeds.length : alerts.length} items
          </span>
          <Button
            variant="ghost"
            size="xs"
            iconName="RefreshCw"
            onClick={() => console.log('Refresh feed')}
          >
            Refresh
          </Button>
        </div>
      </div>
    </div>
  );
};

export default IntelligenceFeed;