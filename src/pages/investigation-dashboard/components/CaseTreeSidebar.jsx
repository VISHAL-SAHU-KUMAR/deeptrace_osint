import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CaseTreeSidebar = ({ cases, onCaseSelect, selectedCaseId }) => {
  const [expandedFolders, setExpandedFolders] = useState(new Set(['active', 'high-priority']));
  const [searchTerm, setSearchTerm] = useState('');

  const toggleFolder = (folderId) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(folderId)) {
      newExpanded.delete(folderId);
    } else {
      newExpanded.add(folderId);
    }
    setExpandedFolders(newExpanded);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-success';
      case 'pending': return 'text-warning';
      case 'closed': return 'text-text-secondary';
      case 'urgent': return 'text-error';
      default: return 'text-text-primary';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'critical': return 'AlertTriangle';
      case 'high': return 'ArrowUp';
      case 'medium': return 'Minus';
      case 'low': return 'ArrowDown';
      default: return 'Circle';
    }
  };

  const filteredCases = cases.filter(case_ => 
    case_.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    case_.target.toLowerCase().includes(searchTerm.toLowerCase()) ||
    case_.caseId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const groupedCases = {
    'active': filteredCases.filter(c => c.status === 'active'),
    'high-priority': filteredCases.filter(c => c.priority === 'critical' || c.priority === 'high'),
    'pending': filteredCases.filter(c => c.status === 'pending'),
    'closed': filteredCases.filter(c => c.status === 'closed')
  };

  return (
    <div className="h-full bg-surface border-r border-border flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-heading font-semibold text-text-primary">
            Case Tree
          </h2>
          <Button
            variant="ghost"
            size="xs"
            iconName="Plus"
            onClick={() => console.log('New case')}
          />
        </div>
        
        {/* Search */}
        <div className="relative">
          <Icon
            name="Search"
            size={16}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary"
          />
          <input
            type="text"
            placeholder="Search cases..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
      </div>

      {/* Case Tree */}
      <div className="flex-1 overflow-y-auto p-2">
        {Object.entries(groupedCases).map(([folderId, folderCases]) => (
          <div key={folderId} className="mb-2">
            <button
              onClick={() => toggleFolder(folderId)}
              className="w-full flex items-center justify-between p-2 text-sm font-medium text-text-primary hover:bg-background rounded-lg transition-micro"
            >
              <div className="flex items-center space-x-2">
                <Icon
                  name={expandedFolders.has(folderId) ? 'ChevronDown' : 'ChevronRight'}
                  size={16}
                  className="text-text-secondary"
                />
                <span className="capitalize">{folderId.replace('-', ' ')}</span>
              </div>
              <span className="text-xs bg-secondary-100 text-text-secondary px-2 py-1 rounded-full">
                {folderCases.length}
              </span>
            </button>

            {expandedFolders.has(folderId) && (
              <div className="ml-4 mt-1 space-y-1">
                {folderCases.map((case_) => (
                  <button
                    key={case_.id}
                    onClick={() => onCaseSelect(case_)}
                    className={`w-full p-2 text-left rounded-lg transition-micro hover:bg-background ${
                      selectedCaseId === case_.id ? 'bg-primary-50 border border-primary' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-mono text-text-secondary">
                        {case_.caseId}
                      </span>
                      <Icon
                        name={getPriorityIcon(case_.priority)}
                        size={12}
                        className={`${
                          case_.priority === 'critical' ? 'text-error' :
                          case_.priority === 'high'? 'text-warning' : 'text-text-secondary'
                        }`}
                      />
                    </div>
                    <p className="text-sm font-medium text-text-primary truncate mb-1">
                      {case_.title}
                    </p>
                    <p className="text-xs text-text-secondary truncate mb-2">
                      Target: {case_.target}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-medium ${getStatusColor(case_.status)}`}>
                        {case_.status.toUpperCase()}
                      </span>
                      {case_.hasNewIntel && (
                        <div className="w-2 h-2 bg-primary rounded-full pulse-subtle" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Footer Stats */}
      <div className="p-4 border-t border-border bg-background">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <p className="text-lg font-heading font-semibold text-text-primary">
              {cases.filter(c => c.status === 'active').length}
            </p>
            <p className="text-xs text-text-secondary">Active</p>
          </div>
          <div>
            <p className="text-lg font-heading font-semibold text-error">
              {cases.filter(c => c.priority === 'critical').length}
            </p>
            <p className="text-xs text-text-secondary">Critical</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseTreeSidebar;