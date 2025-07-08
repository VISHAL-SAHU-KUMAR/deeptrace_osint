import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ChangeManagement = ({ changes, onApprove, onReject, onRollback }) => {
  const [selectedChange, setSelectedChange] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredChanges = changes.filter(change => {
    const matchesStatus = filterStatus === 'all' || change.status === filterStatus;
    const matchesSearch = change.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         change.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'text-warning bg-warning-50';
      case 'approved':
        return 'text-success bg-success-50';
      case 'rejected':
        return 'text-error bg-error-50';
      case 'deployed':
        return 'text-primary bg-primary-50';
      case 'rolled_back':
        return 'text-text-secondary bg-secondary-100';
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

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'urgent':
        return 'AlertTriangle';
      case 'high':
        return 'ArrowUp';
      case 'medium':
        return 'Minus';
      case 'low':
        return 'ArrowDown';
      default:
        return 'Circle';
    }
  };

  return (
    <div className="space-y-6">
      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            type="search"
            placeholder="Search changes by title or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="flex items-center space-x-2">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-border rounded-lg text-sm font-body bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
            <option value="deployed">Deployed</option>
            <option value="rolled_back">Rolled Back</option>
          </select>
        </div>
      </div>

      {/* Changes List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-heading font-semibold text-text-primary">
            Change Requests ({filteredChanges.length})
          </h3>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {filteredChanges.map((change) => (
              <div
                key={change.id}
                className={`bg-surface border rounded-lg p-4 cursor-pointer transition-micro hover-lift ${
                  selectedChange?.id === change.id ? 'border-primary' : 'border-border'
                }`}
                onClick={() => setSelectedChange(change)}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Icon
                      name={getPriorityIcon(change.priority)}
                      size={16}
                      className={
                        change.priority === 'urgent' ? 'text-error' :
                        change.priority === 'high' ? 'text-warning' :
                        change.priority === 'medium' ? 'text-accent' : 'text-success'
                      }
                    />
                    <h4 className="text-sm font-heading font-medium text-text-primary">
                      {change.title}
                    </h4>
                  </div>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-caption ${getStatusColor(change.status)}`}>
                    {change.status}
                  </span>
                </div>

                <p className="text-sm text-text-secondary font-caption mb-3 line-clamp-2">
                  {change.description}
                </p>

                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-3">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full font-caption ${getImpactColor(change.impact)}`}>
                      {change.impact}
                    </span>
                    <span className="text-text-secondary font-caption">
                      by {change.requestedBy}
                    </span>
                  </div>
                  <span className="text-text-secondary font-caption">
                    {change.requestedDate}
                  </span>
                </div>

                {change.status === 'pending' && (
                  <div className="flex items-center space-x-2 mt-3 pt-3 border-t border-border">
                    <Button
                      variant="success"
                      size="xs"
                      iconName="Check"
                      onClick={(e) => {
                        e.stopPropagation();
                        onApprove(change.id);
                      }}
                    >
                      Approve
                    </Button>
                    <Button
                      variant="danger"
                      size="xs"
                      iconName="X"
                      onClick={(e) => {
                        e.stopPropagation();
                        onReject(change.id);
                      }}
                    >
                      Reject
                    </Button>
                  </div>
                )}

                {change.status === 'deployed' && change.canRollback && (
                  <div className="flex items-center space-x-2 mt-3 pt-3 border-t border-border">
                    <Button
                      variant="warning"
                      size="xs"
                      iconName="RotateCcw"
                      onClick={(e) => {
                        e.stopPropagation();
                        onRollback(change.id);
                      }}
                    >
                      Rollback
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Change Details */}
        <div>
          {selectedChange ? (
            <div className="bg-surface border border-border rounded-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <Icon
                      name={getPriorityIcon(selectedChange.priority)}
                      size={20}
                      className={
                        selectedChange.priority === 'urgent' ? 'text-error' :
                        selectedChange.priority === 'high' ? 'text-warning' :
                        selectedChange.priority === 'medium' ? 'text-accent' : 'text-success'
                      }
                    />
                    <h3 className="text-lg font-heading font-semibold text-text-primary">
                      {selectedChange.title}
                    </h3>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-caption ${getStatusColor(selectedChange.status)}`}>
                      {selectedChange.status}
                    </span>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-caption ${getImpactColor(selectedChange.impact)}`}>
                      {selectedChange.impact} impact
                    </span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="X"
                  onClick={() => setSelectedChange(null)}
                />
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-heading font-medium text-text-primary mb-2">
                    Description
                  </h4>
                  <p className="text-sm text-text-secondary font-caption">
                    {selectedChange.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-heading font-medium text-text-primary mb-2">
                      Request Details
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-text-secondary font-caption">Requested by</span>
                        <span className="text-text-primary">{selectedChange.requestedBy}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-secondary font-caption">Date</span>
                        <span className="text-text-primary">{selectedChange.requestedDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-secondary font-caption">Priority</span>
                        <span className="text-text-primary">{selectedChange.priority}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-secondary font-caption">Category</span>
                        <span className="text-text-primary">{selectedChange.category}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-heading font-medium text-text-primary mb-2">
                      Implementation
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-text-secondary font-caption">Scheduled</span>
                        <span className="text-text-primary">{selectedChange.scheduledDate || 'TBD'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-secondary font-caption">Duration</span>
                        <span className="text-text-primary">{selectedChange.estimatedDuration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-secondary font-caption">Downtime</span>
                        <span className="text-text-primary">{selectedChange.downtime || 'None'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-secondary font-caption">Rollback</span>
                        <span className="text-text-primary">{selectedChange.canRollback ? 'Yes' : 'No'}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {selectedChange.affectedSystems && (
                  <div>
                    <h4 className="text-sm font-heading font-medium text-text-primary mb-2">
                      Affected Systems
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedChange.affectedSystems.map((system, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2 py-1 bg-secondary-100 text-text-primary rounded text-xs font-caption"
                        >
                          {system}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {selectedChange.approvals && (
                  <div>
                    <h4 className="text-sm font-heading font-medium text-text-primary mb-2">
                      Approvals
                    </h4>
                    <div className="space-y-2">
                      {selectedChange.approvals.map((approval, index) => (
                        <div key={index} className="flex items-center justify-between text-sm">
                          <div className="flex items-center space-x-2">
                            <Icon
                              name={approval.status === 'approved' ? 'CheckCircle' : 
                                   approval.status === 'rejected' ? 'XCircle' : 'Clock'}
                              size={14}
                              className={approval.status === 'approved' ? 'text-success' : 
                                        approval.status === 'rejected' ? 'text-error' : 'text-warning'}
                            />
                            <span className="text-text-primary">{approval.approver}</span>
                          </div>
                          <div className="text-right">
                            <p className="text-text-primary">{approval.status}</p>
                            <p className="text-xs text-text-secondary font-caption">{approval.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {selectedChange.comments && selectedChange.comments.length > 0 && (
                  <div>
                    <h4 className="text-sm font-heading font-medium text-text-primary mb-2">
                      Comments
                    </h4>
                    <div className="space-y-3 max-h-32 overflow-y-auto">
                      {selectedChange.comments.map((comment, index) => (
                        <div key={index} className="bg-background rounded-lg p-3">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-heading font-medium text-text-primary">
                              {comment.author}
                            </span>
                            <span className="text-xs text-text-secondary font-caption">
                              {comment.date}
                            </span>
                          </div>
                          <p className="text-sm text-text-secondary font-caption">
                            {comment.message}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-surface border border-border rounded-lg p-6 text-center">
              <Icon name="FileText" size={48} className="text-text-tertiary mx-auto mb-4" />
              <h3 className="text-lg font-heading font-medium text-text-primary mb-2">
                Select a Change Request
              </h3>
              <p className="text-sm text-text-secondary font-caption">
                Choose a change request from the list to view detailed information and manage approvals.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChangeManagement;