import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const AnalysisPanel = ({ selectedEvidence, caseNotes, onNotesUpdate, onRelationshipAdd }) => {
  const [activeTab, setActiveTab] = useState('notes'); // notes, relationships, insights
  const [newNote, setNewNote] = useState('');
  const [noteCategory, setNoteCategory] = useState('general');
  const [relationshipType, setRelationshipType] = useState('');
  const [relationshipTarget, setRelationshipTarget] = useState('');
  const textareaRef = useRef(null);

  const handleAddNote = () => {
    if (newNote.trim()) {
      const note = {
        id: Date.now(),
        content: newNote,
        category: noteCategory,
        timestamp: new Date(),
        author: 'Current User',
        evidenceId: selectedEvidence?.id || null
      };
      
      onNotesUpdate([...caseNotes, note]);
      setNewNote('');
    }
  };

  const handleAddRelationship = () => {
    if (relationshipType && relationshipTarget && selectedEvidence) {
      const relationship = {
        id: Date.now(),
        sourceId: selectedEvidence.id,
        targetId: relationshipTarget,
        type: relationshipType,
        timestamp: new Date(),
        author: 'Current User'
      };
      
      onRelationshipAdd(relationship);
      setRelationshipType('');
      setRelationshipTarget('');
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      general: 'bg-secondary-100 text-secondary-800',
      important: 'bg-warning-100 text-warning-800',
      critical: 'bg-error-100 text-error-800',
      hypothesis: 'bg-primary-100 text-primary-800',
      question: 'bg-accent-100 text-accent-800'
    };
    return colors[category] || colors.general;
  };

  const getCategoryIcon = (category) => {
    const icons = {
      general: 'FileText',
      important: 'AlertTriangle',
      critical: 'AlertCircle',
      hypothesis: 'Lightbulb',
      question: 'HelpCircle'
    };
    return icons[category] || 'FileText';
  };

  const mockRelationships = [
    {
      id: 1,
      sourceId: 'evidence_1',
      targetId: 'evidence_2',
      type: 'connected_to',
      description: 'Same IP address found in both sources',
      timestamp: new Date(Date.now() - 3600000)
    },
    {
      id: 2,
      sourceId: 'evidence_1',
      targetId: 'evidence_3',
      type: 'references',
      description: 'Email address mentioned in social media post',
      timestamp: new Date(Date.now() - 7200000)
    }
  ];

  const mockInsights = [
    {
      id: 1,
      type: 'pattern',
      title: 'Communication Pattern Detected',
      description: 'Regular communication pattern identified between 9 AM - 5 PM EST',
      confidence: 85,
      evidenceCount: 12,
      timestamp: new Date(Date.now() - 1800000)
    },
    {
      id: 2,
      type: 'anomaly',
      title: 'Unusual Activity Spike',
      description: 'Significant increase in activity detected on 2024-01-15',
      confidence: 92,
      evidenceCount: 8,
      timestamp: new Date(Date.now() - 3600000)
    },
    {
      id: 3,
      type: 'correlation',
      title: 'Geographic Correlation',
      description: 'Multiple evidence items trace to same geographic region',
      confidence: 78,
      evidenceCount: 15,
      timestamp: new Date(Date.now() - 5400000)
    }
  ];

  const renderNotesTab = () => (
    <div className="space-y-4">
      {/* Add Note Form */}
      <div className="bg-background rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-heading font-medium text-text-primary">
            Add Analysis Note
          </h4>
          <select
            value={noteCategory}
            onChange={(e) => setNoteCategory(e.target.value)}
            className="text-xs border border-border rounded px-2 py-1"
          >
            <option value="general">General</option>
            <option value="important">Important</option>
            <option value="critical">Critical</option>
            <option value="hypothesis">Hypothesis</option>
            <option value="question">Question</option>
          </select>
        </div>
        
        <textarea
          ref={textareaRef}
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Add your analysis notes, observations, or questions..."
          className="w-full h-20 text-sm border border-border rounded-lg p-3 resize-none"
        />
        
        <div className="flex justify-between items-center mt-3">
          <div className="text-xs text-text-secondary">
            {selectedEvidence ? `Note for: ${selectedEvidence.name}` : 'General case note'}
          </div>
          <Button
            variant="primary"
            size="sm"
            onClick={handleAddNote}
            disabled={!newNote.trim()}
          >
            Add Note
          </Button>
        </div>
      </div>

      {/* Notes List */}
      <div className="space-y-3">
        {caseNotes.map((note) => (
          <div key={note.id} className="bg-surface border border-border rounded-lg p-4">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center space-x-2">
                <Icon
                  name={getCategoryIcon(note.category)}
                  size={14}
                  className="text-text-secondary"
                />
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(note.category)}`}>
                  {note.category}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-text-secondary">
                  {new Date(note.timestamp).toLocaleString()}
                </span>
                <Button variant="ghost" size="xs" iconName="MoreHorizontal" />
              </div>
            </div>
            
            <p className="text-sm text-text-primary mb-2 whitespace-pre-wrap">
              {note.content}
            </p>
            
            {note.evidenceId && (
              <div className="text-xs text-text-secondary">
                <Icon name="Link" size={12} className="inline mr-1" />
                Linked to evidence
              </div>
            )}
          </div>
        ))}
        
        {caseNotes.length === 0 && (
          <div className="text-center py-8">
            <Icon name="FileText" size={32} className="text-text-tertiary mx-auto mb-2" />
            <p className="text-sm text-text-secondary">
              No analysis notes yet. Add your first note above.
            </p>
          </div>
        )}
      </div>
    </div>
  );

  const renderRelationshipsTab = () => (
    <div className="space-y-4">
      {/* Add Relationship Form */}
      {selectedEvidence && (
        <div className="bg-background rounded-lg p-4">
          <h4 className="text-sm font-heading font-medium text-text-primary mb-3">
            Add Relationship
          </h4>
          
          <div className="space-y-3">
            <div>
              <label className="text-xs font-medium text-text-secondary">
                Relationship Type
              </label>
              <select
                value={relationshipType}
                onChange={(e) => setRelationshipType(e.target.value)}
                className="w-full text-sm border border-border rounded-lg p-2 mt-1"
              >
                <option value="">Select type...</option>
                <option value="connected_to">Connected To</option>
                <option value="references">References</option>
                <option value="similar_to">Similar To</option>
                <option value="contradicts">Contradicts</option>
                <option value="supports">Supports</option>
                <option value="derived_from">Derived From</option>
              </select>
            </div>
            
            <div>
              <label className="text-xs font-medium text-text-secondary">
                Target Evidence
              </label>
              <Input
                type="text"
                value={relationshipTarget}
                onChange={(e) => setRelationshipTarget(e.target.value)}
                placeholder="Enter target evidence ID or name..."
                className="mt-1"
              />
            </div>
            
            <Button
              variant="primary"
              size="sm"
              onClick={handleAddRelationship}
              disabled={!relationshipType || !relationshipTarget}
              fullWidth
            >
              Add Relationship
            </Button>
          </div>
        </div>
      )}

      {/* Relationships List */}
      <div className="space-y-3">
        <h4 className="text-sm font-heading font-medium text-text-primary">
          Evidence Relationships
        </h4>
        
        {mockRelationships.map((relationship) => (
          <div key={relationship.id} className="bg-surface border border-border rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <Icon name="GitBranch" size={14} className="text-primary" />
                <span className="text-sm font-medium text-text-primary">
                  {relationship.type.replace('_', ' ')}
                </span>
              </div>
              <span className="text-xs text-text-secondary">
                {new Date(relationship.timestamp).toLocaleString()}
              </span>
            </div>
            
            <p className="text-sm text-text-secondary mb-2">
              {relationship.description}
            </p>
            
            <div className="flex items-center justify-between text-xs text-text-tertiary">
              <span>
                {relationship.sourceId} → {relationship.targetId}
              </span>
              <Button variant="ghost" size="xs" iconName="ExternalLink">
                View
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderInsightsTab = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-heading font-medium text-text-primary">
          AI-Generated Insights
        </h4>
        <Button variant="ghost" size="xs" iconName="RefreshCw">
          Refresh
        </Button>
      </div>
      
      <div className="space-y-3">
        {mockInsights.map((insight) => (
          <div key={insight.id} className="bg-surface border border-border rounded-lg p-4">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center space-x-2">
                <Icon
                  name={insight.type === 'pattern' ? 'TrendingUp' : 
                        insight.type === 'anomaly' ? 'AlertTriangle' : 'GitMerge'}
                  size={14}
                  className="text-primary"
                />
                <span className="text-sm font-medium text-text-primary">
                  {insight.title}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-success rounded-full" />
                  <span className="text-xs text-text-secondary">
                    {insight.confidence}%
                  </span>
                </div>
                <Button variant="ghost" size="xs" iconName="MoreHorizontal" />
              </div>
            </div>
            
            <p className="text-sm text-text-secondary mb-3">
              {insight.description}
            </p>
            
            <div className="flex items-center justify-between text-xs text-text-tertiary">
              <span>
                Based on {insight.evidenceCount} evidence items
              </span>
              <span>
                {new Date(insight.timestamp).toLocaleString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="w-80 bg-surface border-l border-border flex flex-col">
      {/* Panel Header */}
      <div className="p-4 border-b border-border">
        <h3 className="text-sm font-heading font-semibold text-text-primary mb-3">
          Analysis Panel
        </h3>
        
        {/* Tab Navigation */}
        <div className="flex items-center space-x-1 bg-background rounded-lg p-1">
          <Button
            variant={activeTab === 'notes' ? 'primary' : 'ghost'}
            size="xs"
            iconName="FileText"
            onClick={() => setActiveTab('notes')}
            className="flex-1"
          >
            Notes
          </Button>
          <Button
            variant={activeTab === 'relationships' ? 'primary' : 'ghost'}
            size="xs"
            iconName="GitBranch"
            onClick={() => setActiveTab('relationships')}
            className="flex-1"
          >
            Links
          </Button>
          <Button
            variant={activeTab === 'insights' ? 'primary' : 'ghost'}
            size="xs"
            iconName="Brain"
            onClick={() => setActiveTab('insights')}
            className="flex-1"
          >
            AI
          </Button>
        </div>
      </div>

      {/* Panel Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'notes' && renderNotesTab()}
        {activeTab === 'relationships' && renderRelationshipsTab()}
        {activeTab === 'insights' && renderInsightsTab()}
      </div>

      {/* Panel Footer */}
      <div className="p-4 border-t border-border">
        <div className="text-xs text-text-secondary text-center">
          {activeTab === 'notes' && `${caseNotes.length} notes`}
          {activeTab === 'relationships' && `${mockRelationships.length} relationships`}
          {activeTab === 'insights' && `${mockInsights.length} insights`}
        </div>
      </div>
    </div>
  );
};

export default AnalysisPanel;