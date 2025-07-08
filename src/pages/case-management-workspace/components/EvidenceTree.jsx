import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EvidenceTree = ({ evidenceData, onEvidenceSelect, onEvidenceUpdate, selectedEvidence }) => {
  const [expandedFolders, setExpandedFolders] = useState(new Set(['root']));
  const [draggedItem, setDraggedItem] = useState(null);
  const [dropTarget, setDropTarget] = useState(null);
  const dragCounter = useRef(0);

  const toggleFolder = (folderId) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(folderId)) {
      newExpanded.delete(folderId);
    } else {
      newExpanded.add(folderId);
    }
    setExpandedFolders(newExpanded);
  };

  const handleDragStart = (e, item) => {
    setDraggedItem(item);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', e.target.outerHTML);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDragEnter = (e, targetId) => {
    e.preventDefault();
    dragCounter.current++;
    setDropTarget(targetId);
  };

  const handleDragLeave = (e) => {
    dragCounter.current--;
    if (dragCounter.current === 0) {
      setDropTarget(null);
    }
  };

  const handleDrop = (e, targetFolder) => {
    e.preventDefault();
    dragCounter.current = 0;
    setDropTarget(null);
    
    if (draggedItem && targetFolder && draggedItem.id !== targetFolder) {
      onEvidenceUpdate(draggedItem.id, { folder: targetFolder });
    }
    setDraggedItem(null);
  };

  const getSourceIcon = (sourceType) => {
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

  const getVerificationColor = (status) => {
    switch (status) {
      case 'verified':
        return 'text-success';
      case 'pending':
        return 'text-warning';
      case 'failed':
        return 'text-error';
      default:
        return 'text-text-secondary';
    }
  };

  const renderTreeNode = (node, level = 0) => {
    const isExpanded = expandedFolders.has(node.id);
    const isSelected = selectedEvidence?.id === node.id;
    const isDropTarget = dropTarget === node.id;

    return (
      <div key={node.id} className="select-none">
        <div
          className={`flex items-center py-1.5 px-2 rounded-lg cursor-pointer transition-micro hover:bg-background group ${
            isSelected ? 'bg-primary-50 border border-primary-200' : ''
          } ${isDropTarget ? 'bg-accent-50 border border-accent-200' : ''}`}
          style={{ paddingLeft: `${level * 16 + 8}px` }}
          onClick={() => node.type === 'evidence' && onEvidenceSelect(node)}
          draggable={node.type === 'evidence'}
          onDragStart={(e) => node.type === 'evidence' && handleDragStart(e, node)}
          onDragOver={handleDragOver}
          onDragEnter={(e) => node.type === 'folder' && handleDragEnter(e, node.id)}
          onDragLeave={handleDragLeave}
          onDrop={(e) => node.type === 'folder' && handleDrop(e, node.id)}
        >
          {node.type === 'folder' ? (
            <>
              <Button
                variant="ghost"
                size="xs"
                iconName={isExpanded ? 'ChevronDown' : 'ChevronRight'}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFolder(node.id);
                }}
                className="mr-1 p-0 w-4 h-4"
              />
              <Icon name="Folder" size={16} className="text-accent mr-2" />
              <span className="text-sm font-medium text-text-primary flex-1">
                {node.name}
              </span>
              <span className="text-xs text-text-secondary">
                {node.children?.filter(child => child.type === 'evidence').length || 0}
              </span>
            </>
          ) : (
            <>
              <div className="w-4 mr-1" />
              <Icon
                name={getSourceIcon(node.sourceType)}
                size={14}
                className="text-text-secondary mr-2"
              />
              <div className="flex-1 min-w-0">
                <div className="text-sm text-text-primary truncate">
                  {node.name}
                </div>
                <div className="text-xs text-text-secondary">
                  {new Date(node.collectedDate).toLocaleDateString()}
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <Icon
                  name="CheckCircle"
                  size={12}
                  className={getVerificationColor(node.verificationStatus)}
                />
                {node.tags && node.tags.length > 0 && (
                  <div className="w-2 h-2 bg-primary rounded-full" />
                )}
              </div>
            </>
          )}
        </div>

        {node.type === 'folder' && isExpanded && node.children && (
          <div>
            {node.children.map(child => renderTreeNode(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="h-full bg-surface border-r border-border flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-heading font-semibold text-text-primary">
            Evidence Tree
          </h3>
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="xs"
              iconName="Plus"
              onClick={() => console.log('Add folder')}
            />
            <Button
              variant="ghost"
              size="xs"
              iconName="Search"
              onClick={() => console.log('Search evidence')}
            />
          </div>
        </div>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-background rounded p-2">
            <div className="font-medium text-text-primary">
              {evidenceData.reduce((acc, folder) => 
                acc + (folder.children?.filter(child => child.type === 'evidence').length || 0), 0
              )}
            </div>
            <div className="text-text-secondary">Total Items</div>
          </div>
          <div className="bg-background rounded p-2">
            <div className="font-medium text-text-primary">
              {evidenceData.reduce((acc, folder) => 
                acc + (folder.children?.filter(child => 
                  child.type === 'evidence' && child.verificationStatus === 'verified'
                ).length || 0), 0
              )}
            </div>
            <div className="text-text-secondary">Verified</div>
          </div>
        </div>
      </div>

      {/* Tree Content */}
      <div className="flex-1 overflow-y-auto p-2">
        <div className="space-y-1">
          {evidenceData.map(node => renderTreeNode(node))}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="p-3 border-t border-border">
        <div className="flex items-center justify-between text-xs text-text-secondary">
          <span>Drag to organize</span>
          <Button
            variant="ghost"
            size="xs"
            iconName="RefreshCw"
            onClick={() => console.log('Refresh tree')}
          />
        </div>
      </div>
    </div>
  );
};

export default EvidenceTree;