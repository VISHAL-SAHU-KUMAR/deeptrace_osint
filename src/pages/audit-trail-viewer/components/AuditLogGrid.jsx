import React, { useState, useMemo } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AuditLogGrid = ({ logs, selectedLogs, onSelectionChange, onExport, onCreateAlert }) => {
  const [sortConfig, setSortConfig] = useState({ key: 'timestamp', direction: 'desc' });
  const [currentPage, setCurrentPage] = useState(1);
  const logsPerPage = 50;

  const sortedLogs = useMemo(() => {
    const sortedData = [...logs].sort((a, b) => {
      if (sortConfig.direction === 'asc') {
        return a[sortConfig.key] > b[sortConfig.key] ? 1 : -1;
      }
      return a[sortConfig.key] < b[sortConfig.key] ? 1 : -1;
    });
    return sortedData;
  }, [logs, sortConfig]);

  const paginatedLogs = useMemo(() => {
    const startIndex = (currentPage - 1) * logsPerPage;
    return sortedLogs.slice(startIndex, startIndex + logsPerPage);
  }, [sortedLogs, currentPage]);

  const totalPages = Math.ceil(sortedLogs.length / logsPerPage);

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'desc' ? 'asc' : 'desc'
    }));
  };

  const handleSelectAll = () => {
    if (selectedLogs.length === paginatedLogs.length) {
      onSelectionChange([]);
    } else {
      onSelectionChange(paginatedLogs.map(log => log.id));
    }
  };

  const handleSelectLog = (logId) => {
    if (selectedLogs.includes(logId)) {
      onSelectionChange(selectedLogs.filter(id => id !== logId));
    } else {
      onSelectionChange([...selectedLogs, logId]);
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'text-error bg-error-50';
      case 'high': return 'text-warning bg-warning-50';
      case 'medium': return 'text-accent bg-accent-50';
      case 'low': return 'text-success bg-success-50';
      default: return 'text-text-secondary bg-secondary-50';
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

  return (
    <div className="bg-surface border border-border rounded-lg shadow-primary">
      {/* Grid Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h3 className="text-lg font-heading font-semibold text-text-primary">
              Audit Log Entries
            </h3>
            <span className="px-2 py-1 bg-secondary-100 text-text-secondary text-sm rounded-md font-caption">
              {sortedLogs.length} entries
            </span>
          </div>
          <div className="flex items-center space-x-2">
            {selectedLogs.length > 0 && (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Download"
                  onClick={() => onExport(selectedLogs)}
                >
                  Export ({selectedLogs.length})
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Bell"
                  onClick={() => onCreateAlert(selectedLogs)}
                >
                  Create Alert
                </Button>
              </>
            )}
            <Button
              variant="ghost"
              size="sm"
              iconName="RefreshCw"
              onClick={() => window.location.reload()}
            />
          </div>
        </div>
      </div>

      {/* Grid Content */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-background border-b border-border">
            <tr>
              <th className="w-12 p-3 text-left">
                <input
                  type="checkbox"
                  checked={selectedLogs.length === paginatedLogs.length && paginatedLogs.length > 0}
                  onChange={handleSelectAll}
                  className="rounded border-border"
                />
              </th>
              {[
                { key: 'timestamp', label: 'Timestamp' },
                { key: 'user', label: 'User' },
                { key: 'action', label: 'Action' },
                { key: 'resource', label: 'Resource' },
                { key: 'ipAddress', label: 'IP Address' },
                { key: 'status', label: 'Status' },
                { key: 'severity', label: 'Severity' }
              ].map(column => (
                <th
                  key={column.key}
                  className="p-3 text-left text-sm font-heading font-medium text-text-secondary cursor-pointer hover:text-text-primary transition-micro"
                  onClick={() => handleSort(column.key)}
                >
                  <div className="flex items-center space-x-1">
                    <span>{column.label}</span>
                    {sortConfig.key === column.key && (
                      <Icon
                        name={sortConfig.direction === 'asc' ? 'ChevronUp' : 'ChevronDown'}
                        size={16}
                      />
                    )}
                  </div>
                </th>
              ))}
              <th className="w-16 p-3"></th>
            </tr>
          </thead>
          <tbody>
            {paginatedLogs.map((log) => {
              const statusInfo = getStatusIcon(log.status);
              return (
                <tr
                  key={log.id}
                  className={`border-b border-border hover:bg-background transition-micro ${
                    log.anomaly ? 'bg-warning-50' : ''
                  }`}
                >
                  <td className="p-3">
                    <input
                      type="checkbox"
                      checked={selectedLogs.includes(log.id)}
                      onChange={() => handleSelectLog(log.id)}
                      className="rounded border-border"
                    />
                  </td>
                  <td className="p-3 text-sm font-data text-text-primary">
                    {new Date(log.timestamp).toLocaleString()}
                  </td>
                  <td className="p-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-heading font-medium">
                        {log.user.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-sm font-heading font-medium text-text-primary">
                          {log.user}
                        </p>
                        <p className="text-xs text-text-secondary font-caption">
                          {log.userRole}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center space-x-2">
                      <Icon name={log.actionIcon} size={16} className="text-text-secondary" />
                      <div>
                        <p className="text-sm font-heading font-medium text-text-primary">
                          {log.action}
                        </p>
                        <p className="text-xs text-text-secondary font-caption">
                          {log.actionCategory}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-3 text-sm text-text-primary font-data">
                    {log.resource}
                  </td>
                  <td className="p-3 text-sm text-text-primary font-data">
                    {log.ipAddress}
                  </td>
                  <td className="p-3">
                    <div className="flex items-center space-x-2">
                      <Icon name={statusInfo.icon} size={16} className={statusInfo.color} />
                      <span className="text-sm font-caption capitalize">
                        {log.status}
                      </span>
                    </div>
                  </td>
                  <td className="p-3">
                    <span className={`px-2 py-1 text-xs font-caption rounded-full ${getSeverityColor(log.severity)}`}>
                      {log.severity}
                    </span>
                  </td>
                  <td className="p-3">
                    <Button
                      variant="ghost"
                      size="xs"
                      iconName="MoreHorizontal"
                      onClick={() => console.log('View details', log.id)}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="text-sm text-text-secondary font-caption">
            Showing {((currentPage - 1) * logsPerPage) + 1} to {Math.min(currentPage * logsPerPage, sortedLogs.length)} of {sortedLogs.length} entries
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              iconName="ChevronLeft"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            />
            <span className="px-3 py-1 text-sm font-caption">
              {currentPage} of {totalPages}
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

export default AuditLogGrid;