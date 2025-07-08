import React, { useState } from 'react';

import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const CaseHeader = ({ caseData, onUpdateCase }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(caseData);

  const handleSave = () => {
    onUpdateCase(editedData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedData(caseData);
    setIsEditing(false);
  };

  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case 'critical':
        return 'bg-error text-error-foreground';
      case 'high':
        return 'bg-warning text-warning-foreground';
      case 'medium':
        return 'bg-accent text-accent-foreground';
      case 'low':
        return 'bg-secondary-200 text-secondary-800';
      default:
        return 'bg-secondary-200 text-secondary-800';
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-success text-success-foreground';
      case 'pending':
        return 'bg-warning text-warning-foreground';
      case 'closed':
        return 'bg-secondary-400 text-secondary-foreground';
      case 'archived':
        return 'bg-secondary-300 text-secondary-800';
      default:
        return 'bg-secondary-200 text-secondary-800';
    }
  };

  return (
    <div className="bg-surface border-b border-border p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          {isEditing ? (
            <div className="space-y-3">
              <input
                type="text"
                value={editedData.title}
                onChange={(e) => setEditedData({ ...editedData, title: e.target.value })}
                className="text-xl font-heading font-semibold bg-background border border-border rounded-lg px-3 py-2 w-full max-w-2xl"
              />
              <textarea
                value={editedData.description}
                onChange={(e) => setEditedData({ ...editedData, description: e.target.value })}
                className="text-sm text-text-secondary bg-background border border-border rounded-lg px-3 py-2 w-full max-w-3xl h-20 resize-none"
                placeholder="Case description..."
              />
            </div>
          ) : (
            <div>
              <h1 className="text-xl font-heading font-semibold text-text-primary mb-2">
                {caseData.title}
              </h1>
              <p className="text-sm text-text-secondary max-w-3xl">
                {caseData.description}
              </p>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-3">
          {isEditing ? (
            <>
              <Button variant="success" size="sm" onClick={handleSave}>
                Save Changes
              </Button>
              <Button variant="ghost" size="sm" onClick={handleCancel}>
                Cancel
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="ghost"
                size="sm"
                iconName="Edit"
                onClick={() => setIsEditing(true)}
              >
                Edit Case
              </Button>
              <Button variant="ghost" size="sm" iconName="Share">
                Share
              </Button>
              <Button variant="ghost" size="sm" iconName="MoreHorizontal" />
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Case Details */}
        <div className="lg:col-span-2">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-heading font-medium text-text-secondary uppercase tracking-wider">
                Case ID
              </label>
              <p className="text-sm font-data text-text-primary mt-1">
                {caseData.id}
              </p>
            </div>
            <div>
              <label className="text-xs font-heading font-medium text-text-secondary uppercase tracking-wider">
                Created Date
              </label>
              <p className="text-sm text-text-primary mt-1">
                {new Date(caseData.createdDate).toLocaleDateString()}
              </p>
            </div>
            <div>
              <label className="text-xs font-heading font-medium text-text-secondary uppercase tracking-wider">
                Priority
              </label>
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-1 ${getPriorityColor(caseData.priority)}`}>
                {caseData.priority}
              </span>
            </div>
            <div>
              <label className="text-xs font-heading font-medium text-text-secondary uppercase tracking-wider">
                Status
              </label>
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-1 ${getStatusColor(caseData.status)}`}>
                <div className="w-1.5 h-1.5 bg-current rounded-full mr-1.5" />
                {caseData.status}
              </span>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div>
          <label className="text-xs font-heading font-medium text-text-secondary uppercase tracking-wider mb-2 block">
            Investigation Timeline
          </label>
          <div className="space-y-2">
            <div className="flex items-center text-xs">
              <div className="w-2 h-2 bg-success rounded-full mr-2" />
              <span className="text-text-secondary">Started: {new Date(caseData.createdDate).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center text-xs">
              <div className="w-2 h-2 bg-warning rounded-full mr-2" />
              <span className="text-text-secondary">Last Update: {new Date(caseData.lastUpdated).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center text-xs">
              <div className="w-2 h-2 bg-secondary-300 rounded-full mr-2" />
              <span className="text-text-secondary">Due: {new Date(caseData.dueDate).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        {/* Team Members */}
        <div>
          <label className="text-xs font-heading font-medium text-text-secondary uppercase tracking-wider mb-2 block">
            Team Members
          </label>
          <div className="flex items-center space-x-2">
            {caseData.teamMembers.slice(0, 4).map((member, index) => (
              <div key={member.id} className="relative group">
                <Image
                  src={member.avatar}
                  alt={member.name}
                  className="w-8 h-8 rounded-full border-2 border-surface"
                />
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-secondary-800 text-secondary-foreground text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                  {member.name}
                </div>
              </div>
            ))}
            {caseData.teamMembers.length > 4 && (
              <div className="w-8 h-8 bg-secondary-200 rounded-full flex items-center justify-center text-xs font-medium text-text-secondary">
                +{caseData.teamMembers.length - 4}
              </div>
            )}
            <Button
              variant="ghost"
              size="sm"
              iconName="Plus"
              className="w-8 h-8 rounded-full"
            />
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-4 border-t border-border">
        <div className="text-center">
          <div className="text-lg font-heading font-semibold text-text-primary">
            {caseData.stats.evidenceCount}
          </div>
          <div className="text-xs text-text-secondary">Evidence Items</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-heading font-semibold text-text-primary">
            {caseData.stats.sourcesCount}
          </div>
          <div className="text-xs text-text-secondary">Data Sources</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-heading font-semibold text-text-primary">
            {caseData.stats.analysisCount}
          </div>
          <div className="text-xs text-text-secondary">Analysis Reports</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-heading font-semibold text-text-primary">
            {caseData.stats.completionPercentage}%
          </div>
          <div className="text-xs text-text-secondary">Completion</div>
        </div>
      </div>
    </div>
  );
};

export default CaseHeader;