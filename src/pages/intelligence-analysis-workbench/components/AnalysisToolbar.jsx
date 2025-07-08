import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AnalysisToolbar = ({ 
  currentView, 
  onViewChange, 
  onExport, 
  onSave, 
  onShare,
  isCollaborating,
  collaboratorCount 
}) => {
  const [isExportOpen, setIsExportOpen] = useState(false);

  const viewOptions = [
    { id: 'graph', label: 'Network Graph', icon: 'Network', shortcut: 'G' },
    { id: 'timeline', label: 'Timeline', icon: 'Clock', shortcut: 'T' },
    { id: 'map', label: 'Geospatial Map', icon: 'Map', shortcut: 'M' },
    { id: 'matrix', label: 'Relationship Matrix', icon: 'Grid3X3', shortcut: 'R' }
  ];

  const exportOptions = [
    { id: 'pdf', label: 'PDF Report', icon: 'FileText' },
    { id: 'json', label: 'JSON Data', icon: 'Code' },
    { id: 'csv', label: 'CSV Export', icon: 'Table' },
    { id: 'png', label: 'PNG Image', icon: 'Image' }
  ];

  return (
    <div className="bg-surface border-b border-border p-4">
      <div className="flex items-center justify-between">
        {/* View Controls */}
        <div className="flex items-center space-x-2">
          <div className="flex bg-background rounded-lg p-1">
            {viewOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => onViewChange(option.id)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-micro ${
                  currentView === option.id
                    ? 'bg-primary text-primary-foreground'
                    : 'text-text-secondary hover:text-text-primary hover:bg-secondary-100'
                }`}
                title={`${option.label} (${option.shortcut})`}
              >
                <Icon name={option.icon} size={16} />
                <span className="hidden md:inline">{option.label}</span>
                <kbd className="hidden lg:inline-block px-1 py-0.5 text-xs bg-secondary-200 rounded">
                  {option.shortcut}
                </kbd>
              </button>
            ))}
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-3">
          {/* Collaboration Status */}
          {isCollaborating && (
            <div className="flex items-center space-x-2 px-3 py-2 bg-success-50 text-success-700 rounded-lg">
              <div className="w-2 h-2 bg-success rounded-full pulse-subtle" />
              <span className="text-sm font-medium">
                {collaboratorCount} analyst{collaboratorCount !== 1 ? 's' : ''} active
              </span>
            </div>
          )}

          {/* Quick Actions */}
          <Button
            variant="ghost"
            size="sm"
            iconName="Save"
            onClick={onSave}
            className="hover-lift"
          >
            Save Analysis
          </Button>

          <Button
            variant="ghost"
            size="sm"
            iconName="Share"
            onClick={onShare}
            className="hover-lift"
          >
            Share
          </Button>

          {/* Export Dropdown */}
          <div className="relative">
            <Button
              variant="outline"
              size="sm"
              iconName="Download"
              onClick={() => setIsExportOpen(!isExportOpen)}
              className="hover-lift"
            >
              Export
            </Button>

            {isExportOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-surface border border-border rounded-lg shadow-elevated z-50">
                <div className="p-2">
                  {exportOptions.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => {
                        onExport(option.id);
                        setIsExportOpen(false);
                      }}
                      className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-text-primary hover:bg-background rounded-lg transition-micro"
                    >
                      <Icon name={option.icon} size={16} />
                      <span>{option.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisToolbar;