import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const CollectionConfigPanel = ({ onStartCollection, onBulkUpload }) => {
  const [activeTab, setActiveTab] = useState('targets');
  const [targets, setTargets] = useState('');
  const [scheduleConfig, setScheduleConfig] = useState({
    type: 'immediate',
    cronExpression: '0 */6 * * *',
    startDate: '',
    endDate: ''
  });

  const collectionTypes = [
    { id: 'social-media', name: 'Social Media', icon: 'Users', enabled: true },
    { id: 'domain-analysis', name: 'Domain Analysis', icon: 'Globe', enabled: true },
    { id: 'email-investigation', name: 'Email Investigation', icon: 'Mail', enabled: false },
    { id: 'phone-lookup', name: 'Phone Lookup', icon: 'Phone', enabled: false },
    { id: 'image-reverse', name: 'Image Reverse Search', icon: 'Image', enabled: true },
    { id: 'threat-intel', name: 'Threat Intelligence', icon: 'Shield', enabled: true }
  ];

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      onBulkUpload(file);
    }
  };

  const handleStartCollection = () => {
    const config = {
      targets: targets.split('\n').filter(t => t.trim()),
      types: collectionTypes.filter(t => t.enabled).map(t => t.id),
      schedule: scheduleConfig
    };
    onStartCollection(config);
  };

  return (
    <div className="h-full bg-surface">
      <div className="p-4 border-b border-border">
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
          Collection Configuration
        </h3>
        
        <div className="flex space-x-1 bg-background rounded-lg p-1">
          {['targets', 'types', 'schedule'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-micro ${
                activeTab === tab
                  ? 'bg-surface text-text-primary shadow-sm'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'targets' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Target Entities
              </label>
              <textarea
                value={targets}
                onChange={(e) => setTargets(e.target.value)}
                placeholder={`Enter targets (one per line):\nexample.com\n@username\nemail@domain.com\n192.168.1.1`}
                className="w-full h-32 px-3 py-2 border border-border rounded-lg text-sm font-mono resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <p className="text-xs text-text-secondary mt-1">
                Supports domains, usernames, emails, IPs, phone numbers
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                iconName="Upload"
                onClick={() => document.getElementById('bulk-upload').click()}
              >
                Bulk Upload CSV
              </Button>
              <input
                id="bulk-upload"
                type="file"
                accept=".csv,.txt"
                onChange={handleFileUpload}
                className="hidden"
              />
              <Button
                variant="ghost"
                size="sm"
                iconName="Download"
                onClick={() => console.log('Download template')}
              >
                Template
              </Button>
            </div>

            <div className="bg-background rounded-lg p-3">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="Info" size={16} className="text-primary" />
                <span className="text-sm font-medium text-text-primary">
                  Bulk Processing
                </span>
              </div>
              <p className="text-xs text-text-secondary">
                Supports up to 1,000 entities per collection job. Large batches are automatically queued and processed sequentially.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'types' && (
          <div className="space-y-3">
            <div className="mb-4">
              <h4 className="text-sm font-medium text-text-primary mb-2">
                Collection Types
              </h4>
              <p className="text-xs text-text-secondary">
                Select data sources for this collection job
              </p>
            </div>

            {collectionTypes.map((type) => (
              <div
                key={type.id}
                className="flex items-center justify-between p-3 bg-background rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <Icon
                    name={type.icon}
                    size={20}
                    className="text-primary"
                  />
                  <div>
                    <p className="text-sm font-medium text-text-primary">
                      {type.name}
                    </p>
                    <p className="text-xs text-text-secondary">
                      {type.id === 'social-media' && 'Twitter, LinkedIn, Facebook APIs'}
                      {type.id === 'domain-analysis' && 'WHOIS, DNS, SSL certificate data'}
                      {type.id === 'email-investigation' && 'Email validation and breach data'}
                      {type.id === 'phone-lookup' && 'Carrier info and validation'}
                      {type.id === 'image-reverse' && 'Google, TinEye, Yandex search'}
                      {type.id === 'threat-intel' && 'IOC feeds and reputation data'}
                    </p>
                  </div>
                </div>
                
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={type.enabled}
                    onChange={() => {
                      const updatedTypes = collectionTypes.map(t =>
                        t.id === type.id ? { ...t, enabled: !t.enabled } : t
                      );
                      // Update state logic would go here
                    }}
                    className="sr-only"
                  />
                  <div className={`w-8 h-4 rounded-full transition-colors ${
                    type.enabled ? 'bg-primary' : 'bg-secondary-300'
                  }`}>
                    <div className={`w-3 h-3 bg-white rounded-full shadow-sm transition-transform ${
                      type.enabled ? 'translate-x-4' : 'translate-x-0.5'
                    } mt-0.5`} />
                  </div>
                </label>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'schedule' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Collection Schedule
              </label>
              <div className="space-y-3">
                <label className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="schedule"
                    value="immediate"
                    checked={scheduleConfig.type === 'immediate'}
                    onChange={(e) => setScheduleConfig(prev => ({ ...prev, type: e.target.value }))}
                    className="w-4 h-4 text-primary"
                  />
                  <span className="text-sm text-text-primary">Start Immediately</span>
                </label>
                
                <label className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="schedule"
                    value="scheduled"
                    checked={scheduleConfig.type === 'scheduled'}
                    onChange={(e) => setScheduleConfig(prev => ({ ...prev, type: e.target.value }))}
                    className="w-4 h-4 text-primary"
                  />
                  <span className="text-sm text-text-primary">Schedule for Later</span>
                </label>
                
                <label className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="schedule"
                    value="recurring"
                    checked={scheduleConfig.type === 'recurring'}
                    onChange={(e) => setScheduleConfig(prev => ({ ...prev, type: e.target.value }))}
                    className="w-4 h-4 text-primary"
                  />
                  <span className="text-sm text-text-primary">Recurring Collection</span>
                </label>
              </div>
            </div>

            {scheduleConfig.type === 'scheduled' && (
              <div className="space-y-3">
                <Input
                  type="datetime-local"
                  placeholder="Start Date & Time"
                  value={scheduleConfig.startDate}
                  onChange={(e) => setScheduleConfig(prev => ({ ...prev, startDate: e.target.value }))}
                />
              </div>
            )}

            {scheduleConfig.type === 'recurring' && (
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Cron Expression
                  </label>
                  <Input
                    type="text"
                    placeholder="0 */6 * * *"
                    value={scheduleConfig.cronExpression}
                    onChange={(e) => setScheduleConfig(prev => ({ ...prev, cronExpression: e.target.value }))}
                    className="font-mono"
                  />
                  <p className="text-xs text-text-secondary mt-1">
                    Every 6 hours (minute hour day month weekday)
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    type="date"
                    placeholder="Start Date"
                    value={scheduleConfig.startDate}
                    onChange={(e) => setScheduleConfig(prev => ({ ...prev, startDate: e.target.value }))}
                  />
                  <Input
                    type="date"
                    placeholder="End Date"
                    value={scheduleConfig.endDate}
                    onChange={(e) => setScheduleConfig(prev => ({ ...prev, endDate: e.target.value }))}
                  />
                </div>
              </div>
            )}

            <div className="bg-background rounded-lg p-3">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="Clock" size={16} className="text-primary" />
                <span className="text-sm font-medium text-text-primary">
                  Common Schedules
                </span>
              </div>
              <div className="space-y-1">
                <button
                  onClick={() => setScheduleConfig(prev => ({ ...prev, cronExpression: '0 */1 * * *' }))}
                  className="block text-xs text-text-secondary hover:text-text-primary"
                >
                  Every hour: 0 */1 * * *
                </button>
                <button
                  onClick={() => setScheduleConfig(prev => ({ ...prev, cronExpression: '0 */6 * * *' }))}
                  className="block text-xs text-text-secondary hover:text-text-primary"
                >
                  Every 6 hours: 0 */6 * * *
                </button>
                <button
                  onClick={() => setScheduleConfig(prev => ({ ...prev, cronExpression: '0 0 * * *' }))}
                  className="block text-xs text-text-secondary hover:text-text-primary"
                >
                  Daily: 0 0 * * *
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-border">
        <div className="flex items-center justify-between mb-3">
          <div className="text-sm text-text-secondary">
            Estimated cost: $12.50 per 1,000 entities
          </div>
          <div className="text-sm text-text-secondary">
            {targets.split('\n').filter(t => t.trim()).length} targets
          </div>
        </div>
        
        <Button
          variant="primary"
          fullWidth
          iconName="Play"
          onClick={handleStartCollection}
          disabled={!targets.trim()}
        >
          Start Collection
        </Button>
      </div>
    </div>
  );
};

export default CollectionConfigPanel;