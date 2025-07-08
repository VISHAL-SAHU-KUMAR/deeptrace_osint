import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EvidenceSelector = ({ isOpen, onClose, onEvidenceAdd }) => {
  const [selectedEvidence, setSelectedEvidence] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('relevance');

  const evidenceItems = [
    {
      id: 'ev-001',
      type: 'document',
      title: 'Email Communication Thread',
      description: 'Email exchange between suspect and known associate regarding suspicious activities',
      source: 'Gmail API',
      timestamp: '2024-01-18 14:30:00',
      relevanceScore: 95,
      legalAdmissible: true,
      classification: 'Confidential',
      size: '2.4 MB',
      hash: 'sha256:a1b2c3d4...'
    },
    {
      id: 'ev-002',
      type: 'image',
      title: 'Social Media Profile Screenshot',
      description: 'Facebook profile showing connections to persons of interest',
      source: 'Facebook Graph API',
      timestamp: '2024-01-18 12:15:00',
      relevanceScore: 87,
      legalAdmissible: true,
      classification: 'Restricted',
      size: '1.8 MB',
      hash: 'sha256:e5f6g7h8...'
    },
    {
      id: 'ev-003',
      type: 'network',
      title: 'IP Address Geolocation Data',
      description: 'Geographic location data for suspicious IP addresses',
      source: 'MaxMind GeoIP',
      timestamp: '2024-01-18 10:45:00',
      relevanceScore: 78,
      legalAdmissible: true,
      classification: 'Restricted',
      size: '156 KB',
      hash: 'sha256:i9j0k1l2...'
    },
    {
      id: 'ev-004',
      type: 'financial',
      title: 'Transaction Analysis Report',
      description: 'Cryptocurrency transaction flow analysis showing fund movements',
      source: 'Blockchain Explorer',
      timestamp: '2024-01-18 09:20:00',
      relevanceScore: 92,
      legalAdmissible: false,
      classification: 'Secret',
      size: '3.2 MB',
      hash: 'sha256:m3n4o5p6...'
    },
    {
      id: 'ev-005',
      type: 'communication',
      title: 'Phone Call Metadata',
      description: 'Call detail records showing communication patterns',
      source: 'Telecom Provider',
      timestamp: '2024-01-18 08:10:00',
      relevanceScore: 85,
      legalAdmissible: true,
      classification: 'Confidential',
      size: '892 KB',
      hash: 'sha256:q7r8s9t0...'
    },
    {
      id: 'ev-006',
      type: 'web',
      title: 'Website Archive Snapshot',
      description: 'Archived version of suspicious website before takedown',
      source: 'Wayback Machine',
      timestamp: '2024-01-17 23:45:00',
      relevanceScore: 73,
      legalAdmissible: true,
      classification: 'Restricted',
      size: '5.1 MB',
      hash: 'sha256:u1v2w3x4...'
    }
  ];

  const getTypeIcon = (type) => {
    switch (type) {
      case 'document':
        return 'FileText';
      case 'image':
        return 'Image';
      case 'network':
        return 'Globe';
      case 'financial':
        return 'DollarSign';
      case 'communication':
        return 'Phone';
      case 'web':
        return 'Monitor';
      default:
        return 'File';
    }
  };

  const getClassificationColor = (classification) => {
    switch (classification) {
      case 'Secret':
        return 'text-error';
      case 'Confidential':
        return 'text-warning';
      case 'Restricted':
        return 'text-accent';
      default:
        return 'text-text-secondary';
    }
  };

  const filteredEvidence = evidenceItems
    .filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           item.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = filterType === 'all' || item.type === filterType;
      return matchesSearch && matchesType;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'relevance':
          return b.relevanceScore - a.relevanceScore;
        case 'timestamp':
          return new Date(b.timestamp) - new Date(a.timestamp);
        case 'title':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

  const handleEvidenceToggle = (evidenceId) => {
    setSelectedEvidence(prev =>
      prev.includes(evidenceId)
        ? prev.filter(id => id !== evidenceId)
        : [...prev, evidenceId]
    );
  };

  const handleSelectAll = () => {
    if (selectedEvidence.length === filteredEvidence.length) {
      setSelectedEvidence([]);
    } else {
      setSelectedEvidence(filteredEvidence.map(item => item.id));
    }
  };

  const handleAddSelected = () => {
    const selectedItems = evidenceItems.filter(item => selectedEvidence.includes(item.id));
    onEvidenceAdd(selectedItems);
    setSelectedEvidence([]);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-90">
      <div className="bg-surface rounded-lg shadow-modal w-full max-w-6xl h-5/6 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-heading font-semibold text-text-primary">
              Select Evidence Items
            </h2>
            <Button
              variant="ghost"
              size="sm"
              iconName="X"
              onClick={onClose}
            />
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="relative">
                <Icon
                  name="Search"
                  size={16}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary"
                />
                <input
                  type="text"
                  placeholder="Search evidence..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-4 py-2 bg-background border border-border rounded-lg text-sm font-body placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-micro"
                />
              </div>

              {/* Type Filter */}
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-3 py-2 bg-background border border-border rounded-lg text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-micro"
              >
                <option value="all">All Types</option>
                <option value="document">Documents</option>
                <option value="image">Images</option>
                <option value="network">Network</option>
                <option value="financial">Financial</option>
                <option value="communication">Communication</option>
                <option value="web">Web</option>
              </select>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 bg-background border border-border rounded-lg text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-micro"
              >
                <option value="relevance">Relevance Score</option>
                <option value="timestamp">Timestamp</option>
                <option value="title">Title</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSelectAll}
              >
                {selectedEvidence.length === filteredEvidence.length ? 'Deselect All' : 'Select All'}
              </Button>
              <span className="text-sm text-text-secondary">
                {selectedEvidence.length} of {filteredEvidence.length} selected
              </span>
            </div>
          </div>
        </div>

        {/* Evidence Grid */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filteredEvidence.map((item) => (
              <div
                key={item.id}
                className={`border rounded-lg p-4 cursor-pointer transition-micro hover-lift ${
                  selectedEvidence.includes(item.id)
                    ? 'border-primary bg-primary-50' :'border-border hover:border-secondary-300'
                }`}
                onClick={() => handleEvidenceToggle(item.id)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <Icon
                      name={getTypeIcon(item.type)}
                      size={20}
                      className="text-text-secondary"
                    />
                    <div>
                      <h3 className="font-heading font-medium text-text-primary">
                        {item.title}
                      </h3>
                      <p className="text-xs text-text-secondary capitalize">
                        {item.type} • {item.source}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                      <div className={`w-2 h-2 rounded-full ${item.relevanceScore >= 90 ? 'bg-success' : item.relevanceScore >= 80 ? 'bg-warning' : 'bg-error'}`} />
                      <span className="text-xs text-text-secondary">
                        {item.relevanceScore}%
                      </span>
                    </div>
                    
                    <input
                      type="checkbox"
                      checked={selectedEvidence.includes(item.id)}
                      onChange={() => handleEvidenceToggle(item.id)}
                      className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
                    />
                  </div>
                </div>

                <p className="text-sm text-text-secondary mb-3 line-clamp-2">
                  {item.description}
                </p>

                <div className="flex items-center justify-between text-xs text-text-tertiary">
                  <div className="flex items-center space-x-4">
                    <span>{new Date(item.timestamp).toLocaleDateString()}</span>
                    <span>{item.size}</span>
                    <span className={getClassificationColor(item.classification)}>
                      {item.classification}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {item.legalAdmissible ? (
                      <div className="flex items-center space-x-1 text-success">
                        <Icon name="CheckCircle" size={12} />
                        <span>Admissible</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-1 text-error">
                        <Icon name="XCircle" size={12} />
                        <span>Not Admissible</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-border">
          <div className="flex items-center justify-between">
            <div className="text-sm text-text-secondary">
              {selectedEvidence.length} evidence items selected for inclusion
            </div>
            
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handleAddSelected}
                disabled={selectedEvidence.length === 0}
              >
                Add Selected Evidence
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EvidenceSelector;