import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ReportBuilder = ({ selectedTemplate, onEvidenceSelect }) => {
  const [reportContent, setReportContent] = useState('');
  const [isCollaborating, setIsCollaborating] = useState(false);
  const [activeUsers, setActiveUsers] = useState([
    { id: 1, name: 'Sarah Chen', avatar: 'SC', color: 'bg-blue-500' },
    { id: 2, name: 'Mike Rodriguez', avatar: 'MR', color: 'bg-green-500' }
  ]);
  const editorRef = useRef(null);

  const toolbarItems = [
    { id: 'bold', icon: 'Bold', shortcut: 'Ctrl+B' },
    { id: 'italic', icon: 'Italic', shortcut: 'Ctrl+I' },
    { id: 'underline', icon: 'Underline', shortcut: 'Ctrl+U' },
    { id: 'separator1', type: 'separator' },
    { id: 'heading1', icon: 'Heading1', shortcut: 'Ctrl+1' },
    { id: 'heading2', icon: 'Heading2', shortcut: 'Ctrl+2' },
    { id: 'heading3', icon: 'Heading3', shortcut: 'Ctrl+3' },
    { id: 'separator2', type: 'separator' },
    { id: 'list', icon: 'List', shortcut: 'Ctrl+L' },
    { id: 'listOrdered', icon: 'ListOrdered', shortcut: 'Ctrl+Shift+L' },
    { id: 'separator3', type: 'separator' },
    { id: 'link', icon: 'Link', shortcut: 'Ctrl+K' },
    { id: 'image', icon: 'Image', shortcut: 'Ctrl+Shift+I' },
    { id: 'table', icon: 'Table', shortcut: 'Ctrl+T' }
  ];

  const handleToolbarAction = (action) => {
    console.log(`Toolbar action: ${action}`);
    // Implement toolbar functionality
  };

  const handleEvidenceInsert = () => {
    onEvidenceSelect();
    console.log('Insert evidence - Ctrl+E');
  };

  const handleReferenceInsert = () => {
    console.log('Insert reference - Ctrl+R');
  };

  const handleSave = () => {
    console.log('Saving report...');
  };

  const handleExport = (format) => {
    console.log(`Exporting as ${format}`);
  };

  const defaultContent = selectedTemplate ? `
# ${selectedTemplate.name}

## Executive Summary
[Provide a concise overview of the investigation findings and key conclusions]

## Investigation Scope
[Define the parameters and objectives of the investigation]

## Methodology
[Describe the investigative approach and techniques employed]

## Findings
[Present detailed findings with supporting evidence]

### Key Evidence
[Insert relevant evidence items using Ctrl+E]

### Analysis Results
[Provide analytical conclusions based on collected data]

## Recommendations
[Outline recommended actions based on investigation results]

## Appendices
[Include supporting documentation and evidence references]

---
*Report generated using DeepTrace OSINT Investigation Reporting Engine*
*Classification: ${selectedTemplate.classification}*
*Version: ${selectedTemplate.version}*
  `.trim() : 'Select a template to begin creating your report...';

  return (
    <div className="h-full bg-surface flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <h2 className="text-lg font-heading font-semibold text-text-primary">
              Report Builder
            </h2>
            {selectedTemplate && (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-text-secondary">Template:</span>
                <span className="text-sm font-medium text-text-primary">
                  {selectedTemplate.name}
                </span>
                <span className="text-xs bg-secondary-100 text-text-secondary px-2 py-1 rounded-full">
                  v{selectedTemplate.version}
                </span>
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            {/* Collaboration Status */}
            <div className="flex items-center space-x-2 mr-4">
              {activeUsers.map((user) => (
                <div
                  key={user.id}
                  className={`w-8 h-8 ${user.color} text-white rounded-full flex items-center justify-center text-xs font-medium`}
                  title={`${user.name} is editing`}
                >
                  {user.avatar}
                </div>
              ))}
              <Button
                variant="ghost"
                size="sm"
                iconName="Users"
                onClick={() => setIsCollaborating(!isCollaborating)}
              >
                {activeUsers.length + 1}
              </Button>
            </div>

            {/* Action Buttons */}
            <Button
              variant="ghost"
              size="sm"
              iconName="Save"
              onClick={handleSave}
            >
              Save
            </Button>
            
            <div className="relative group">
              <Button
                variant="primary"
                size="sm"
                iconName="Download"
              >
                Export
              </Button>
              <div className="absolute right-0 top-full mt-1 w-48 bg-surface border border-border rounded-lg shadow-elevated opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-micro z-50">
                <div className="p-2">
                  <button
                    onClick={() => handleExport('pdf')}
                    className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-text-primary hover:bg-background rounded-lg transition-micro"
                  >
                    <Icon name="FileText" size={16} />
                    <span>Export as PDF</span>
                  </button>
                  <button
                    onClick={() => handleExport('docx')}
                    className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-text-primary hover:bg-background rounded-lg transition-micro"
                  >
                    <Icon name="FileText" size={16} />
                    <span>Export as Word</span>
                  </button>
                  <button
                    onClick={() => handleExport('html')}
                    className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-text-primary hover:bg-background rounded-lg transition-micro"
                  >
                    <Icon name="Globe" size={16} />
                    <span>Export as HTML</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex items-center space-x-1 p-2 bg-background rounded-lg">
          {toolbarItems.map((item) => (
            item.type === 'separator' ? (
              <div key={item.id} className="w-px h-6 bg-border mx-1" />
            ) : (
              <button
                key={item.id}
                onClick={() => handleToolbarAction(item.id)}
                className="p-2 hover:bg-surface rounded transition-micro"
                title={`${item.id} (${item.shortcut})`}
              >
                <Icon name={item.icon} size={16} className="text-text-secondary" />
              </button>
            )
          ))}
          
          <div className="w-px h-6 bg-border mx-1" />
          
          <Button
            variant="ghost"
            size="sm"
            iconName="FileImage"
            onClick={handleEvidenceInsert}
            className="text-primary"
          >
            Evidence (Ctrl+E)
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            iconName="Quote"
            onClick={handleReferenceInsert}
            className="text-primary"
          >
            Reference (Ctrl+R)
          </Button>
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 p-4">
        <div className="h-full bg-white border border-border rounded-lg">
          <textarea
            ref={editorRef}
            value={reportContent || defaultContent}
            onChange={(e) => setReportContent(e.target.value)}
            className="w-full h-full p-6 resize-none border-none outline-none font-body text-text-primary leading-relaxed"
            placeholder="Start typing your report..."
            disabled={!selectedTemplate}
          />
        </div>
      </div>

      {/* Status Bar */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center justify-between text-xs text-text-secondary">
          <div className="flex items-center space-x-4">
            <span>Words: {reportContent.split(/\s+/).filter(word => word.length > 0).length}</span>
            <span>Characters: {reportContent.length}</span>
            <span>Last saved: 2 minutes ago</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-success rounded-full pulse-subtle" />
              <span>Auto-save enabled</span>
            </div>
            {selectedTemplate && (
              <span className="text-warning">
                Classification: {selectedTemplate.classification}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportBuilder;