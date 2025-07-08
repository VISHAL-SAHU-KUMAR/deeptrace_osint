import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RealTimeStream = ({ isActive, onToggle }) => {
  const [streamData, setStreamData] = useState([]);
  const [isPaused, setIsPaused] = useState(false);

  // Mock real-time data generation
  useEffect(() => {
    if (!isActive || isPaused) return;

    const interval = setInterval(() => {
      const newEntry = {
        id: Date.now(),
        timestamp: new Date(),
        user: ['john.doe@deeptrace.com', 'sarah.wilson@deeptrace.com', 'admin@deeptrace.com'][Math.floor(Math.random() * 3)],
        action: ['Login Attempt', 'Data Export', 'Configuration Change', 'File Access'][Math.floor(Math.random() * 4)],
        status: ['success', 'failed', 'warning'][Math.floor(Math.random() * 3)],
        severity: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)],
        ipAddress: `192.168.1.${Math.floor(Math.random() * 255)}`,
        isAnomaly: Math.random() > 0.9
      };

      setStreamData(prev => [newEntry, ...prev.slice(0, 49)]); // Keep last 50 entries
    }, 2000 + Math.random() * 3000); // Random interval between 2-5 seconds

    return () => clearInterval(interval);
  }, [isActive, isPaused]);

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'text-error bg-error-50 border-error';
      case 'medium': return 'text-warning bg-warning-50 border-warning';
      case 'low': return 'text-success bg-success-50 border-success';
      default: return 'text-text-secondary bg-secondary-50 border-border';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'success': return { icon: 'CheckCircle', color: 'text-success' };
      case 'failed': return { icon: 'XCircle', color: 'text-error' };
      case 'warning': return { icon: 'AlertTriangle', color: 'text-warning' };
      default: return { icon: 'Info', color: 'text-text-secondary' };
    }
  };

  const clearStream = () => {
    setStreamData([]);
  };

  if (!isActive) {
    return (
      <div className="bg-surface border border-border rounded-lg shadow-primary p-6 text-center">
        <Icon name="Play" size={48} className="text-text-secondary mx-auto mb-4" />
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-2">
          Real-Time Stream Inactive
        </h3>
        <p className="text-text-secondary mb-4 font-caption">
          Enable real-time monitoring to see live system activity
        </p>
        <Button
          variant="primary"
          iconName="Play"
          onClick={onToggle}
        >
          Start Real-Time Stream
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-surface border border-border rounded-lg shadow-primary">
      {/* Stream Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-success rounded-full pulse-subtle" />
              <h3 className="text-lg font-heading font-semibold text-text-primary">
                Live Activity Stream
              </h3>
            </div>
            <span className="px-2 py-1 bg-success-50 text-success text-xs rounded-md font-caption">
              {streamData.length} events
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              iconName={isPaused ? 'Play' : 'Pause'}
              onClick={() => setIsPaused(!isPaused)}
            >
              {isPaused ? 'Resume' : 'Pause'}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              iconName="Trash2"
              onClick={clearStream}
            >
              Clear
            </Button>
            <Button
              variant="ghost"
              size="sm"
              iconName="Square"
              onClick={onToggle}
            >
              Stop
            </Button>
          </div>
        </div>
      </div>

      {/* Stream Content */}
      <div className="h-96 overflow-y-auto">
        {streamData.length === 0 ? (
          <div className="flex items-center justify-center h-full text-text-secondary">
            <div className="text-center">
              <Icon name="Activity" size={32} className="mx-auto mb-2 opacity-50" />
              <p className="font-caption">Waiting for activity...</p>
            </div>
          </div>
        ) : (
          <div className="p-4 space-y-3">
            {streamData.map((entry) => {
              const statusInfo = getStatusIcon(entry.status);
              return (
                <div
                  key={entry.id}
                  className={`p-3 rounded-lg border transition-micro ${
                    entry.isAnomaly 
                      ? 'bg-warning-50 border-warning animate-pulse' :'bg-background border-border hover:border-primary'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1">
                      <Icon
                        name={statusInfo.icon}
                        size={16}
                        className={`${statusInfo.color} mt-1`}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <p className="text-sm font-heading font-medium text-text-primary">
                            {entry.action}
                          </p>
                          {entry.isAnomaly && (
                            <span className="px-2 py-1 bg-error-50 text-error text-xs rounded-full font-caption">
                              Anomaly
                            </span>
                          )}
                        </div>
                        <div className="flex items-center space-x-4 mt-1">
                          <span className="text-xs text-text-secondary font-caption">
                            {entry.user}
                          </span>
                          <span className="text-xs text-text-secondary font-data">
                            {entry.ipAddress}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 text-xs font-caption rounded-full border ${getSeverityColor(entry.severity)}`}>
                        {entry.severity}
                      </span>
                      <span className="text-xs text-text-tertiary font-data">
                        {entry.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Stream Footer */}
      <div className="p-3 border-t border-border bg-background">
        <div className="flex items-center justify-between text-xs text-text-secondary">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-success rounded-full" />
              <span className="font-caption">Live</span>
            </div>
            <span className="font-caption">
              Last update: {streamData.length > 0 ? streamData[0].timestamp.toLocaleTimeString() : 'Never'}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="font-caption">Auto-scroll</span>
            <input type="checkbox" defaultChecked className="rounded border-border" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealTimeStream;