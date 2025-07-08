import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';


const MainContentArea = ({ selectedEvidence, onEvidenceUpdate, onAnnotationAdd }) => {
  const [viewMode, setViewMode] = useState('details'); // details, preview, timeline
  const [annotations, setAnnotations] = useState([]);
  const [newAnnotation, setNewAnnotation] = useState('');
  const [isAnnotating, setIsAnnotating] = useState(false);
  const [selectedText, setSelectedText] = useState('');
  const contentRef = useRef(null);

  useEffect(() => {
    if (selectedEvidence) {
      setAnnotations(selectedEvidence.annotations || []);
    }
  }, [selectedEvidence]);

  const handleTextSelection = () => {
    const selection = window.getSelection();
    if (selection.toString().trim()) {
      setSelectedText(selection.toString());
      setIsAnnotating(true);
    }
  };

  const handleAddAnnotation = () => {
    if (newAnnotation.trim() && selectedText) {
      const annotation = {
        id: Date.now(),
        text: selectedText,
        note: newAnnotation,
        timestamp: new Date(),
        author: 'Current User',
        position: { start: 0, end: selectedText.length }
      };
      
      const updatedAnnotations = [...annotations, annotation];
      setAnnotations(updatedAnnotations);
      onAnnotationAdd(selectedEvidence.id, annotation);
      
      setNewAnnotation('');
      setSelectedText('');
      setIsAnnotating(false);
      window.getSelection().removeAllRanges();
    }
  };

  const getSourceTypeIcon = (sourceType) => {
    switch (sourceType) {
      case 'social_media':
        return 'Users';
      case 'domain':
        return 'Globe';
      case 'email':
        return 'Mail';
      case 'phone':
        return 'Phone';
      case 'image':
        return 'Image';
      case 'document':
        return 'FileText';
      case 'network':
        return 'Network';
      case 'financial':
        return 'CreditCard';
      default:
        return 'File';
    }
  };

  const getVerificationBadge = (status) => {
    const badges = {
      verified: { color: 'bg-success text-success-foreground', icon: 'CheckCircle', text: 'Verified' },
      pending: { color: 'bg-warning text-warning-foreground', icon: 'Clock', text: 'Pending' },
      failed: { color: 'bg-error text-error-foreground', icon: 'XCircle', text: 'Failed' },
      unverified: { color: 'bg-secondary-200 text-secondary-800', icon: 'AlertCircle', text: 'Unverified' }
    };
    
    const badge = badges[status] || badges.unverified;
    
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${badge.color}`}>
        <Icon name={badge.icon} size={12} className="mr-1" />
        {badge.text}
      </span>
    );
  };

  const renderEvidenceContent = () => {
    if (!selectedEvidence) {
      return (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Icon name="FileSearch" size={48} className="text-text-tertiary mx-auto mb-4" />
            <h3 className="text-lg font-heading font-medium text-text-primary mb-2">
              No Evidence Selected
            </h3>
            <p className="text-text-secondary">
              Select an evidence item from the tree to view its details and content.
            </p>
          </div>
        </div>
      );
    }

    switch (viewMode) {
      case 'details':
        return (
          <div className="flex-1 overflow-y-auto p-6">
            {/* Evidence Header */}
            <div className="mb-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <Icon
                    name={getSourceTypeIcon(selectedEvidence.sourceType)}
                    size={24}
                    className="text-primary"
                  />
                  <div>
                    <h2 className="text-xl font-heading font-semibold text-text-primary">
                      {selectedEvidence.name}
                    </h2>
                    <p className="text-sm text-text-secondary">
                      {selectedEvidence.sourceType.replace('_', ' ').toUpperCase()} • 
                      Collected on {new Date(selectedEvidence.collectedDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {getVerificationBadge(selectedEvidence.verificationStatus)}
                  <Button variant="ghost" size="sm" iconName="Download">
                    Export
                  </Button>
                </div>
              </div>

              {/* Metadata Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-background rounded-lg">
                <div>
                  <label className="text-xs font-heading font-medium text-text-secondary uppercase tracking-wider">
                    Source URL
                  </label>
                  <p className="text-sm text-text-primary mt-1 font-data truncate">
                    {selectedEvidence.sourceUrl}
                  </p>
                </div>
                <div>
                  <label className="text-xs font-heading font-medium text-text-secondary uppercase tracking-wider">
                    File Size
                  </label>
                  <p className="text-sm text-text-primary mt-1">
                    {selectedEvidence.fileSize}
                  </p>
                </div>
                <div>
                  <label className="text-xs font-heading font-medium text-text-secondary uppercase tracking-wider">
                    Hash (SHA-256)
                  </label>
                  <p className="text-sm text-text-primary mt-1 font-data truncate">
                    {selectedEvidence.hash}
                  </p>
                </div>
                <div>
                  <label className="text-xs font-heading font-medium text-text-secondary uppercase tracking-wider">
                    Credibility Score
                  </label>
                  <div className="flex items-center mt-1">
                    <div className="flex-1 bg-secondary-200 rounded-full h-2 mr-2">
                      <div
                        className="bg-primary h-2 rounded-full"
                        style={{ width: `${selectedEvidence.credibilityScore}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-text-primary">
                      {selectedEvidence.credibilityScore}%
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Display */}
            <div className="mb-6">
              <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
                Content
              </h3>
              <div
                ref={contentRef}
                className="bg-surface border border-border rounded-lg p-4 min-h-96 relative"
                onMouseUp={handleTextSelection}
              >
                {selectedEvidence.contentType === 'image' ? (
                  <div className="text-center">
                    <Image
                      src={selectedEvidence.content}
                      alt={selectedEvidence.name}
                      className="max-w-full max-h-96 mx-auto rounded-lg"
                    />
                  </div>
                ) : selectedEvidence.contentType === 'text' ? (
                  <div className="whitespace-pre-wrap text-sm text-text-primary leading-relaxed">
                    {selectedEvidence.content}
                  </div>
                ) : selectedEvidence.contentType === 'json' ? (
                  <pre className="text-sm font-data text-text-primary overflow-x-auto">
                    {JSON.stringify(JSON.parse(selectedEvidence.content), null, 2)}
                  </pre>
                ) : (
                  <div className="text-center py-12">
                    <Icon name="File" size={48} className="text-text-tertiary mx-auto mb-4" />
                    <p className="text-text-secondary">
                      Content preview not available for this file type
                    </p>
                    <Button variant="primary" size="sm" className="mt-4" iconName="Download">
                      Download File
                    </Button>
                  </div>
                )}

                {/* Annotation Overlay */}
                {isAnnotating && (
                  <div className="absolute top-4 right-4 bg-surface border border-border rounded-lg p-4 shadow-elevated w-80 z-10">
                    <h4 className="font-heading font-medium text-text-primary mb-2">
                      Add Annotation
                    </h4>
                    <div className="mb-3">
                      <label className="text-xs font-medium text-text-secondary">
                        Selected Text:
                      </label>
                      <p className="text-sm text-text-primary bg-background p-2 rounded mt-1 italic">
                        "{selectedText}"
                      </p>
                    </div>
                    <textarea
                      value={newAnnotation}
                      onChange={(e) => setNewAnnotation(e.target.value)}
                      placeholder="Add your annotation..."
                      className="w-full h-20 text-sm border border-border rounded-lg p-2 resize-none"
                    />
                    <div className="flex justify-end space-x-2 mt-3">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setIsAnnotating(false);
                          setNewAnnotation('');
                          setSelectedText('');
                        }}
                      >
                        Cancel
                      </Button>
                      <Button variant="primary" size="sm" onClick={handleAddAnnotation}>
                        Add Annotation
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Tags */}
            <div className="mb-6">
              <h3 className="text-lg font-heading font-semibold text-text-primary mb-3">
                Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {selectedEvidence.tags?.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800"
                  >
                    {tag}
                    <Button
                      variant="ghost"
                      size="xs"
                      iconName="X"
                      className="ml-1 p-0 w-4 h-4"
                      onClick={() => console.log('Remove tag:', tag)}
                    />
                  </span>
                ))}
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Plus"
                  className="text-xs"
                  onClick={() => console.log('Add tag')}
                >
                  Add Tag
                </Button>
              </div>
            </div>

            {/* Annotations List */}
            {annotations.length > 0 && (
              <div>
                <h3 className="text-lg font-heading font-semibold text-text-primary mb-3">
                  Annotations ({annotations.length})
                </h3>
                <div className="space-y-3">
                  {annotations.map((annotation) => (
                    <div key={annotation.id} className="bg-background border border-border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-medium">
                            {annotation.author.charAt(0)}
                          </div>
                          <span className="text-sm font-medium text-text-primary">
                            {annotation.author}
                          </span>
                          <span className="text-xs text-text-secondary">
                            {new Date(annotation.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <Button variant="ghost" size="xs" iconName="MoreHorizontal" />
                      </div>
                      <div className="mb-2">
                        <p className="text-xs text-text-secondary mb-1">Selected text:</p>
                        <p className="text-sm text-text-primary bg-surface p-2 rounded italic">
                          "{annotation.text}"
                        </p>
                      </div>
                      <p className="text-sm text-text-primary">
                        {annotation.note}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      case 'preview':
        return (
          <div className="flex-1 overflow-y-auto p-6">
            <div className="text-center">
              <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
                Evidence Preview
              </h3>
              {selectedEvidence.contentType === 'image' ? (
                <Image
                  src={selectedEvidence.content}
                  alt={selectedEvidence.name}
                  className="max-w-full max-h-screen mx-auto rounded-lg shadow-elevated"
                />
              ) : (
                <div className="bg-surface border border-border rounded-lg p-8">
                  <Icon name="Eye" size={48} className="text-text-tertiary mx-auto mb-4" />
                  <p className="text-text-secondary">
                    Preview mode available for image content only
                  </p>
                </div>
              )}
            </div>
          </div>
        );

      case 'timeline':
        return (
          <div className="flex-1 overflow-y-auto p-6">
            <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
              Evidence Timeline
            </h3>
            <div className="space-y-4">
              {selectedEvidence.timeline?.map((event, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <Icon name="Clock" size={16} className="text-primary-foreground" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-sm font-medium text-text-primary">
                        {event.action}
                      </h4>
                      <span className="text-xs text-text-secondary">
                        {new Date(event.timestamp).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-sm text-text-secondary">
                      {event.description}
                    </p>
                    {event.user && (
                      <p className="text-xs text-text-tertiary mt-1">
                        by {event.user}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-surface">
      {/* Content Header */}
      {selectedEvidence && (
        <div className="border-b border-border p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h2 className="text-lg font-heading font-semibold text-text-primary">
                Evidence Analysis
              </h2>
              <div className="flex items-center space-x-1 bg-background rounded-lg p-1">
                <Button
                  variant={viewMode === 'details' ? 'primary' : 'ghost'}
                  size="sm"
                  iconName="FileText"
                  onClick={() => setViewMode('details')}
                >
                  Details
                </Button>
                <Button
                  variant={viewMode === 'preview' ? 'primary' : 'ghost'}
                  size="sm"
                  iconName="Eye"
                  onClick={() => setViewMode('preview')}
                >
                  Preview
                </Button>
                <Button
                  variant={viewMode === 'timeline' ? 'primary' : 'ghost'}
                  size="sm"
                  iconName="Clock"
                  onClick={() => setViewMode('timeline')}
                >
                  Timeline
                </Button>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" iconName="MessageSquare">
                Comments ({annotations.length})
              </Button>
              <Button variant="ghost" size="sm" iconName="Share">
                Share
              </Button>
              <Button variant="ghost" size="sm" iconName="MoreHorizontal" />
            </div>
          </div>
        </div>
      )}

      {/* Content Area */}
      {renderEvidenceContent()}
    </div>
  );
};

export default MainContentArea;