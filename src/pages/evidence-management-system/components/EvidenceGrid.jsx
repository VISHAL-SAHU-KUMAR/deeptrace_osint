import React, { useState, useMemo } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const EvidenceGrid = ({ onSelectEvidence, selectedEvidenceIds, onBulkSelect }) => {
  const [sortField, setSortField] = useState('collectionDate');
  const [sortDirection, setSortDirection] = useState('desc');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 25;

  const evidenceData = [
    {
      id: 'EV-2024-001',
      name: 'Laptop Hard Drive - Dell Latitude 7420',
      collectionDate: '2024-01-15T10:30:00Z',
      source: 'Suspect Workstation',
      custodian: 'Detective J. Smith',
      status: 'verified',
      legalHold: true,
      size: '512 GB',
      hash: 'sha256:a1b2c3d4...',
      type: 'Digital Storage',
      location: 'Evidence Locker A-15',
      caseId: 'INV-2024-001',
      priority: 'high'
    },
    {
      id: 'EV-2024-002',
      name: 'iPhone 14 Pro - Mobile Device',
      collectionDate: '2024-01-15T11:45:00Z',
      source: 'Suspect Personal',
      custodian: 'Officer M. Johnson',
      status: 'processing',
      legalHold: true,
      size: '256 GB',
      hash: 'sha256:e5f6g7h8...',
      type: 'Mobile Device',
      location: 'Evidence Locker B-03',
      caseId: 'INV-2024-001',
      priority: 'high'
    },
    {
      id: 'EV-2024-003',
      name: 'Email Server Backup',
      collectionDate: '2024-01-16T09:15:00Z',
      source: 'Corporate Exchange Server',
      custodian: 'Analyst R. Davis',
      status: 'verified',
      legalHold: false,
      size: '2.1 TB',
      hash: 'sha256:i9j0k1l2...',
      type: 'Email Archive',
      location: 'Digital Storage Vault',
      caseId: 'INV-2024-001',
      priority: 'medium'
    },
    {
      id: 'EV-2024-004',
      name: 'USB Flash Drive - SanDisk 64GB',
      collectionDate: '2024-01-16T14:20:00Z',
      source: 'Office Desk Drawer',
      custodian: 'Detective A. Wilson',
      status: 'sealed',
      legalHold: true,
      size: '64 GB',
      hash: 'sha256:m3n4o5p6...',
      type: 'Removable Media',
      location: 'Evidence Locker A-22',
      caseId: 'INV-2024-001',
      priority: 'medium'
    },
    {
      id: 'EV-2024-005',
      name: 'Network Router Configuration',
      collectionDate: '2024-01-17T08:30:00Z',
      source: 'Office Network Infrastructure',
      custodian: 'Tech Specialist T. Brown',
      status: 'verified',
      legalHold: false,
      size: '2.3 MB',
      hash: 'sha256:q7r8s9t0...',
      type: 'Network Config',
      location: 'Digital Archive',
      caseId: 'INV-2024-001',
      priority: 'low'
    },
    {
      id: 'EV-2024-006',
      name: 'Financial Records - Bank Statements',
      collectionDate: '2024-01-17T13:45:00Z',
      source: 'Subpoena Response',
      custodian: 'Analyst K. Miller',
      status: 'legal-hold',
      legalHold: true,
      size: '45.2 MB',
      hash: 'sha256:u1v2w3x4...',
      type: 'Financial Document',
      location: 'Secure Document Storage',
      caseId: 'INV-2024-001',
      priority: 'high'
    },
    {
      id: 'EV-2024-007',
      name: 'Communication Logs - WhatsApp',
      collectionDate: '2024-01-18T10:15:00Z',
      source: 'Mobile Device Extraction',
      custodian: 'Analyst L. Garcia',
      status: 'verified',
      legalHold: true,
      size: '128 MB',
      hash: 'sha256:y5z6a7b8...',
      type: 'Communication',
      location: 'Digital Evidence Vault',
      caseId: 'INV-2024-001',
      priority: 'high'
    },
    {
      id: 'EV-2024-008',
      name: 'Server Access Logs',
      collectionDate: '2024-01-18T16:30:00Z',
      source: 'Web Server',
      custodian: 'Admin P. Anderson',
      status: 'archived',
      legalHold: false,
      size: '890 MB',
      hash: 'sha256:c9d0e1f2...',
      type: 'System Logs',
      location: 'Archive Storage',
      caseId: 'INV-2024-002',
      priority: 'low'
    },
    {
      id: 'EV-2024-009',
      name: 'Database Backup - Customer Records',
      collectionDate: '2024-01-19T11:00:00Z',
      source: 'Production Database',
      custodian: 'DBA S. Taylor',
      status: 'archived',
      legalHold: false,
      size: '5.7 GB',
      hash: 'sha256:g3h4i5j6...',
      type: 'Database',
      location: 'Archive Storage',
      caseId: 'INV-2024-002',
      priority: 'medium'
    },
    {
      id: 'EV-2024-010',
      name: 'Cloud Storage Data - Google Drive',
      collectionDate: '2024-01-20T09:45:00Z',
      source: 'Cloud Service Provider',
      custodian: 'Pending Assignment',
      status: 'collecting',
      legalHold: false,
      size: 'Unknown',
      hash: 'Pending',
      type: 'Cloud Storage',
      location: 'Processing Queue',
      caseId: 'INV-2024-003',
      priority: 'medium'
    }
  ];

  const filteredAndSortedData = useMemo(() => {
    let filtered = evidenceData;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.custodian.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (filterStatus !== 'all') {
      filtered = filtered.filter(item => item.status === filterStatus);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];

      if (sortField === 'collectionDate') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }

      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [evidenceData, searchTerm, filterStatus, sortField, sortDirection]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedData.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAndSortedData, currentPage]);

  const totalPages = Math.ceil(filteredAndSortedData.length / itemsPerPage);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'verified': return 'text-success bg-success-50';
      case 'processing': return 'text-warning bg-warning-50';
      case 'sealed': return 'text-primary bg-primary-50';
      case 'legal-hold': return 'text-error bg-error-50';
      case 'archived': return 'text-text-secondary bg-secondary-100';
      case 'collecting': return 'text-accent bg-accent-50';
      default: return 'text-text-secondary bg-secondary-100';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-error';
      case 'medium': return 'text-warning';
      case 'low': return 'text-success';
      default: return 'text-text-secondary';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      onBulkSelect(paginatedData.map(item => item.id));
    } else {
      onBulkSelect([]);
    }
  };

  const handleSelectItem = (itemId, checked) => {
    if (checked) {
      onBulkSelect([...selectedEvidenceIds, itemId]);
    } else {
      onBulkSelect(selectedEvidenceIds.filter(id => id !== itemId));
    }
  };

  const isAllSelected = paginatedData.length > 0 && paginatedData.every(item => selectedEvidenceIds.includes(item.id));
  const isPartiallySelected = paginatedData.some(item => selectedEvidenceIds.includes(item.id)) && !isAllSelected;

  return (
    <div className="h-full bg-surface flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-heading font-semibold text-text-primary">
            Evidence Grid
          </h3>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              iconName="Download"
              onClick={() => console.log('Export evidence')}
            >
              Export
            </Button>
            <Button
              variant="primary"
              size="sm"
              iconName="Plus"
              onClick={() => console.log('Add evidence')}
            >
              Add Evidence
            </Button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex items-center space-x-4 mb-4">
          <div className="flex-1 max-w-md">
            <Input
              type="search"
              placeholder="Search evidence by ID, name, source, or custodian..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-border rounded-lg text-sm bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="all">All Status</option>
            <option value="verified">Verified</option>
            <option value="processing">Processing</option>
            <option value="sealed">Sealed</option>
            <option value="legal-hold">Legal Hold</option>
            <option value="archived">Archived</option>
            <option value="collecting">Collecting</option>
          </select>
        </div>

        {/* Bulk Actions */}
        {selectedEvidenceIds.length > 0 && (
          <div className="flex items-center space-x-2 p-3 bg-primary-50 rounded-lg">
            <span className="text-sm text-text-primary">
              {selectedEvidenceIds.length} items selected
            </span>
            <Button variant="ghost" size="xs" iconName="Tag">Tag</Button>
            <Button variant="ghost" size="xs" iconName="UserCheck">Transfer</Button>
            <Button variant="ghost" size="xs" iconName="Lock">Legal Hold</Button>
            <Button variant="ghost" size="xs" iconName="Archive">Archive</Button>
          </div>
        )}
      </div>

      {/* Grid */}
      <div className="flex-1 overflow-auto">
        <table className="w-full">
          <thead className="bg-background border-b border-border sticky top-0">
            <tr>
              <th className="w-12 p-3 text-left">
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  ref={(el) => {
                    if (el) el.indeterminate = isPartiallySelected;
                  }}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  className="rounded border-border"
                />
              </th>
              <th
                className="p-3 text-left text-xs font-heading font-medium text-text-secondary uppercase tracking-wider cursor-pointer hover:bg-secondary-50"
                onClick={() => handleSort('id')}
              >
                <div className="flex items-center space-x-1">
                  <span>Evidence ID</span>
                  {sortField === 'id' && (
                    <Icon
                      name={sortDirection === 'asc' ? 'ChevronUp' : 'ChevronDown'}
                      size={14}
                    />
                  )}
                </div>
              </th>
              <th
                className="p-3 text-left text-xs font-heading font-medium text-text-secondary uppercase tracking-wider cursor-pointer hover:bg-secondary-50"
                onClick={() => handleSort('name')}
              >
                <div className="flex items-center space-x-1">
                  <span>Name & Description</span>
                  {sortField === 'name' && (
                    <Icon
                      name={sortDirection === 'asc' ? 'ChevronUp' : 'ChevronDown'}
                      size={14}
                    />
                  )}
                </div>
              </th>
              <th
                className="p-3 text-left text-xs font-heading font-medium text-text-secondary uppercase tracking-wider cursor-pointer hover:bg-secondary-50"
                onClick={() => handleSort('collectionDate')}
              >
                <div className="flex items-center space-x-1">
                  <span>Collection Date</span>
                  {sortField === 'collectionDate' && (
                    <Icon
                      name={sortDirection === 'asc' ? 'ChevronUp' : 'ChevronDown'}
                      size={14}
                    />
                  )}
                </div>
              </th>
              <th
                className="p-3 text-left text-xs font-heading font-medium text-text-secondary uppercase tracking-wider cursor-pointer hover:bg-secondary-50"
                onClick={() => handleSort('source')}
              >
                <div className="flex items-center space-x-1">
                  <span>Source</span>
                  {sortField === 'source' && (
                    <Icon
                      name={sortDirection === 'asc' ? 'ChevronUp' : 'ChevronDown'}
                      size={14}
                    />
                  )}
                </div>
              </th>
              <th
                className="p-3 text-left text-xs font-heading font-medium text-text-secondary uppercase tracking-wider cursor-pointer hover:bg-secondary-50"
                onClick={() => handleSort('custodian')}
              >
                <div className="flex items-center space-x-1">
                  <span>Custodian</span>
                  {sortField === 'custodian' && (
                    <Icon
                      name={sortDirection === 'asc' ? 'ChevronUp' : 'ChevronDown'}
                      size={14}
                    />
                  )}
                </div>
              </th>
              <th
                className="p-3 text-left text-xs font-heading font-medium text-text-secondary uppercase tracking-wider cursor-pointer hover:bg-secondary-50"
                onClick={() => handleSort('status')}
              >
                <div className="flex items-center space-x-1">
                  <span>Status</span>
                  {sortField === 'status' && (
                    <Icon
                      name={sortDirection === 'asc' ? 'ChevronUp' : 'ChevronDown'}
                      size={14}
                    />
                  )}
                </div>
              </th>
              <th className="p-3 text-left text-xs font-heading font-medium text-text-secondary uppercase tracking-wider">
                Legal Hold
              </th>
              <th className="p-3 text-left text-xs font-heading font-medium text-text-secondary uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {paginatedData.map((item) => (
              <tr
                key={item.id}
                className="hover:bg-background transition-micro cursor-pointer"
                onClick={() => onSelectEvidence(item)}
              >
                <td className="p-3">
                  <input
                    type="checkbox"
                    checked={selectedEvidenceIds.includes(item.id)}
                    onChange={(e) => {
                      e.stopPropagation();
                      handleSelectItem(item.id, e.target.checked);
                    }}
                    className="rounded border-border"
                  />
                </td>
                <td className="p-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-data font-medium text-text-primary">
                      {item.id}
                    </span>
                    <Icon
                      name="Circle"
                      size={8}
                      className={getPriorityColor(item.priority)}
                    />
                  </div>
                </td>
                <td className="p-3">
                  <div>
                    <p className="text-sm font-medium text-text-primary">
                      {item.name}
                    </p>
                    <p className="text-xs text-text-secondary">
                      {item.type} • {item.size}
                    </p>
                  </div>
                </td>
                <td className="p-3">
                  <span className="text-sm text-text-primary">
                    {formatDate(item.collectionDate)}
                  </span>
                </td>
                <td className="p-3">
                  <span className="text-sm text-text-primary">
                    {item.source}
                  </span>
                </td>
                <td className="p-3">
                  <span className="text-sm text-text-primary">
                    {item.custodian}
                  </span>
                </td>
                <td className="p-3">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                    {item.status.replace('-', ' ').toUpperCase()}
                  </span>
                </td>
                <td className="p-3">
                  {item.legalHold ? (
                    <Icon name="Lock" size={16} className="text-error" />
                  ) : (
                    <Icon name="Unlock" size={16} className="text-text-secondary" />
                  )}
                </td>
                <td className="p-3">
                  <div className="flex items-center space-x-1">
                    <Button
                      variant="ghost"
                      size="xs"
                      iconName="Eye"
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log('View evidence', item.id);
                      }}
                    />
                    <Button
                      variant="ghost"
                      size="xs"
                      iconName="Edit"
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log('Edit evidence', item.id);
                      }}
                    />
                    <Button
                      variant="ghost"
                      size="xs"
                      iconName="MoreHorizontal"
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log('More actions', item.id);
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
      <div className="p-4 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="text-sm text-text-secondary">
            Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredAndSortedData.length)} of {filteredAndSortedData.length} results
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              iconName="ChevronLeft"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Previous
            </Button>
            <span className="text-sm text-text-primary">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="ghost"
              size="sm"
              iconName="ChevronRight"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EvidenceGrid;