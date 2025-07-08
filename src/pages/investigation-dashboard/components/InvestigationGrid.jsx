import React, { useState, useMemo } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const InvestigationGrid = ({ cases, onCaseSelect, selectedCases, onCaseToggle, onBulkAction }) => {
  const [sortConfig, setSortConfig] = useState({ key: 'lastActivity', direction: 'desc' });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const sortedCases = useMemo(() => {
    return [...cases].sort((a, b) => {
      const aVal = a[sortConfig.key];
      const bVal = b[sortConfig.key];
      
      if (sortConfig.direction === 'asc') {
        return aVal > bVal ? 1 : -1;
      }
      return aVal < bVal ? 1 : -1;
    });
  }, [cases, sortConfig]);

  const paginatedCases = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedCases.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedCases, currentPage]);

  const totalPages = Math.ceil(sortedCases.length / itemsPerPage);

  const getStatusBadge = (status) => {
    const colors = {
      active: 'bg-success-100 text-success-700',
      pending: 'bg-warning-100 text-warning-700',
      closed: 'bg-secondary-100 text-secondary-600',
      urgent: 'bg-error-100 text-error-700'
    };
    return colors[status] || 'bg-secondary-100 text-secondary-600';
  };

  const getThreatLevelColor = (level) => {
    switch (level) {
      case 'critical': return 'text-error';
      case 'high': return 'text-warning';
      case 'medium': return 'text-accent';
      case 'low': return 'text-success';
      default: return 'text-text-secondary';
    }
  };

  const formatTimeAgo = (date) => {
    const now = new Date();
    const diff = now - new Date(date);
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    return 'Just now';
  };

  const getSLAStatus = (slaHours) => {
    if (slaHours <= 2) return { color: 'text-error', icon: 'AlertTriangle' };
    if (slaHours <= 8) return { color: 'text-warning', icon: 'Clock' };
    return { color: 'text-success', icon: 'CheckCircle' };
  };

  const handleSelectAll = () => {
    if (selectedCases.length === paginatedCases.length) {
      // Deselect all
      paginatedCases.forEach(case_ => onCaseToggle(case_.id, false));
    } else {
      // Select all
      paginatedCases.forEach(case_ => onCaseToggle(case_.id, true));
    }
  };

  return (
    <div className="h-full bg-surface flex flex-col">
      {/* Header with Bulk Actions */}
      {selectedCases.length > 0 && (
        <div className="p-4 bg-primary-50 border-b border-primary-200">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-primary">
              {selectedCases.length} case{selectedCases.length !== 1 ? 's' : ''} selected
            </span>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                iconName="Users"
                onClick={() => onBulkAction('assign')}
              >
                Assign
              </Button>
              <Button
                variant="outline"
                size="sm"
                iconName="Flag"
                onClick={() => onBulkAction('priority')}
              >
                Priority
              </Button>
              <Button
                variant="outline"
                size="sm"
                iconName="Archive"
                onClick={() => onBulkAction('archive')}
              >
                Archive
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Table Header */}
      <div className="bg-background border-b border-border">
        <div className="grid grid-cols-12 gap-4 p-4 text-sm font-medium text-text-secondary">
          <div className="col-span-1 flex items-center">
            <input
              type="checkbox"
              checked={selectedCases.length === paginatedCases.length && paginatedCases.length > 0}
              onChange={handleSelectAll}
              className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
            />
          </div>
          <div className="col-span-2">
            <button
              onClick={() => handleSort('caseId')}
              className="flex items-center space-x-1 hover:text-text-primary"
            >
              <span>Case ID</span>
              <Icon name="ArrowUpDown" size={14} />
            </button>
          </div>
          <div className="col-span-2">
            <button
              onClick={() => handleSort('target')}
              className="flex items-center space-x-1 hover:text-text-primary"
            >
              <span>Target</span>
              <Icon name="ArrowUpDown" size={14} />
            </button>
          </div>
          <div className="col-span-1">
            <button
              onClick={() => handleSort('status')}
              className="flex items-center space-x-1 hover:text-text-primary"
            >
              <span>Status</span>
              <Icon name="ArrowUpDown" size={14} />
            </button>
          </div>
          <div className="col-span-2">
            <button
              onClick={() => handleSort('assignedTo')}
              className="flex items-center space-x-1 hover:text-text-primary"
            >
              <span>Assigned To</span>
              <Icon name="ArrowUpDown" size={14} />
            </button>
          </div>
          <div className="col-span-2">
            <button
              onClick={() => handleSort('lastActivity')}
              className="flex items-center space-x-1 hover:text-text-primary"
            >
              <span>Last Activity</span>
              <Icon name="ArrowUpDown" size={14} />
            </button>
          </div>
          <div className="col-span-1">
            <button
              onClick={() => handleSort('threatLevel')}
              className="flex items-center space-x-1 hover:text-text-primary"
            >
              <span>Threat</span>
              <Icon name="ArrowUpDown" size={14} />
            </button>
          </div>
          <div className="col-span-1">
            <span>SLA</span>
          </div>
        </div>
      </div>

      {/* Table Body */}
      <div className="flex-1 overflow-y-auto">
        {paginatedCases.map((case_) => {
          const slaStatus = getSLAStatus(case_.slaHours);
          return (
            <div
              key={case_.id}
              className={`grid grid-cols-12 gap-4 p-4 border-b border-border hover:bg-background transition-micro cursor-pointer ${
                selectedCases.includes(case_.id) ? 'bg-primary-50' : ''
              }`}
              onClick={() => onCaseSelect(case_)}
            >
              <div className="col-span-1 flex items-center">
                <input
                  type="checkbox"
                  checked={selectedCases.includes(case_.id)}
                  onChange={(e) => {
                    e.stopPropagation();
                    onCaseToggle(case_.id, e.target.checked);
                  }}
                  className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                />
              </div>
              <div className="col-span-2">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-mono text-text-primary">
                    {case_.caseId}
                  </span>
                  {case_.hasNewIntel && (
                    <div className="w-2 h-2 bg-primary rounded-full pulse-subtle" />
                  )}
                </div>
                <p className="text-xs text-text-secondary truncate">
                  {case_.title}
                </p>
              </div>
              <div className="col-span-2">
                <p className="text-sm text-text-primary truncate">
                  {case_.target}
                </p>
                <p className="text-xs text-text-secondary">
                  {case_.targetType}
                </p>
              </div>
              <div className="col-span-1">
                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusBadge(case_.status)}`}>
                  {case_.status}
                </span>
              </div>
              <div className="col-span-2">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-medium">
                    {case_.assignedTo.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="text-sm text-text-primary">
                      {case_.assignedTo}
                    </p>
                    <p className="text-xs text-text-secondary">
                      {case_.department}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-span-2">
                <p className="text-sm text-text-primary">
                  {formatTimeAgo(case_.lastActivity)}
                </p>
                <p className="text-xs text-text-secondary">
                  {case_.lastAction}
                </p>
              </div>
              <div className="col-span-1">
                <Icon
                  name="Shield"
                  size={16}
                  className={getThreatLevelColor(case_.threatLevel)}
                />
              </div>
              <div className="col-span-1">
                <div className="flex items-center space-x-1">
                  <Icon
                    name={slaStatus.icon}
                    size={14}
                    className={slaStatus.color}
                  />
                  <span className={`text-xs font-medium ${slaStatus.color}`}>
                    {case_.slaHours}h
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      <div className="p-4 border-t border-border bg-background">
        <div className="flex items-center justify-between">
          <p className="text-sm text-text-secondary">
            Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, sortedCases.length)} of {sortedCases.length} cases
          </p>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              iconName="ChevronLeft"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            />
            <span className="text-sm text-text-primary">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              iconName="ChevronRight"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestigationGrid;