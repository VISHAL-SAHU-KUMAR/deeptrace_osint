import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const OrganizationHierarchy = ({ onDepartmentSelect, selectedDepartment }) => {
  const [expandedNodes, setExpandedNodes] = useState(['root', 'security', 'intelligence']);

  const organizationData = [
    {
      id: 'root',
      name: 'DeepTrace OSINT',
      type: 'organization',
      userCount: 127,
      children: [
        {
          id: 'security',
          name: 'Security Operations',
          type: 'department',
          userCount: 45,
          children: [
            { id: 'soc', name: 'SOC Team', type: 'team', userCount: 18 },
            { id: 'incident', name: 'Incident Response', type: 'team', userCount: 12 },
            { id: 'threat-hunt', name: 'Threat Hunting', type: 'team', userCount: 15 }
          ]
        },
        {
          id: 'intelligence',
          name: 'Intelligence Division',
          type: 'department',
          userCount: 38,
          children: [
            { id: 'osint', name: 'OSINT Analysts', type: 'team', userCount: 22 },
            { id: 'research', name: 'Research Team', type: 'team', userCount: 16 }
          ]
        },
        {
          id: 'forensics',
          name: 'Digital Forensics',
          type: 'department',
          userCount: 28,
          children: [
            { id: 'mobile', name: 'Mobile Forensics', type: 'team', userCount: 8 },
            { id: 'network', name: 'Network Analysis', type: 'team', userCount: 10 },
            { id: 'malware', name: 'Malware Analysis', type: 'team', userCount: 10 }
          ]
        },
        {
          id: 'admin',
          name: 'Administration',
          type: 'department',
          userCount: 16,
          children: [
            { id: 'it', name: 'IT Support', type: 'team', userCount: 8 },
            { id: 'compliance', name: 'Compliance', type: 'team', userCount: 8 }
          ]
        }
      ]
    }
  ];

  const toggleNode = (nodeId) => {
    setExpandedNodes(prev => 
      prev.includes(nodeId) 
        ? prev.filter(id => id !== nodeId)
        : [...prev, nodeId]
    );
  };

  const getNodeIcon = (type, hasChildren, isExpanded) => {
    if (hasChildren) {
      return isExpanded ? 'ChevronDown' : 'ChevronRight';
    }
    switch (type) {
      case 'organization':
        return 'Building2';
      case 'department':
        return 'Users';
      case 'team':
        return 'UserCheck';
      default:
        return 'Circle';
    }
  };

  const getNodeColor = (type) => {
    switch (type) {
      case 'organization':
        return 'text-primary';
      case 'department':
        return 'text-secondary';
      case 'team':
        return 'text-text-secondary';
      default:
        return 'text-text-tertiary';
    }
  };

  const renderNode = (node, level = 0) => {
    const hasChildren = node.children && node.children.length > 0;
    const isExpanded = expandedNodes.includes(node.id);
    const isSelected = selectedDepartment === node.id;

    return (
      <div key={node.id}>
        <div
          className={`flex items-center py-2 px-3 rounded-lg cursor-pointer transition-micro hover:bg-background group ${
            isSelected ? 'bg-primary-50 border border-primary-200' : ''
          }`}
          style={{ marginLeft: `${level * 16}px` }}
          onClick={() => {
            if (hasChildren) {
              toggleNode(node.id);
            }
            onDepartmentSelect(node.id, node.name);
          }}
        >
          <Icon
            name={getNodeIcon(node.type, hasChildren, isExpanded)}
            size={16}
            className={`mr-2 ${getNodeColor(node.type)} ${
              hasChildren ? 'cursor-pointer' : ''
            }`}
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <span className={`text-sm font-heading font-medium truncate ${
                isSelected ? 'text-primary' : 'text-text-primary'
              }`}>
                {node.name}
              </span>
              <span className="text-xs text-text-secondary bg-secondary-100 px-2 py-1 rounded-full ml-2">
                {node.userCount}
              </span>
            </div>
            <p className="text-xs text-text-tertiary capitalize font-caption">
              {node.type}
            </p>
          </div>
        </div>
        {hasChildren && isExpanded && (
          <div className="mt-1">
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
          <h2 className="text-lg font-heading font-semibold text-text-primary">
            Organization
          </h2>
          <Button
            variant="ghost"
            size="sm"
            iconName="Plus"
            onClick={() => console.log('Add department')}
          />
        </div>
        <div className="relative">
          <Icon
            name="Search"
            size={16}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary"
          />
          <input
            type="text"
            placeholder="Search departments..."
            className="w-full pl-9 pr-3 py-2 text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
      </div>

      <div className="p-4 overflow-y-auto" style={{ height: 'calc(100% - 120px)' }}>
        {organizationData.map(node => renderNode(node))}
      </div>

      <div className="p-4 border-t border-border">
        <div className="bg-background rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-heading font-medium text-text-primary">
              Total Users
            </span>
            <span className="text-sm font-heading font-semibold text-primary">
              127
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-text-secondary">
              Active Sessions
            </span>
            <span className="text-xs font-medium text-success">
              89 online
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizationHierarchy;