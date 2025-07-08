import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const FilterToolbar = ({ onFilterChange, onSavedFilterSelect, savedFilters }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    search: '',
    status: [],
    priority: [],
    assignee: [],
    dateRange: { start: '', end: '' },
    threatLevel: []
  });
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [filterName, setFilterName] = useState('');

  const statusOptions = [
    { value: 'active', label: 'Active', color: 'bg-success-100 text-success-700' },
    { value: 'pending', label: 'Pending', color: 'bg-warning-100 text-warning-700' },
    { value: 'closed', label: 'Closed', color: 'bg-secondary-100 text-secondary-600' },
    { value: 'urgent', label: 'Urgent', color: 'bg-error-100 text-error-700' }
  ];

  const priorityOptions = [
    { value: 'critical', label: 'Critical', color: 'bg-error-100 text-error-700' },
    { value: 'high', label: 'High', color: 'bg-warning-100 text-warning-700' },
    { value: 'medium', label: 'Medium', color: 'bg-accent-100 text-accent-700' },
    { value: 'low', label: 'Low', color: 'bg-success-100 text-success-700' }
  ];

  const threatLevelOptions = [
    { value: 'critical', label: 'Critical', color: 'bg-error-100 text-error-700' },
    { value: 'high', label: 'High', color: 'bg-warning-100 text-warning-700' },
    { value: 'medium', label: 'Medium', color: 'bg-accent-100 text-accent-700' },
    { value: 'low', label: 'Low', color: 'bg-success-100 text-success-700' }
  ];

  const assigneeOptions = [
    { value: 'john-doe', label: 'John Doe' },
    { value: 'jane-smith', label: 'Jane Smith' },
    { value: 'mike-johnson', label: 'Mike Johnson' },
    { value: 'sarah-wilson', label: 'Sarah Wilson' },
    { value: 'unassigned', label: 'Unassigned' }
  ];

  const handleFilterToggle = (filterType, value) => {
    setActiveFilters(prev => {
      const newFilters = { ...prev };
      if (newFilters[filterType].includes(value)) {
        newFilters[filterType] = newFilters[filterType].filter(item => item !== value);
      } else {
        newFilters[filterType] = [...newFilters[filterType], value];
      }
      onFilterChange(newFilters);
      return newFilters;
    });
  };

  const handleSearchChange = (value) => {
    setActiveFilters(prev => {
      const newFilters = { ...prev, search: value };
      onFilterChange(newFilters);
      return newFilters;
    });
  };

  const handleDateRangeChange = (field, value) => {
    setActiveFilters(prev => {
      const newFilters = {
        ...prev,
        dateRange: { ...prev.dateRange, [field]: value }
      };
      onFilterChange(newFilters);
      return newFilters;
    });
  };

  const clearAllFilters = () => {
    const clearedFilters = {
      search: '',
      status: [],
      priority: [],
      assignee: [],
      dateRange: { start: '', end: '' },
      threatLevel: []
    };
    setActiveFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  const saveCurrentFilter = () => {
    if (filterName.trim()) {
      const filterToSave = {
        name: filterName,
        filters: activeFilters,
        createdAt: new Date().toISOString()
      };
      console.log('Saving filter:', filterToSave);
      setShowSaveDialog(false);
      setFilterName('');
    }
  };

  const getActiveFilterCount = () => {
    return (
      (activeFilters.search ? 1 : 0) +
      activeFilters.status.length +
      activeFilters.priority.length +
      activeFilters.assignee.length +
      activeFilters.threatLevel.length +
      (activeFilters.dateRange.start || activeFilters.dateRange.end ? 1 : 0)
    );
  };

  const renderFilterChips = (options, filterType) => (
    <div className="flex flex-wrap gap-2">
      {options.map(option => (
        <button
          key={option.value}
          onClick={() => handleFilterToggle(filterType, option.value)}
          className={`px-3 py-1 text-xs font-medium rounded-full transition-micro ${
            activeFilters[filterType].includes(option.value)
              ? option.color
              : 'bg-secondary-100 text-text-secondary hover:bg-secondary-200'
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );

  return (
    <div className="bg-surface border-b border-border">
      {/* Main Toolbar */}
      <div className="p-4">
        <div className="flex items-center justify-between">
          {/* Left Side - Search and Quick Filters */}
          <div className="flex items-center space-x-4 flex-1">
            {/* Global Search */}
            <div className="relative w-80">
              <Icon
                name="Search"
                size={16}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary"
              />
              <Input
                type="search"
                placeholder="Search cases, targets, or entities..."
                value={activeFilters.search}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="pl-10 pr-4"
              />
            </div>

            {/* Quick Status Filters */}
            <div className="flex items-center space-x-2">
              {statusOptions.slice(0, 3).map(option => (
                <button
                  key={option.value}
                  onClick={() => handleFilterToggle('status', option.value)}
                  className={`px-3 py-1 text-xs font-medium rounded-full transition-micro ${
                    activeFilters.status.includes(option.value)
                      ? option.color
                      : 'bg-secondary-100 text-text-secondary hover:bg-secondary-200'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Right Side - Actions */}
          <div className="flex items-center space-x-2">
            {/* Active Filter Count */}
            {getActiveFilterCount() > 0 && (
              <span className="text-sm text-text-secondary">
                {getActiveFilterCount()} filter{getActiveFilterCount() !== 1 ? 's' : ''} active
              </span>
            )}

            {/* Saved Filters Dropdown */}
            <div className="relative">
              <Button
                variant="outline"
                size="sm"
                iconName="Bookmark"
                onClick={() => console.log('Show saved filters')}
              >
                Saved
              </Button>
            </div>

            {/* Advanced Filters Toggle */}
            <Button
              variant="outline"
              size="sm"
              iconName={isExpanded ? 'ChevronUp' : 'ChevronDown'}
              onClick={() => setIsExpanded(!isExpanded)}
            >
              Advanced
            </Button>

            {/* Clear Filters */}
            {getActiveFilterCount() > 0 && (
              <Button
                variant="ghost"
                size="sm"
                iconName="X"
                onClick={clearAllFilters}
              >
                Clear
              </Button>
            )}

            {/* Save Filter */}
            {getActiveFilterCount() > 0 && (
              <Button
                variant="ghost"
                size="sm"
                iconName="Save"
                onClick={() => setShowSaveDialog(true)}
              >
                Save
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Advanced Filters Panel */}
      {isExpanded && (
        <div className="px-4 pb-4 border-t border-border bg-background">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 pt-4">
            {/* Priority Filter */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Priority
              </label>
              {renderFilterChips(priorityOptions, 'priority')}
            </div>

            {/* Threat Level Filter */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Threat Level
              </label>
              {renderFilterChips(threatLevelOptions, 'threatLevel')}
            </div>

            {/* Assignee Filter */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Assigned To
              </label>
              <div className="flex flex-wrap gap-2">
                {assigneeOptions.map(option => (
                  <button
                    key={option.value}
                    onClick={() => handleFilterToggle('assignee', option.value)}
                    className={`px-3 py-1 text-xs font-medium rounded-full transition-micro ${
                      activeFilters.assignee.includes(option.value)
                        ? 'bg-primary-100 text-primary-700' :'bg-secondary-100 text-text-secondary hover:bg-secondary-200'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Date Range Filter */}
            <div className="lg:col-span-2 xl:col-span-1">
              <label className="block text-sm font-medium text-text-primary mb-2">
                Date Range
              </label>
              <div className="flex items-center space-x-2">
                <Input
                  type="date"
                  value={activeFilters.dateRange.start}
                  onChange={(e) => handleDateRangeChange('start', e.target.value)}
                  className="flex-1"
                />
                <span className="text-text-secondary">to</span>
                <Input
                  type="date"
                  value={activeFilters.dateRange.end}
                  onChange={(e) => handleDateRangeChange('end', e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Save Filter Dialog */}
      {showSaveDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-surface rounded-lg p-6 w-96 shadow-modal">
            <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
              Save Filter
            </h3>
            <Input
              type="text"
              placeholder="Enter filter name..."
              value={filterName}
              onChange={(e) => setFilterName(e.target.value)}
              className="mb-4"
            />
            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => {
                  setShowSaveDialog(false);
                  setFilterName('');
                }}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={saveCurrentFilter}
                disabled={!filterName.trim()}
              >
                Save Filter
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterToolbar;