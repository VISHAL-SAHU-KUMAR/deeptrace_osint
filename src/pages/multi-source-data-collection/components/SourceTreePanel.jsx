import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SourceTreePanel = ({ sources, onSourceToggle, onSourceConfig }) => {
  const [expandedCategories, setExpandedCategories] = useState({
    'social-media': true,
    'domain-analysis': true,
    'threat-intel': false,
    'dark-web': false
  });

  const toggleCategory = (categoryId) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-success';
      case 'error': return 'text-error';
      case 'warning': return 'text-warning';
      case 'inactive': return 'text-text-secondary';
      default: return 'text-text-secondary';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return 'CheckCircle';
      case 'error': return 'XCircle';
      case 'warning': return 'AlertTriangle';
      case 'inactive': return 'Circle';
      default: return 'Circle';
    }
  };

  return (
    <div className="h-full bg-surface border-r border-border">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-heading font-semibold text-text-primary">
            Data Sources
          </h2>
          <Button
            variant="ghost"
            size="sm"
            iconName="RefreshCw"
            onClick={() => console.log('Refresh sources')}
          />
        </div>
        
        <div className="flex items-center space-x-2 text-sm">
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-success rounded-full" />
            <span className="text-text-secondary">12 Active</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-error rounded-full" />
            <span className="text-text-secondary">3 Errors</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-warning rounded-full" />
            <span className="text-text-secondary">2 Warnings</span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {sources.map((category) => (
          <div key={category.id} className="border-b border-border">
            <button
              onClick={() => toggleCategory(category.id)}
              className="w-full flex items-center justify-between p-4 hover:bg-background transition-micro"
            >
              <div className="flex items-center space-x-3">
                <Icon
                  name={expandedCategories[category.id] ? 'ChevronDown' : 'ChevronRight'}
                  size={16}
                  className="text-text-secondary"
                />
                <Icon
                  name={category.icon}
                  size={20}
                  className="text-primary"
                />
                <div className="text-left">
                  <p className="text-sm font-heading font-medium text-text-primary">
                    {category.name}
                  </p>
                  <p className="text-xs text-text-secondary">
                    {category.sources.length} sources
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-text-secondary">
                  {category.sources.filter(s => s.status === 'active').length} active
                </span>
              </div>
            </button>

            {expandedCategories[category.id] && (
              <div className="pb-2">
                {category.sources.map((source) => (
                  <div
                    key={source.id}
                    className="flex items-center justify-between px-8 py-2 hover:bg-background transition-micro"
                  >
                    <div className="flex items-center space-x-3 flex-1">
                      <Icon
                        name={getStatusIcon(source.status)}
                        size={14}
                        className={getStatusColor(source.status)}
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <p className="text-sm font-medium text-text-primary">
                            {source.name}
                          </p>
                          {source.isPremium && (
                            <span className="px-1.5 py-0.5 text-xs bg-accent text-accent-foreground rounded">
                              Premium
                            </span>
                          )}
                        </div>
                        <div className="flex items-center space-x-4 mt-1">
                          <span className="text-xs text-text-secondary">
                            Rate: {source.rateLimit.current}/{source.rateLimit.max}
                          </span>
                          {source.lastSync && (
                            <span className="text-xs text-text-secondary">
                              Last sync: {source.lastSync}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-secondary-100 rounded-full h-1.5">
                        <div
                          className={`h-1.5 rounded-full ${
                            source.rateLimit.current / source.rateLimit.max > 0.8
                              ? 'bg-error'
                              : source.rateLimit.current / source.rateLimit.max > 0.6
                              ? 'bg-warning' :'bg-success'
                          }`}
                          style={{
                            width: `${(source.rateLimit.current / source.rateLimit.max) * 100}%`
                          }}
                        />
                      </div>
                      
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={source.enabled}
                          onChange={() => onSourceToggle(source.id)}
                          className="sr-only"
                        />
                        <div className={`w-8 h-4 rounded-full transition-colors ${
                          source.enabled ? 'bg-primary' : 'bg-secondary-300'
                        }`}>
                          <div className={`w-3 h-3 bg-white rounded-full shadow-sm transition-transform ${
                            source.enabled ? 'translate-x-4' : 'translate-x-0.5'
                          } mt-0.5`} />
                        </div>
                      </label>
                      
                      <Button
                        variant="ghost"
                        size="xs"
                        iconName="Settings"
                        onClick={() => onSourceConfig(source.id)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SourceTreePanel;