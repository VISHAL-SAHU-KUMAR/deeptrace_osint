import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EvidenceHierarchyTree = ({ onSelectEvidence, selectedEvidenceId }) => {
  const [expandedNodes, setExpandedNodes] = useState(new Set(['root', 'case-001', 'case-002']));

  const evidenceTree = [
    {
      id: 'root',
      name: 'Evidence Repository',
      type: 'root',
      children: [
        {
          id: 'case-001',
          name: 'Case INV-2024-001',
          type: 'case',
          status: 'active',
          evidenceCount: 47,
          children: [
            {
              id: 'digital-001',
              name: 'Digital Evidence',
              type: 'category',
              evidenceCount: 23,
              children: [
                { id: 'ev-001', name: 'Laptop Hard Drive', type: 'evidence', status: 'verified', custodian: 'J. Smith' },
                { id: 'ev-002', name: 'Mobile Phone Data', type: 'evidence', status: 'processing', custodian: 'M. Johnson' },
                { id: 'ev-003', name: 'Email Archive', type: 'evidence', status: 'verified', custodian: 'R. Davis' }
              ]
            },
            {
              id: 'physical-001',
              name: 'Physical Evidence',
              type: 'category',
              evidenceCount: 12,
              children: [
                { id: 'ev-004', name: 'USB Drive', type: 'evidence', status: 'sealed', custodian: 'A. Wilson' },
                { id: 'ev-005', name: 'Network Router', type: 'evidence', status: 'verified', custodian: 'T. Brown' }
              ]
            },
            {
              id: 'documents-001',
              name: 'Documents',
              type: 'category',
              evidenceCount: 12,
              children: [
                { id: 'ev-006', name: 'Financial Records', type: 'evidence', status: 'legal-hold', custodian: 'K. Miller' },
                { id: 'ev-007', name: 'Communication Logs', type: 'evidence', status: 'verified', custodian: 'L. Garcia' }
              ]
            }
          ]
        },
        {
          id: 'case-002',
          name: 'Case INV-2024-002',
          type: 'case',
          status: 'closed',
          evidenceCount: 31,
          children: [
            {
              id: 'digital-002',
              name: 'Digital Evidence',
              type: 'category',
              evidenceCount: 18,
              children: [
                { id: 'ev-008', name: 'Server Logs', type: 'evidence', status: 'archived', custodian: 'P. Anderson' },
                { id: 'ev-009', name: 'Database Backup', type: 'evidence', status: 'archived', custodian: 'S. Taylor' }
              ]
            }
          ]
        },
        {
          id: 'case-003',
          name: 'Case INV-2024-003',
          type: 'case',
          status: 'pending',
          evidenceCount: 8,
          children: [
            {
              id: 'digital-003',
              name: 'Digital Evidence',
              type: 'category',
              evidenceCount: 8,
              children: [
                { id: 'ev-010', name: 'Cloud Storage Data', type: 'evidence', status: 'collecting', custodian: 'N/A' }
              ]
            }
          ]
        }
      ]
    }
  ];

  const toggleNode = (nodeId) => {
    const newExpanded = new Set(expandedNodes);
    if (newExpanded.has(nodeId)) {
      newExpanded.delete(nodeId);
    } else {
      newExpanded.add(nodeId);
    }
    setExpandedNodes(newExpanded);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-success';
      case 'closed': return 'text-text-secondary';
      case 'pending': return 'text-warning';
      case 'verified': return 'text-success';
      case 'processing': return 'text-warning';
      case 'sealed': return 'text-primary';
      case 'legal-hold': return 'text-error';
      case 'archived': return 'text-text-secondary';
      case 'collecting': return 'text-accent';
      default: return 'text-text-primary';
    }
  };

  const getTypeIcon = (type, status) => {
    switch (type) {
      case 'root': return 'Database';
      case 'case': return 'FolderOpen';
      case 'category': return 'Folder';
      case 'evidence': 
        if (status === 'legal-hold') return 'Lock';
        if (status === 'sealed') return 'Shield';
        return 'File';
      default: return 'File';
    }
  };

  const renderNode = (node, level = 0) => {
    const isExpanded = expandedNodes.has(node.id);
    const hasChildren = node.children && node.children.length > 0;
    const isSelected = selectedEvidenceId === node.id;

    return (
      <div key={node.id} className="select-none">
        <div
          className={`flex items-center py-1 px-2 rounded cursor-pointer hover:bg-background transition-micro ${
            isSelected ? 'bg-primary-100 border-l-2 border-primary' : ''
          }`}
          style={{ paddingLeft: `${level * 16 + 8}px` }}
          onClick={() => {
            if (node.type === 'evidence') {
              onSelectEvidence(node);
            } else if (hasChildren) {
              toggleNode(node.id);
            }
          }}
        >
          {hasChildren && (
            <Icon
              name={isExpanded ? 'ChevronDown' : 'ChevronRight'}
              size={16}
              className="text-text-secondary mr-1 flex-shrink-0"
            />
          )}
          {!hasChildren && <div className="w-4 mr-1" />}
          
          <Icon
            name={getTypeIcon(node.type, node.status)}
            size={16}
            className={`mr-2 flex-shrink-0 ${getStatusColor(node.status)}`}
          />
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <span className={`text-sm font-medium truncate ${
                node.type === 'evidence' ? 'text-text-primary' : 'text-text-primary'
              }`}>
                {node.name}
              </span>
              {node.evidenceCount && (
                <span className="text-xs text-text-secondary bg-secondary-100 px-2 py-0.5 rounded-full ml-2 flex-shrink-0">
                  {node.evidenceCount}
                </span>
              )}
            </div>
            {node.custodian && (
              <div className="text-xs text-text-secondary mt-0.5">
                Custodian: {node.custodian}
              </div>
            )}
            {node.status && node.type === 'evidence' && (
              <div className={`text-xs mt-0.5 capitalize ${getStatusColor(node.status)}`}>
                {node.status.replace('-', ' ')}
              </div>
            )}
          </div>
        </div>
        
        {hasChildren && isExpanded && (
          <div>
            {node.children.map(child => renderNode(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="h-full bg-surface border-r border-border">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-heading font-semibold text-text-primary">
            Evidence Hierarchy
          </h3>
          <Button
            variant="ghost"
            size="xs"
            iconName="RefreshCw"
            onClick={() => console.log('Refresh tree')}
          />
        </div>
        
        <div className="flex items-center space-x-2 mb-3">
          <Button
            variant="ghost"
            size="xs"
            iconName="Plus"
            onClick={() => console.log('Add evidence')}
          >
            Add
          </Button>
          <Button
            variant="ghost"
            size="xs"
            iconName="Search"
            onClick={() => console.log('Search evidence')}
          >
            Search
          </Button>
        </div>
        
        <div className="flex items-center space-x-4 text-xs text-text-secondary">
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-success rounded-full"></div>
            <span>Active</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-error rounded-full"></div>
            <span>Hold</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-text-secondary rounded-full"></div>
            <span>Archived</span>
          </div>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-2">
        {evidenceTree.map(node => renderNode(node))}
      </div>
    </div>
  );
};

export default EvidenceHierarchyTree;