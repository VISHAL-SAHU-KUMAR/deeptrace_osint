import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const SecurityPolicies = ({ policies, onUpdate, onToggle }) => {
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [editingPolicy, setEditingPolicy] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  const filteredPolicies = policies.filter(policy => {
    const matchesSearch = policy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         policy.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || policy.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const getSeverityColor = (severity) => {
    switch (severity) {
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

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'text-success bg-success-50';
      case 'inactive':
        return 'text-text-secondary bg-secondary-100';
      case 'pending':
        return 'text-warning bg-warning-50';
      default:
        return 'text-text-secondary bg-secondary-100';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'authentication':
        return 'Key';
      case 'authorization':
        return 'Shield';
      case 'encryption':
        return 'Lock';
      case 'audit':
        return 'FileSearch';
      case 'network':
        return 'Wifi';
      case 'data':
        return 'Database';
      default:
        return 'Settings';
    }
  };

  const handleEdit = (policy) => {
    setEditingPolicy({ ...policy });
  };

  const handleSave = () => {
    onUpdate(editingPolicy.id, editingPolicy);
    setEditingPolicy(null);
    if (selectedPolicy?.id === editingPolicy.id) {
      setSelectedPolicy(editingPolicy);
    }
  };

  const handleCancel = () => {
    setEditingPolicy(null);
  };

  return (
    <div className="space-y-6">
      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            type="search"
            placeholder="Search security policies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="flex items-center space-x-2">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-3 py-2 border border-border rounded-lg text-sm font-body bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="all">All Categories</option>
            <option value="authentication">Authentication</option>
            <option value="authorization">Authorization</option>
            <option value="encryption">Encryption</option>
            <option value="audit">Audit</option>
            <option value="network">Network</option>
            <option value="data">Data Protection</option>
          </select>
        </div>
      </div>

      {/* Policies Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-heading font-semibold text-text-primary">
            Security Policies ({filteredPolicies.length})
          </h3>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {filteredPolicies.map((policy) => (
              <div
                key={policy.id}
                className={`bg-surface border rounded-lg p-4 cursor-pointer transition-micro hover-lift ${
                  selectedPolicy?.id === policy.id ? 'border-primary' : 'border-border'
                }`}
                onClick={() => setSelectedPolicy(policy)}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                      <Icon
                        name={getCategoryIcon(policy.category)}
                        size={16}
                        className="text-primary"
                      />
                    </div>
                    <div>
                      <h4 className="text-sm font-heading font-medium text-text-primary">
                        {policy.name}
                      </h4>
                      <p className="text-xs text-text-secondary font-caption">
                        {policy.category}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-caption ${getSeverityColor(policy.severity)}`}>
                      {policy.severity}
                    </span>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-caption ${getStatusColor(policy.status)}`}>
                      {policy.status}
                    </span>
                  </div>
                </div>

                <p className="text-sm text-text-secondary font-caption mb-3 line-clamp-2">
                  {policy.description}
                </p>

                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-3">
                    <span className="text-text-secondary font-caption">
                      Compliance: {policy.compliance.join(', ')}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="xs"
                      iconName="Edit"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(policy);
                      }}
                    />
                    <Button
                      variant={policy.status === 'active' ? 'warning' : 'success'}
                      size="xs"
                      iconName={policy.status === 'active' ? 'Pause' : 'Play'}
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggle(policy.id);
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Policy Details */}
        <div>
          {selectedPolicy ? (
            <div className="bg-surface border border-border rounded-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                    <Icon
                      name={getCategoryIcon(selectedPolicy.category)}
                      size={24}
                      className="text-primary"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-heading font-semibold text-text-primary">
                      {selectedPolicy.name}
                    </h3>
                    <p className="text-sm text-text-secondary font-caption">
                      {selectedPolicy.category} • Last updated {selectedPolicy.lastUpdated}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="X"
                  onClick={() => setSelectedPolicy(null)}
                />
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-heading font-medium text-text-primary mb-2">
                    Description
                  </h4>
                  <p className="text-sm text-text-secondary font-caption">
                    {selectedPolicy.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-heading font-medium text-text-primary mb-2">
                      Policy Details
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-text-secondary font-caption">Status</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-caption ${getStatusColor(selectedPolicy.status)}`}>
                          {selectedPolicy.status}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-secondary font-caption">Severity</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-caption ${getSeverityColor(selectedPolicy.severity)}`}>
                          {selectedPolicy.severity}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-secondary font-caption">Enforcement</span>
                        <span className="text-text-primary">{selectedPolicy.enforcement}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-secondary font-caption">Auto-remediation</span>
                        <span className="text-text-primary">{selectedPolicy.autoRemediation ? 'Enabled' : 'Disabled'}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-heading font-medium text-text-primary mb-2">
                      Compliance
                    </h4>
                    <div className="space-y-2">
                      {selectedPolicy.compliance.map((standard, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <Icon name="CheckCircle" size={14} className="text-success" />
                          <span className="text-sm text-text-primary">{standard}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {selectedPolicy.rules && (
                  <div>
                    <h4 className="text-sm font-heading font-medium text-text-primary mb-2">
                      Policy Rules
                    </h4>
                    <div className="space-y-2 max-h-32 overflow-y-auto">
                      {selectedPolicy.rules.map((rule, index) => (
                        <div key={index} className="bg-background rounded-lg p-3">
                          <div className="flex items-start justify-between">
                            <div>
                              <p className="text-sm font-heading font-medium text-text-primary">
                                {rule.name}
                              </p>
                              <p className="text-xs text-text-secondary font-caption">
                                {rule.description}
                              </p>
                            </div>
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-caption ${
                              rule.enabled ? 'text-success bg-success-50' : 'text-text-secondary bg-secondary-100'
                            }`}>
                              {rule.enabled ? 'Active' : 'Inactive'}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {selectedPolicy.violations && selectedPolicy.violations.length > 0 && (
                  <div>
                    <h4 className="text-sm font-heading font-medium text-text-primary mb-2">
                      Recent Violations
                    </h4>
                    <div className="space-y-2 max-h-32 overflow-y-auto">
                      {selectedPolicy.violations.map((violation, index) => (
                        <div key={index} className="flex items-start space-x-3 p-3 bg-error-50 rounded-lg">
                          <Icon name="AlertTriangle" size={14} className="text-error mt-0.5" />
                          <div className="flex-1">
                            <p className="text-sm font-heading font-medium text-text-primary">
                              {violation.type}
                            </p>
                            <p className="text-xs text-text-secondary font-caption">
                              {violation.description}
                            </p>
                            <p className="text-xs text-text-tertiary font-caption mt-1">
                              {violation.timestamp} • User: {violation.user}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex items-center space-x-2 pt-4 border-t border-border">
                  <Button
                    variant="primary"
                    size="sm"
                    iconName="Edit"
                    onClick={() => handleEdit(selectedPolicy)}
                  >
                    Edit Policy
                  </Button>
                  <Button
                    variant={selectedPolicy.status === 'active' ? 'warning' : 'success'}
                    size="sm"
                    iconName={selectedPolicy.status === 'active' ? 'Pause' : 'Play'}
                    onClick={() => onToggle(selectedPolicy.id)}
                  >
                    {selectedPolicy.status === 'active' ? 'Deactivate' : 'Activate'}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="Download"
                    onClick={() => console.log('Export policy', selectedPolicy.id)}
                  >
                    Export
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-surface border border-border rounded-lg p-6 text-center">
              <Icon name="Shield" size={48} className="text-text-tertiary mx-auto mb-4" />
              <h3 className="text-lg font-heading font-medium text-text-primary mb-2">
                Select a Security Policy
              </h3>
              <p className="text-sm text-text-secondary font-caption">
                Choose a security policy from the list to view detailed information and manage settings.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Edit Policy Modal */}
      {editingPolicy && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-surface rounded-lg p-6 w-full max-w-2xl max-h-96 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-heading font-semibold text-text-primary">
                Edit Security Policy
              </h3>
              <Button
                variant="ghost"
                size="sm"
                iconName="X"
                onClick={handleCancel}
              />
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-heading font-medium text-text-primary mb-2">
                  Policy Name
                </label>
                <Input
                  type="text"
                  value={editingPolicy.name}
                  onChange={(e) => setEditingPolicy({ ...editingPolicy, name: e.target.value })}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-heading font-medium text-text-primary mb-2">
                  Description
                </label>
                <textarea
                  value={editingPolicy.description}
                  onChange={(e) => setEditingPolicy({ ...editingPolicy, description: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-border rounded-lg text-sm font-body bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-heading font-medium text-text-primary mb-2">
                    Severity
                  </label>
                  <select
                    value={editingPolicy.severity}
                    onChange={(e) => setEditingPolicy({ ...editingPolicy, severity: e.target.value })}
                    className="w-full px-3 py-2 border border-border rounded-lg text-sm font-body bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-heading font-medium text-text-primary mb-2">
                    Enforcement
                  </label>
                  <select
                    value={editingPolicy.enforcement}
                    onChange={(e) => setEditingPolicy({ ...editingPolicy, enforcement: e.target.value })}
                    className="w-full px-3 py-2 border border-border rounded-lg text-sm font-body bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="monitor">Monitor Only</option>
                    <option value="warn">Warn</option>
                    <option value="block">Block</option>
                    <option value="quarantine">Quarantine</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="autoRemediation"
                  checked={editingPolicy.autoRemediation}
                  onChange={(e) => setEditingPolicy({ ...editingPolicy, autoRemediation: e.target.checked })}
                  className="rounded border-border"
                />
                <label htmlFor="autoRemediation" className="text-sm font-heading font-medium text-text-primary">
                  Enable Auto-remediation
                </label>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-2 mt-6 pt-4 border-t border-border">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCancel}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={handleSave}
              >
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SecurityPolicies;