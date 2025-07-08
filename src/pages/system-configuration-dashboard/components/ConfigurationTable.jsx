import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ConfigurationTable = ({ configurations, onUpdate, onBulkUpdate, selectedItems, onSelectionChange }) => {
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState('');

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedConfigurations = [...configurations].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    const modifier = sortDirection === 'asc' ? 1 : -1;
    
    if (typeof aValue === 'string') {
      return aValue.localeCompare(bValue) * modifier;
    }
    return (aValue - bValue) * modifier;
  });

  const handleEdit = (config) => {
    setEditingId(config.id);
    setEditValue(config.currentValue);
  };

  const handleSave = (config) => {
    onUpdate(config.id, editValue);
    setEditingId(null);
    setEditValue('');
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditValue('');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'valid':
        return 'text-success bg-success-50';
      case 'warning':
        return 'text-warning bg-warning-50';
      case 'error':
        return 'text-error bg-error-50';
      default:
        return 'text-text-secondary bg-secondary-100';
    }
  };

  const getImpactColor = (impact) => {
    switch (impact) {
      case 'critical':
        return 'text-error bg-error-50';
      case 'high':
        return 'text-warning bg-warning-50';
      case 'medium':
        return 'text-accent bg-accent-50';
      case 'low':
        return 'text-success bg-success-50';
      default:
        return 'text-text-secondary bg-secondary-100';
    }
  };

  return (
    <div className="bg-surface rounded-lg border border-border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-background border-b border-border">
            <tr>
              <th className="w-12 px-4 py-3">
                <input
                  type="checkbox"
                  checked={selectedItems.length === configurations.length}
                  onChange={(e) => {
                    if (e.target.checked) {
                      onSelectionChange(configurations.map(c => c.id));
                    } else {
                      onSelectionChange([]);
                    }
                  }}
                  className="rounded border-border"
                />
              </th>
              <th className="text-left px-4 py-3">
                <button
                  onClick={() => handleSort('name')}
                  className="flex items-center space-x-2 text-sm font-heading font-medium text-text-primary hover:text-primary transition-micro"
                >
                  <span>Parameter Name</span>
                  <Icon
                    name={sortField === 'name' ? (sortDirection === 'asc' ? 'ChevronUp' : 'ChevronDown') : 'ChevronsUpDown'}
                    size={16}
                  />
                </button>
              </th>
              <th className="text-left px-4 py-3">
                <button
                  onClick={() => handleSort('currentValue')}
                  className="flex items-center space-x-2 text-sm font-heading font-medium text-text-primary hover:text-primary transition-micro"
                >
                  <span>Current Value</span>
                  <Icon
                    name={sortField === 'currentValue' ? (sortDirection === 'asc' ? 'ChevronUp' : 'ChevronDown') : 'ChevronsUpDown'}
                    size={16}
                  />
                </button>
              </th>
              <th className="text-left px-4 py-3">
                <span className="text-sm font-heading font-medium text-text-primary">Default Value</span>
              </th>
              <th className="text-left px-4 py-3">
                <button
                  onClick={() => handleSort('lastModified')}
                  className="flex items-center space-x-2 text-sm font-heading font-medium text-text-primary hover:text-primary transition-micro"
                >
                  <span>Last Modified</span>
                  <Icon
                    name={sortField === 'lastModified' ? (sortDirection === 'asc' ? 'ChevronUp' : 'ChevronDown') : 'ChevronsUpDown'}
                    size={16}
                  />
                </button>
              </th>
              <th className="text-left px-4 py-3">
                <span className="text-sm font-heading font-medium text-text-primary">Status</span>
              </th>
              <th className="text-left px-4 py-3">
                <span className="text-sm font-heading font-medium text-text-primary">Impact</span>
              </th>
              <th className="text-right px-4 py-3">
                <span className="text-sm font-heading font-medium text-text-primary">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {sortedConfigurations.map((config) => (
              <tr key={config.id} className="hover:bg-background transition-micro">
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(config.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        onSelectionChange([...selectedItems, config.id]);
                      } else {
                        onSelectionChange(selectedItems.filter(id => id !== config.id));
                      }
                    }}
                    className="rounded border-border"
                  />
                </td>
                <td className="px-4 py-3">
                  <div>
                    <p className="text-sm font-heading font-medium text-text-primary">
                      {config.name}
                    </p>
                    <p className="text-xs text-text-secondary font-caption">
                      {config.category}
                    </p>
                  </div>
                </td>
                <td className="px-4 py-3">
                  {editingId === config.id ? (
                    <div className="flex items-center space-x-2">
                      <Input
                        type="text"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        className="w-32"
                      />
                      <Button
                        variant="success"
                        size="xs"
                        iconName="Check"
                        onClick={() => handleSave(config)}
                      />
                      <Button
                        variant="ghost"
                        size="xs"
                        iconName="X"
                        onClick={handleCancel}
                      />
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <code className="text-sm font-data bg-secondary-100 px-2 py-1 rounded">
                        {config.currentValue}
                      </code>
                      {config.isModified && (
                        <Icon name="AlertCircle" size={14} className="text-warning" />
                      )}
                    </div>
                  )}
                </td>
                <td className="px-4 py-3">
                  <code className="text-sm font-data text-text-secondary">
                    {config.defaultValue}
                  </code>
                </td>
                <td className="px-4 py-3">
                  <div>
                    <p className="text-sm text-text-primary">
                      {config.lastModified}
                    </p>
                    <p className="text-xs text-text-secondary font-caption">
                      by {config.modifiedBy}
                    </p>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-caption ${getStatusColor(config.status)}`}>
                    {config.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-caption ${getImpactColor(config.impact)}`}>
                    {config.impact}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end space-x-1">
                    <Button
                      variant="ghost"
                      size="xs"
                      iconName="Edit"
                      onClick={() => handleEdit(config)}
                      disabled={!config.canEdit}
                    />
                    <Button
                      variant="ghost"
                      size="xs"
                      iconName="RotateCcw"
                      onClick={() => onUpdate(config.id, config.defaultValue)}
                      disabled={config.currentValue === config.defaultValue}
                    />
                    <Button
                      variant="ghost"
                      size="xs"
                      iconName="History"
                      onClick={() => console.log('View history for', config.id)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ConfigurationTable;