import React, { useState, useMemo } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const EvidenceTable = ({ evidenceItems, onEvidenceSelect, onBulkAction, selectedItems, onSelectionChange }) => {
  const [sortConfig, setSortConfig] = useState({ key: 'collectedDate', direction: 'desc' });
  const [filterConfig, setFilterConfig] = useState({
    search: '',
    sourceType: '',
    verificationStatus: '',
    dateRange: '',
    credibilityMin: 0
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 25;

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleFilterChange = (key, value) => {
    setFilterConfig(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      const allIds = filteredAndSortedItems.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      ).map(item => item.id);
      onSelectionChange([...new Set([...selectedItems, ...allIds])]);
    } else {
      const currentPageIds = filteredAndSortedItems.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      ).map(item => item.id);
      onSelectionChange(selectedItems.filter(id => !currentPageIds.includes(id)));
    }
  };

  const handleItemSelect = (itemId, checked) => {
    if (checked) {
      onSelectionChange([...selectedItems, itemId]);
    } else {
      onSelectionChange(selectedItems.filter(id => id !== itemId));
    }
  };

  const filteredAndSortedItems = useMemo(() => {
    let filtered = evidenceItems.filter(item => {
      const matchesSearch = !filterConfig.search || 
        item.name.toLowerCase().includes(filterConfig.search.toLowerCase()) ||
        item.content.toLowerCase().includes(filterConfig.search.toLowerCase());
      
      const matchesSourceType = !filterConfig.sourceType || 
        item.sourceType === filterConfig.sourceType;
      
      const matchesVerification = !filterConfig.verificationStatus || 
        item.verificationStatus === filterConfig.verificationStatus;
      
      const matchesCredibility = item.credibilityScore >= filterConfig.credibilityMin;
      
      const matchesDateRange = !filterConfig.dateRange || (() => {
        const itemDate = new Date(item.collectedDate);
        const now = new Date();
        switch (filterConfig.dateRange) {
          case 'today':
            return itemDate.toDateString() === now.toDateString();
          case 'week':
            return itemDate >= new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          case 'month':
            return itemDate >= new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          default:
            return true;
        }
      })();
      
      return matchesSearch && matchesSourceType && matchesVerification && 
             matchesCredibility && matchesDateRange;
    });

    return filtered.sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      
      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [evidenceItems, filterConfig, sortConfig]);

  const paginatedItems = filteredAndSortedItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredAndSortedItems.length / itemsPerPage);
  const currentPageIds = paginatedItems.map(item => item.id);
  const isAllSelected = currentPageIds.length > 0 && 
    currentPageIds.every(id => selectedItems.includes(id));
  const isPartiallySelected = currentPageIds.some(id => selectedItems.includes(id)) && 
    !isAllSelected;

  const getSourceTypeIcon = (sourceType) => {
    const icons = {
      social_media: 'Users',
      domain: 'Globe',
      email: 'Mail',
      phone: 'Phone',
      image: 'Image',
      document: 'FileText',
      network: 'Network',
      financial: 'CreditCard'
    };
    return icons[sourceType] || 'File';
  };

  const getVerificationBadge = (status) => {
    const badges = {
      verified: { color: 'bg-success-100 text-success-800', icon: 'CheckCircle' },
      pending: { color: 'bg-warning-100 text-warning-800', icon: 'Clock' },
      failed: { color: 'bg-error-100 text-error-800', icon: 'XCircle' },
      unverified: { color: 'bg-secondary-100 text-secondary-800', icon: 'AlertCircle' }
    };
    
    const badge = badges[status] || badges.unverified;
    
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${badge.color}`}>
        <Icon name={badge.icon} size={10} className="mr-1" />
        {status}
      </span>
    );
  };

  const SortableHeader = ({ label, sortKey, className = "" }) => (
    <th
      className={`px-4 py-3 text-left text-xs font-heading font-medium text-text-secondary uppercase tracking-wider cursor-pointer hover:bg-background transition-micro ${className}`}
      onClick={() => handleSort(sortKey)}
    >
      <div className="flex items-center space-x-1">
        <span>{label}</span>
        <Icon
          name={sortConfig.key === sortKey ? 
            (sortConfig.direction === 'asc' ? 'ChevronUp' : 'ChevronDown') : 
            'ChevronsUpDown'
          }
          size={12}
          className={sortConfig.key === sortKey ? 'text-primary' : 'text-text-tertiary'}
        />
      </div>
    </th>
  );

  return (
    <div className="bg-surface border border-border rounded-lg overflow-hidden">
      {/* Table Header with Filters */}
      <div className="p-4 border-b border-border bg-background">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-heading font-semibold text-text-primary">
            Evidence Items ({filteredAndSortedItems.length})
          </h3>
          
          {selectedItems.length > 0 && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-text-secondary">
                {selectedItems.length} selected
              </span>
              <Button
                variant="ghost"
                size="sm"
                iconName="Tag"
                onClick={() => onBulkAction('tag', selectedItems)}
              >
                Tag
              </Button>
              <Button
                variant="ghost"
                size="sm"
                iconName="CheckCircle"
                onClick={() => onBulkAction('verify', selectedItems)}
              >
                Verify
              </Button>
              <Button
                variant="ghost"
                size="sm"
                iconName="Download"
                onClick={() => onBulkAction('export', selectedItems)}
              >
                Export
              </Button>
            </div>
          )}
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
          <Input
            type="search"
            placeholder="Search evidence..."
            value={filterConfig.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            className="text-sm"
          />
          
          <select
            value={filterConfig.sourceType}
            onChange={(e) => handleFilterChange('sourceType', e.target.value)}
            className="text-sm border border-border rounded-lg px-3 py-2"
          >
            <option value="">All Sources</option>
            <option value="social_media">Social Media</option>
            <option value="domain">Domain</option>
            <option value="email">Email</option>
            <option value="phone">Phone</option>
            <option value="image">Image</option>
            <option value="document">Document</option>
            <option value="network">Network</option>
            <option value="financial">Financial</option>
          </select>
          
          <select
            value={filterConfig.verificationStatus}
            onChange={(e) => handleFilterChange('verificationStatus', e.target.value)}
            className="text-sm border border-border rounded-lg px-3 py-2"
          >
            <option value="">All Status</option>
            <option value="verified">Verified</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
            <option value="unverified">Unverified</option>
          </select>
          
          <select
            value={filterConfig.dateRange}
            onChange={(e) => handleFilterChange('dateRange', e.target.value)}
            className="text-sm border border-border rounded-lg px-3 py-2"
          >
            <option value="">All Dates</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>
          
          <div className="flex items-center space-x-2">
            <label className="text-xs text-text-secondary whitespace-nowrap">
              Min Score:
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={filterConfig.credibilityMin}
              onChange={(e) => handleFilterChange('credibilityMin', parseInt(e.target.value))}
              className="flex-1"
            />
            <span className="text-xs text-text-secondary w-8">
              {filterConfig.credibilityMin}%
            </span>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-border">
          <thead className="bg-background">
            <tr>
              <th className="px-4 py-3 w-12">
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  ref={input => {
                    if (input) input.indeterminate = isPartiallySelected;
                  }}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  className="rounded border-border"
                />
              </th>
              <SortableHeader label="Name" sortKey="name" className="min-w-64" />
              <SortableHeader label="Source" sortKey="sourceType" />
              <SortableHeader label="Collected" sortKey="collectedDate" />
              <SortableHeader label="Status" sortKey="verificationStatus" />
              <SortableHeader label="Score" sortKey="credibilityScore" />
              <th className="px-4 py-3 text-left text-xs font-heading font-medium text-text-secondary uppercase tracking-wider">
                Tags
              </th>
              <th className="px-4 py-3 text-left text-xs font-heading font-medium text-text-secondary uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-surface divide-y divide-border">
            {paginatedItems.map((item) => (
              <tr
                key={item.id}
                className="hover:bg-background transition-micro cursor-pointer"
                onClick={() => onEvidenceSelect(item)}
              >
                <td className="px-4 py-4">
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(item.id)}
                    onChange={(e) => {
                      e.stopPropagation();
                      handleItemSelect(item.id, e.target.checked);
                    }}
                    className="rounded border-border"
                  />
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center space-x-3">
                    <Icon
                      name={getSourceTypeIcon(item.sourceType)}
                      size={16}
                      className="text-text-secondary"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-medium text-text-primary truncate">
                        {item.name}
                      </div>
                      <div className="text-xs text-text-secondary truncate">
                        {item.sourceUrl}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <span className="text-sm text-text-primary capitalize">
                    {item.sourceType.replace('_', ' ')}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <div className="text-sm text-text-primary">
                    {new Date(item.collectedDate).toLocaleDateString()}
                  </div>
                  <div className="text-xs text-text-secondary">
                    {new Date(item.collectedDate).toLocaleTimeString()}
                  </div>
                </td>
                <td className="px-4 py-4">
                  {getVerificationBadge(item.verificationStatus)}
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 bg-secondary-200 rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full"
                        style={{ width: `${item.credibilityScore}%` }}
                      />
                    </div>
                    <span className="text-xs font-medium text-text-primary w-8">
                      {item.credibilityScore}%
                    </span>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className="flex flex-wrap gap-1">
                    {item.tags?.slice(0, 2).map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800"
                      >
                        {tag}
                      </span>
                    ))}
                    {item.tags?.length > 2 && (
                      <span className="text-xs text-text-secondary">
                        +{item.tags.length - 2}
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center space-x-1">
                    <Button
                      variant="ghost"
                      size="xs"
                      iconName="Eye"
                      onClick={(e) => {
                        e.stopPropagation();
                        onEvidenceSelect(item);
                      }}
                    />
                    <Button
                      variant="ghost"
                      size="xs"
                      iconName="Download"
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log('Download:', item.id);
                      }}
                    />
                    <Button
                      variant="ghost"
                      size="xs"
                      iconName="MoreHorizontal"
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log('More actions:', item.id);
                      }}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="px-4 py-3 border-t border-border bg-background">
          <div className="flex items-center justify-between">
            <div className="text-sm text-text-secondary">
              Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
              {Math.min(currentPage * itemsPerPage, filteredAndSortedItems.length)} of{' '}
              {filteredAndSortedItems.length} results
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                iconName="ChevronLeft"
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
              />
              
              <div className="flex items-center space-x-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const pageNum = i + 1;
                  return (
                    <Button
                      key={pageNum}
                      variant={currentPage === pageNum ? 'primary' : 'ghost'}
                      size="sm"
                      onClick={() => setCurrentPage(pageNum)}
                    >
                      {pageNum}
                    </Button>
                  );
                })}
                {totalPages > 5 && (
                  <>
                    <span className="text-text-secondary">...</span>
                    <Button
                      variant={currentPage === totalPages ? 'primary' : 'ghost'}
                      size="sm"
                      onClick={() => setCurrentPage(totalPages)}
                    >
                      {totalPages}
                    </Button>
                  </>
                )}
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                iconName="ChevronRight"
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EvidenceTable;