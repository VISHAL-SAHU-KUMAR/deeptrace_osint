import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const AnalysisSidebar = ({ 
  entities, 
  relationships, 
  notes, 
  onEntityFilter, 
  onNoteAdd, 
  onHypothesisCreate 
}) => {
  const [activeTab, setActiveTab] = useState('entities');
  const [searchTerm, setSearchTerm] = useState('');
  const [newNote, setNewNote] = useState('');
  const [selectedEntities, setSelectedEntities] = useState([]);

  const mockEntities = [
    {
      id: 'ent1',
      type: 'person',
      value: 'John Anderson',
      confidence: 0.95,
      sources: 3,
      relationships: 8,
      lastSeen: '2 hours ago'
    },
    {
      id: 'ent2',
      type: 'email',
      value: 'j.anderson@company.com',
      confidence: 0.98,
      sources: 2,
      relationships: 5,
      lastSeen: '1 hour ago'
    },
    {
      id: 'ent3',
      type: 'phone',
      value: '+1-555-0123',
      confidence: 0.87,
      sources: 1,
      relationships: 3,
      lastSeen: '4 hours ago'
    },
    {
      id: 'ent4',
      type: 'domain',
      value: 'suspicious-site.com',
      confidence: 0.76,
      sources: 4,
      relationships: 12,
      lastSeen: '30 minutes ago'
    },
    {
      id: 'ent5',
      type: 'ip',
      value: '192.168.1.100',
      confidence: 0.92,
      sources: 2,
      relationships: 6,
      lastSeen: '1 hour ago'
    }
  ];

  const mockRelationships = [
    {
      id: 'rel1',
      source: 'John Anderson',
      target: 'j.anderson@company.com',
      type: 'owns',
      confidence: 0.95,
      evidence: 'Email signature analysis'
    },
    {
      id: 'rel2',
      source: 'j.anderson@company.com',
      target: 'suspicious-site.com',
      type: 'communicates',
      confidence: 0.78,
      evidence: 'Email traffic analysis'
    },
    {
      id: 'rel3',
      source: 'suspicious-site.com',
      target: '192.168.1.100',
      type: 'resolves',
      confidence: 0.94,
      evidence: 'DNS resolution logs'
    }
  ];

  const mockNotes = [
    {
      id: 'note1',
      content: 'Target shows increased activity during business hours, suggesting professional involvement.',
      timestamp: new Date('2024-01-15T14:30:00'),
      author: 'Analyst Smith',
      tags: ['behavior', 'pattern']
    },
    {
      id: 'note2',
      content: 'Email communication patterns indicate possible coordination with external entities.',
      timestamp: new Date('2024-01-15T16:45:00'),
      author: 'Analyst Johnson',
      tags: ['communication', 'coordination']
    },
    {
      id: 'note3',
      content: 'Geographic analysis shows movement between NYC and Miami, requires further investigation.',
      timestamp: new Date('2024-01-16T09:15:00'),
      author: 'Analyst Davis',
      tags: ['location', 'movement']
    }
  ];

  const tabs = [
    { id: 'entities', label: 'Entities', icon: 'Database', count: mockEntities.length },
    { id: 'relationships', label: 'Relations', icon: 'GitBranch', count: mockRelationships.length },
    { id: 'notes', label: 'Notes', icon: 'FileText', count: mockNotes.length },
    { id: 'hypotheses', label: 'Hypotheses', icon: 'Lightbulb', count: 2 }
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

  const filteredEntities = mockEntities.filter(entity =>
    entity.value.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entity.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEntitySelect = (entityId) => {
    setSelectedEntities(prev => 
      prev.includes(entityId) 
        ? prev.filter(id => id !== entityId)
        : [...prev, entityId]
    );
  };

  const handleAddNote = () => {
    if (newNote.trim()) {
      onNoteAdd({
        content: newNote,
        timestamp: new Date(),
        author: 'Current Analyst',
        tags: []
      });
      setNewNote('');
    }
  };

  const renderEntitiesTab = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Input
          type="search"
          placeholder="Search entities..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full"
        />
        <div className="flex items-center justify-between text-xs text-text-secondary">
          <span>{filteredEntities.length} entities found</span>
          <Button
            variant="ghost"
            size="xs"
            iconName="Filter"
            onClick={() => console.log('Open filter')}
          >
            Filter
          </Button>
        </div>
      </div>

      <div className="space-y-2 max-h-96 overflow-y-auto">
        {filteredEntities.map((entity) => (
          <div
            key={entity.id}
            className={`p-3 border border-border rounded-lg cursor-pointer transition-micro hover:bg-background ${
              selectedEntities.includes(entity.id) ? 'bg-primary-50 border-primary' : ''
            }`}
            onClick={() => handleEntitySelect(entity.id)}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-2 flex-1 min-w-0">
                <Icon
                  name={getEntityIcon(entity.type)}
                  size={16}
                  className={getEntityColor(entity.type)}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-text-primary truncate">
                    {entity.value}
                  </p>
                  <p className="text-xs text-text-secondary capitalize">
                    {entity.type}
                  </p>
                </div>
              </div>
              <div className="text-xs text-text-secondary">
                {Math.round(entity.confidence * 100)}%
              </div>
            </div>
            
            <div className="mt-2 flex items-center justify-between text-xs text-text-secondary">
              <span>{entity.sources} sources</span>
              <span>{entity.relationships} relations</span>
              <span>{entity.lastSeen}</span>
            </div>
          </div>
        ))}
      </div>

      {selectedEntities.length > 0 && (
        <div className="p-3 bg-background rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-text-primary">
              {selectedEntities.length} selected
            </span>
            <Button
              variant="ghost"
              size="xs"
              iconName="X"
              onClick={() => setSelectedEntities([])}
            />
          </div>
          <div className="flex space-x-2">
            <Button variant="primary" size="xs" fullWidth>
              Create Relation
            </Button>
            <Button variant="outline" size="xs" fullWidth>
              Bulk Tag
            </Button>
          </div>
        </div>
      )}
    </div>
  );

  const renderRelationshipsTab = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium text-text-primary">Relationships</h4>
        <Button
          variant="ghost"
          size="xs"
          iconName="Plus"
          onClick={() => console.log('Add relationship')}
        >
          Add
        </Button>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {mockRelationships.map((relationship) => (
          <div key={relationship.id} className="p-3 border border-border rounded-lg">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-text-primary truncate">
                  {relationship.source}
                </span>
                <Icon name="ArrowRight" size={12} className="text-text-secondary" />
                <span className="text-sm font-medium text-text-primary truncate">
                  {relationship.target}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-xs bg-background px-2 py-1 rounded capitalize">
                  {relationship.type}
                </span>
                <span className="text-xs text-text-secondary">
                  {Math.round(relationship.confidence * 100)}%
                </span>
              </div>
              
              <p className="text-xs text-text-secondary">
                {relationship.evidence}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderNotesTab = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <textarea
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Add analytical note..."
          className="w-full p-2 text-sm border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          rows={3}
        />
        <Button
          variant="primary"
          size="sm"
          fullWidth
          onClick={handleAddNote}
          disabled={!newNote.trim()}
        >
          Add Note
        </Button>
      </div>

      <div className="space-y-3 max-h-80 overflow-y-auto">
        {mockNotes.map((note) => (
          <div key={note.id} className="p-3 border border-border rounded-lg">
            <p className="text-sm text-text-primary mb-2">{note.content}</p>
            <div className="flex items-center justify-between text-xs text-text-secondary">
              <span>{note.author}</span>
              <span>{note.timestamp.toLocaleString()}</span>
            </div>
            {note.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {note.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-background text-xs rounded"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderHypothesesTab = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium text-text-primary">Hypotheses</h4>
        <Button
          variant="ghost"
          size="xs"
          iconName="Plus"
          onClick={onHypothesisCreate}
        >
          Create
        </Button>
      </div>

      <div className="space-y-3">
        <div className="p-3 border border-border rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <h5 className="text-sm font-medium text-text-primary">
              Coordinated Activity
            </h5>
            <span className="text-xs bg-warning-100 text-warning-700 px-2 py-1 rounded">
              Testing
            </span>
          </div>
          <p className="text-xs text-text-secondary mb-2">
            Multiple entities show synchronized behavior patterns suggesting coordinated activity.
          </p>
          <div className="flex items-center justify-between text-xs">
            <span className="text-text-secondary">Confidence: 78%</span>
            <span className="text-text-secondary">Evidence: 12 items</span>
          </div>
        </div>

        <div className="p-3 border border-border rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <h5 className="text-sm font-medium text-text-primary">
              Financial Fraud Network
            </h5>
            <span className="text-xs bg-success-100 text-success-700 px-2 py-1 rounded">
              Confirmed
            </span>
          </div>
          <p className="text-xs text-text-secondary mb-2">
            Financial transactions and communication patterns indicate organized fraud network.
          </p>
          <div className="flex items-center justify-between text-xs">
            <span className="text-text-secondary">Confidence: 92%</span>
            <span className="text-text-secondary">Evidence: 28 items</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full h-full bg-surface border-l border-border">
      {/* Sidebar Header */}
      <div className="p-4 border-b border-border">
        <h3 className="text-lg font-semibold text-text-primary">Analysis Panel</h3>
        <p className="text-sm text-text-secondary">Entity extraction and correlation</p>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-border">
        <nav className="flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center space-x-2 px-3 py-3 text-sm font-medium transition-micro ${
                activeTab === tab.id
                  ? 'text-primary border-b-2 border-primary bg-primary-50' :'text-text-secondary hover:text-text-primary hover:bg-background'
              }`}
            >
              <Icon name={tab.icon} size={16} />
              <span className="hidden lg:inline">{tab.label}</span>
              <span className="bg-secondary-200 text-text-secondary px-1.5 py-0.5 rounded-full text-xs">
                {tab.count}
              </span>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="p-4 h-full overflow-hidden">
        {activeTab === 'entities' && renderEntitiesTab()}
        {activeTab === 'relationships' && renderRelationshipsTab()}
        {activeTab === 'notes' && renderNotesTab()}
        {activeTab === 'hypotheses' && renderHypothesesTab()}
      </div>
    </div>
  );
};

export default AnalysisSidebar;