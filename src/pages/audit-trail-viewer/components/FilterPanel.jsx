import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const FilterPanel = ({ onFilterChange, onSaveFilter, savedFilters }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filters, setFilters] = useState({
    dateRange: { start: '', end: '' },
    users: [],
    actions: [],
    severity: [],
    status: [],
    ipAddress: '',
    resource: '',
    anomaliesOnly: false
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSavedFilter, setSelectedSavedFilter] = useState('');

  const actionTypes = [
    'Authentication', 'Data Access', 'Configuration Change', 'Export', 
    'Import', 'Delete', 'Create', 'Update', 'System Admin'
  ];

  const severityLevels = ['low', 'medium', 'high', 'critical'];
  const statusTypes = ['success', 'failed', 'warning', 'pending'];

  const userGroups = [
    'Analysts', 'Administrators', 'Investigators', 'Managers', 'External Users'
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleArrayFilterChange = (key, value, checked) => {
    const currentArray = filters[key];
    const newArray = checked 
      ? [...currentArray, value]
      : currentArray.filter(item => item !== value);
    
    handleFilterChange(key, newArray);
  };

  const handleDateRangeChange = (type, value) => {
    const newDateRange = { ...filters.dateRange, [type]: value };
    handleFilterChange('dateRange', newDateRange);
  };

  const clearAllFilters = () => {
    const clearedFilters = {
      dateRange: { start: '', end: '' },
      users: [],
      actions: [],
      severity: [],
      status: [],
      ipAddress: '',
      resource: '',
      anomaliesOnly: false
    };
    setFilters(clearedFilters);
    setSearchQuery('');
    onFilterChange(clearedFilters);
  };

  const applySavedFilter = (filterName) => {
    const savedFilter = savedFilters.find(f => f.name === filterName);
    if (savedFilter) {
      setFilters(savedFilter.filters);
      onFilterChange(savedFilter.filters);
      setSelectedSavedFilter(filterName);
    }
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      onFilterChange({ ...filters, search: searchQuery });
    }
  };

  return (
    <div className="bg-surface border border-border rounded-lg shadow-primary">
      {/* Filter Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Icon name="Filter" size={20} className="text-primary" />
            <h3 className="text-lg font-heading font-semibold text-text-primary">
              Audit Filters
            </h3>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              iconName="RotateCcw"
              onClick={clearAllFilters}
            >
              Clear All
            </Button>
            <Button
              variant="ghost"
              size="sm"
              iconName={isExpanded ? 'ChevronUp' : 'ChevronDown'}
              onClick={() => setIsExpanded(!isExpanded)}
            />
          </div>
        </div>

        {/* Search Bar */}
        <div className="mt-4">
          <div className="relative">
            <Icon
              name="Search"
              size={16}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary"
            />
            <Input
              type="text"
              placeholder="Search audit logs... (Press Enter to search)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleSearch}
              className="pl-10"
            />
          </div>
        </div>
      </div>

      {/* Filter Content */}
      {isExpanded && (
        <div className="p-4 space-y-6">
          {/* Saved Filters */}
          <div>
            <label className="block text-sm font-heading font-medium text-text-primary mb-2">
              Saved Filters
            </label>
            <div className="flex flex-wrap gap-2">
              {savedFilters.map((filter) => (
                <button
                  key={filter.name}
                  onClick={() => applySavedFilter(filter.name)}
                  className={`px-3 py-1 text-xs rounded-full border transition-micro ${
                    selectedSavedFilter === filter.name
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-background text-text-secondary border-border hover:border-primary'
                  }`}
                >
                  {filter.name}
                </button>
              ))}
              <Button
                variant="ghost"
                size="xs"
                iconName="Plus"
                onClick={() => onSaveFilter(filters)}
              >
                Save Current
              </Button>
            </div>
          </div>

          {/* Date Range */}
          <div>
            <label className="block text-sm font-heading font-medium text-text-primary mb-2">
              Date Range
            </label>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-text-secondary mb-1 font-caption">From</label>
                <Input
                  type="datetime-local"
                  value={filters.dateRange.start}
                  onChange={(e) => handleDateRangeChange('start', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-xs text-text-secondary mb-1 font-caption">To</label>
                <Input
                  type="datetime-local"
                  value={filters.dateRange.end}
                  onChange={(e) => handleDateRangeChange('end', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Quick Date Filters */}
          <div>
            <label className="block text-sm font-heading font-medium text-text-primary mb-2">
              Quick Filters
            </label>
            <div className="flex flex-wrap gap-2">
              {['Last Hour', 'Last 24 Hours', 'Last 7 Days', 'Last 30 Days'].map((period) => (
                <button
                  key={period}
                  onClick={() => console.log('Apply quick filter:', period)}
                  className="px-3 py-1 text-xs bg-background text-text-secondary border border-border rounded-full hover:border-primary transition-micro"
                >
                  {period}
                </button>
              ))}
            </div>
          </div>

          {/* User Groups */}
          <div>
            <label className="block text-sm font-heading font-medium text-text-primary mb-2">
              User Groups
            </label>
            <div className="space-y-2">
              {userGroups.map((group) => (
                <label key={group} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={filters.users.includes(group)}
                    onChange={(e) => handleArrayFilterChange('users', group, e.target.checked)}
                    className="rounded border-border"
                  />
                  <span className="text-sm text-text-primary font-caption">{group}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Action Types */}
          <div>
            <label className="block text-sm font-heading font-medium text-text-primary mb-2">
              Action Types
            </label>
            <div className="grid grid-cols-2 gap-2">
              {actionTypes.map((action) => (
                <label key={action} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={filters.actions.includes(action)}
                    onChange={(e) => handleArrayFilterChange('actions', action, e.target.checked)}
                    className="rounded border-border"
                  />
                  <span className="text-sm text-text-primary font-caption">{action}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Severity Levels */}
          <div>
            <label className="block text-sm font-heading font-medium text-text-primary mb-2">
              Severity Levels
            </label>
            <div className="flex flex-wrap gap-2">
              {severityLevels.map((severity) => (
                <label key={severity} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={filters.severity.includes(severity)}
                    onChange={(e) => handleArrayFilterChange('severity', severity, e.target.checked)}
                    className="rounded border-border"
                  />
                  <span className={`text-sm font-caption capitalize ${
                    severity === 'critical' ? 'text-error' :
                    severity === 'high' ? 'text-warning' :
                    severity === 'medium' ? 'text-accent' : 'text-success'
                  }`}>
                    {severity}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Status Types */}
          <div>
            <label className="block text-sm font-heading font-medium text-text-primary mb-2">
              Status
            </label>
            <div className="flex flex-wrap gap-2">
              {statusTypes.map((status) => (
                <label key={status} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={filters.status.includes(status)}
                    onChange={(e) => handleArrayFilterChange('status', status, e.target.checked)}
                    className="rounded border-border"
                  />
                  <span className="text-sm text-text-primary font-caption capitalize">{status}</span>
                </label>
              ))}
            </div>
          </div>

          {/* IP Address Filter */}
          <div>
            <label className="block text-sm font-heading font-medium text-text-primary mb-2">
              IP Address
            </label>
            <Input
              type="text"
              placeholder="Enter IP address or range (e.g., 192.168.1.0/24)"
              value={filters.ipAddress}
              onChange={(e) => handleFilterChange('ipAddress', e.target.value)}
            />
          </div>

          {/* Resource Filter */}
          <div>
            <label className="block text-sm font-heading font-medium text-text-primary mb-2">
              Resource
            </label>
            <Input
              type="text"
              placeholder="Enter resource name or path"
              value={filters.resource}
              onChange={(e) => handleFilterChange('resource', e.target.value)}
            />
          </div>

          {/* Special Filters */}
          <div>
            <label className="block text-sm font-heading font-medium text-text-primary mb-2">
              Special Filters
            </label>
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={filters.anomaliesOnly}
                  onChange={(e) => handleFilterChange('anomaliesOnly', e.target.checked)}
                  className="rounded border-border"
                />
                <span className="text-sm text-text-primary font-caption">Show anomalies only</span>
              </label>
            </div>
          </div>

          {/* Apply Filters Button */}
          <div className="pt-4 border-t border-border">
            <Button
              variant="primary"
              fullWidth
              iconName="Filter"
              onClick={() => onFilterChange(filters)}
            >
              Apply Filters
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterPanel;