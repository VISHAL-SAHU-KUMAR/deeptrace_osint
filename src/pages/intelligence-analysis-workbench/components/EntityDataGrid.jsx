import React, { useState, useMemo } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const EntityDataGrid = ({ 
  entities, 
  onEntitySelect, 
  onBulkAction, 
  selectedEntities, 
  onSelectionChange 
}) => {
  const [sortConfig, setSortConfig] = useState({ key: 'confidence', direction: 'desc' });
  const [filterConfig, setFilterConfig] = useState({
    type: 'all',
    confidence: 0,
    source: 'all'
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  const mockEntities = [
    {
      id: 'ent1',
      type: 'person',
      value: 'John Anderson',
      confidence: 0.95,
      sources: ['Email Analysis', 'Social Media', 'Public Records'],
      relationships: 8,
      lastSeen: new Date('2024-01-15T14:30:00'),
      tags: ['target', 'high-priority'],
      notes: 3
    },
    {
      id: 'ent2',
      type: 'email',
      value: 'j.anderson@company.com',
      confidence: 0.98,
      sources: ['Email Headers', 'WHOIS'],
      relationships: 5,
      lastSeen: new Date('2024-01-15T16:45:00'),
      tags: ['verified'],
      notes: 1
    },
    {
      id: 'ent3',
      type: 'phone',
      value: '+1-555-0123',
      confidence: 0.87,
      sources: ['Call Records'],
      relationships: 3,
      lastSeen: new Date('2024-01-15T12:20:00'),
      tags: ['mobile'],
      notes: 0
    },
    {
      id: 'ent4',
      type: 'domain',
      value: 'suspicious-site.com',
      confidence: 0.76,
      sources: ['DNS Analysis', 'Traffic Analysis', 'Threat Intel', 'WHOIS'],
      relationships: 12,
      lastSeen: new Date('2024-01-15T18:10:00'),
      tags: ['suspicious', 'monitored'],
      notes: 5
    },
    {
      id: 'ent5',
      type: 'ip',
      value: '192.168.1.100',
      confidence: 0.92,
      sources: ['Network Logs', 'Geolocation'],
      relationships: 6,
      lastSeen: new Date('2024-01-15T17:30:00'),
      tags: ['internal'],
      notes: 2
    },
    {
      id: 'ent6',
      type: 'location',
      value: 'New York, NY',
      confidence: 0.89,
      sources: ['GPS Data', 'IP Geolocation', 'Social Media'],
      relationships: 4,
      lastSeen: new Date('2024-01-15T15:45:00'),
      tags: ['frequent'],
      notes: 1
    },
    {
      id: 'ent7',
      type: 'person',
      value: 'Sarah Mitchell',
      confidence: 0.83,
      sources: ['Social Media', 'Public Records'],
      relationships: 7,
      lastSeen: new Date('2024-01-15T13:15:00'),
      tags: ['associate'],
      notes: 2
    },
    {
      id: 'ent8',
      type: 'email',
      value: 's.mitchell@example.org',
      confidence: 0.91,
      sources: ['Email Analysis'],
      relationships: 3,
      lastSeen: new Date('2024-01-15T14:50:00'),
      tags: ['verified'],
      notes: 0
    }
  ];

  const getEntityIcon = (type) => {
    const icons = {
      person: 'User',
      email: 'Mail',
      phone: 'Phone',
      domain: 'Globe',
      ip: 'Server',
      location: 'MapPin'
    };
    return icons[type] || 'Circle';
  };

  const getEntityColor = (type) => {
    const colors = {
      person: 'text-blue-600',
      email: 'text-green-600',
      phone: 'text-amber-600',
      domain: 'text-red-600',
      ip: 'text-purple-600',
      location: 'text-cyan-600'
    };
    return colors[type] || 'text-gray-600';
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 0.9) return 'text-green-600 bg-green-50';
    if (confidence >= 0.7) return 'text-amber-600 bg-amber-50';
    return 'text-red-600 bg-red-50';
  };

  const filteredAndSortedEntities = useMemo(() => {
    let filtered = mockEntities.filter(entity => {
      const matchesSearch = entity.value.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           entity.type.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = filterConfig.type === 'all' || entity.type === filterConfig.type;
      const matchesConfidence = entity.confidence >= filterConfig.confidence;
      const matchesSource = filterConfig.source === 'all' || 
                           entity.sources.some(source => source.toLowerCase().includes(filterConfig.source.toLowerCase()));
      
      return matchesSearch && matchesType && matchesConfidence && matchesSource;
    });

    if (sortConfig.key) {
      filtered.sort((a, b) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];
        
        if (sortConfig.key === 'lastSeen') {
          aValue = new Date(aValue).getTime();
          bValue = new Date(bValue).getTime();
        }
        
        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [mockEntities, searchTerm, filterConfig, sortConfig]);

  const paginatedEntities = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedEntities.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAndSortedEntities, currentPage]);

  const totalPages = Math.ceil(filteredAndSortedEntities.length / itemsPerPage);

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleSelectAll = () => {
    const allIds = paginatedEntities.map(entity => entity.id);
    const allSelected = allIds.every(id => selectedEntities.includes(id));
    
    if (allSelected) {
      onSelectionChange(selectedEntities.filter(id => !allIds.includes(id)));
    } else {
      onSelectionChange([...new Set([...selectedEntities, ...allIds])]);
    }
  };

  const handleEntityToggle = (entityId) => {
    if (selectedEntities.includes(entityId)) {
      onSelectionChange(selectedEntities.filter(id => id !== entityId));
    } else {
      onSelectionChange([...selectedEntities, entityId]);
    }
  };

  const columns = [
    { key: 'select', label: '', width: 'w-12' },
    { key: 'type', label: 'Type', width: 'w-20', sortable: true },
    { key: 'value', label: 'Value', width: 'flex-1', sortable: true },
    { key: 'confidence', label: 'Confidence', width: 'w-24', sortable: true },
    { key: 'sources', label: 'Sources', width: 'w-20', sortable: false },
    { key: 'relationships', label: 'Relations', width: 'w-20', sortable: true },
    { key: 'lastSeen', label: 'Last Seen', width: 'w-32', sortable: true },
    { key: 'tags', label: 'Tags', width: 'w-32', sortable: false },
    { key: 'actions', label: 'Actions', width: 'w-24' }
  ];

  return (
    <div className="h-full bg-surface border border-border rounded-lg">
      {/* Header Controls */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <h3 className="text-lg font-semibold text-text-primary">Entity Data Grid</h3>
            <span className="text-sm text-text-secondary">
              {filteredAndSortedEntities.length} entities
            </span>
          </div>
          
          {selectedEntities.length > 0 && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-text-secondary">
                {selectedEntities.length} selected
              </span>
              <Button
                variant="primary"
                size="sm"
                iconName="GitBranch"
                onClick={() => onBulkAction('create-relationships')}
              >
                Create Relations
              </Button>
              <Button
                variant="outline"
                size="sm"
                iconName="Tag"
                onClick={() => onBulkAction('bulk-tag')}
              >
                Bulk Tag
              </Button>
            </div>
          )}
        </div>

        {/* Search and Filters */}
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <Input
              type="search"
              placeholder="Search entities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <select
            value={filterConfig.type}
            onChange={(e) => setFilterConfig(prev => ({ ...prev, type: e.target.value }))}
            className="px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="all">All Types</option>
            <option value="person">Person</option>
            <option value="email">Email</option>
            <option value="phone">Phone</option>
            <option value="domain">Domain</option>
            <option value="ip">IP Address</option>
            <option value="location">Location</option>
          </select>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm text-text-secondary">Min Confidence:</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={filterConfig.confidence}
              onChange={(e) => setFilterConfig(prev => ({ ...prev, confidence: parseFloat(e.target.value) }))}
              className="w-20"
            />
            <span className="text-sm text-text-secondary w-8">
              {Math.round(filterConfig.confidence * 100)}%
            </span>
          </div>
        </div>
      </div>

      {/* Data Grid */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-background border-b border-border">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`${column.width} px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider`}
                >
                  {column.key === 'select' ? (
                    <input
                      type="checkbox"
                      checked={paginatedEntities.length > 0 && paginatedEntities.every(entity => selectedEntities.includes(entity.id))}
                      onChange={handleSelectAll}
                      className="rounded border-border"
                    />
                  ) : (
                    <div className="flex items-center space-x-1">
                      <span>{column.label}</span>
                      {column.sortable && (
                        <button
                          onClick={() => handleSort(column.key)}
                          className="hover:text-text-primary"
                        >
                          <Icon
                            name={sortConfig.key === column.key && sortConfig.direction === 'asc' ? 'ChevronUp' : 'ChevronDown'}
                            size={14}
                          />
                        </button>
                      )}
                    </div>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {paginatedEntities.map((entity) => (
              <tr
                key={entity.id}
                className="hover:bg-background transition-micro cursor-pointer"
                onClick={() => onEntitySelect(entity)}
              >
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={selectedEntities.includes(entity.id)}
                    onChange={(e) => {
                      e.stopPropagation();
                      handleEntityToggle(entity.id);
                    }}
                    className="rounded border-border"
                  />
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center space-x-2">
                    <Icon
                      name={getEntityIcon(entity.type)}
                      size={16}
                      className={getEntityColor(entity.type)}
                    />
                    <span className="text-xs text-text-secondary capitalize">
                      {entity.type}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-text-primary truncate">
                      {entity.value}
                    </span>
                    {entity.notes > 0 && (
                      <Icon name="FileText" size={12} className="text-text-secondary" />
                    )}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getConfidenceColor(entity.confidence)}`}>
                    {Math.round(entity.confidence * 100)}%
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm text-text-secondary">
                    {entity.sources.length}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm text-text-secondary">
                    {entity.relationships}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-xs text-text-secondary">
                    {entity.lastSeen.toLocaleString()}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-1">
                    {entity.tags.slice(0, 2).map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-secondary-100 text-text-secondary text-xs rounded"
                      >
                        {tag}
                      </span>
                    ))}
                    {entity.tags.length > 2 && (
                      <span className="text-xs text-text-secondary">
                        +{entity.tags.length - 2}
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <Button
                    variant="ghost"
                    size="xs"
                    iconName="MoreHorizontal"
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log('Entity actions', entity.id);
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between p-4 border-t border-border">
        <div className="text-sm text-text-secondary">
          Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredAndSortedEntities.length)} of {filteredAndSortedEntities.length} entities
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            iconName="ChevronLeft"
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
          />
          
          <div className="flex items-center space-x-1">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const page = i + 1;
              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1 text-sm rounded-lg transition-micro ${
                    currentPage === page
                      ? 'bg-primary text-primary-foreground'
                      : 'text-text-secondary hover:text-text-primary hover:bg-background'
                  }`}
                >
                  {page}
                </button>
              );
            })}
          </div>
          
          <Button
            variant="outline"
            size="sm"
            iconName="ChevronRight"
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
          />
        </div>
      </div>
    </div>
  );
};

export default EntityDataGrid;