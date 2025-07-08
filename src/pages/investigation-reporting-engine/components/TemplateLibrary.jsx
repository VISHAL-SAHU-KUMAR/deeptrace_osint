import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TemplateLibrary = ({ onTemplateSelect, selectedTemplate }) => {
  const [expandedCategories, setExpandedCategories] = useState(['legal', 'intelligence']);
  const [searchQuery, setSearchQuery] = useState('');

  const templateCategories = [
    {
      id: 'legal',
      name: 'Legal Reports',
      icon: 'Scale',
      templates: [
        {
          id: 'legal-001',
          name: 'Criminal Investigation Report',
          description: 'Comprehensive criminal case documentation with evidence chain',
          version: '2.1',
          lastModified: '2024-01-15',
          classification: 'Restricted',
          usage: 156
        },
        {
          id: 'legal-002',
          name: 'Civil Litigation Support',
          description: 'Evidence compilation for civil proceedings',
          version: '1.8',
          lastModified: '2024-01-12',
          classification: 'Confidential',
          usage: 89
        },
        {
          id: 'legal-003',
          name: 'Forensic Analysis Summary',
          description: 'Digital forensics findings and methodology',
          version: '3.0',
          lastModified: '2024-01-18',
          classification: 'Secret',
          usage: 234
        }
      ]
    },
    {
      id: 'intelligence',
      name: 'Intelligence Reports',
      icon: 'Brain',
      templates: [
        {
          id: 'intel-001',
          name: 'Threat Assessment Report',
          description: 'Comprehensive threat analysis and risk evaluation',
          version: '2.5',
          lastModified: '2024-01-16',
          classification: 'Top Secret',
          usage: 312
        },
        {
          id: 'intel-002',
          name: 'OSINT Collection Summary',
          description: 'Open source intelligence gathering results',
          version: '1.9',
          lastModified: '2024-01-14',
          classification: 'Confidential',
          usage: 178
        },
        {
          id: 'intel-003',
          name: 'Social Media Analysis',
          description: 'Social network investigation findings',
          version: '2.2',
          lastModified: '2024-01-17',
          classification: 'Restricted',
          usage: 145
        }
      ]
    },
    {
      id: 'operational',
      name: 'Operational Reports',
      icon: 'Activity',
      templates: [
        {
          id: 'ops-001',
          name: 'Incident Response Report',
          description: 'Security incident documentation and response',
          version: '1.7',
          lastModified: '2024-01-13',
          classification: 'Confidential',
          usage: 267
        },
        {
          id: 'ops-002',
          name: 'Daily Intelligence Brief',
          description: 'Daily operational intelligence summary',
          version: '3.1',
          lastModified: '2024-01-19',
          classification: 'Restricted',
          usage: 445
        },
        {
          id: 'ops-003',
          name: 'Investigation Progress',
          description: 'Case progress tracking and status updates',
          version: '2.0',
          lastModified: '2024-01-11',
          classification: 'Confidential',
          usage: 198
        }
      ]
    }
  ];

  const toggleCategory = (categoryId) => {
    setExpandedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const getClassificationColor = (classification) => {
    switch (classification) {
      case 'Top Secret':
        return 'bg-error text-error-foreground';
      case 'Secret':
        return 'bg-warning text-warning-foreground';
      case 'Confidential':
        return 'bg-accent text-accent-foreground';
      case 'Restricted':
        return 'bg-secondary text-secondary-foreground';
      default:
        return 'bg-secondary-200 text-text-secondary';
    }
  };

  const filteredCategories = templateCategories.map(category => ({
    ...category,
    templates: category.templates.filter(template =>
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.templates.length > 0);

  return (
    <div className="h-full bg-surface border-r border-border flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-heading font-semibold text-text-primary">
            Report Templates
          </h2>
          <Button
            variant="primary"
            size="sm"
            iconName="Plus"
            onClick={() => console.log('Create new template')}
          >
            New
          </Button>
        </div>
        
        {/* Search */}
        <div className="relative">
          <Icon
            name="Search"
            size={16}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary"
          />
          <input
            type="text"
            placeholder="Search templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-background border border-border rounded-lg text-sm font-body placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-micro"
          />
        </div>
      </div>

      {/* Template Categories */}
      <div className="flex-1 overflow-y-auto">
        {filteredCategories.map((category) => (
          <div key={category.id} className="border-b border-border last:border-b-0">
            <button
              onClick={() => toggleCategory(category.id)}
              className="w-full flex items-center justify-between p-4 hover:bg-background transition-micro"
            >
              <div className="flex items-center space-x-3">
                <Icon
                  name={category.icon}
                  size={18}
                  className="text-text-secondary"
                />
                <span className="font-heading font-medium text-text-primary">
                  {category.name}
                </span>
                <span className="text-xs bg-secondary-100 text-text-secondary px-2 py-1 rounded-full">
                  {category.templates.length}
                </span>
              </div>
              <Icon
                name="ChevronDown"
                size={16}
                className={`text-text-secondary transition-transform ${
                  expandedCategories.includes(category.id) ? 'rotate-180' : ''
                }`}
              />
            </button>

            {expandedCategories.includes(category.id) && (
              <div className="pb-2">
                {category.templates.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => onTemplateSelect(template)}
                    className={`w-full text-left p-3 mx-2 mb-2 rounded-lg border transition-micro hover-lift ${
                      selectedTemplate?.id === template.id
                        ? 'border-primary bg-primary-50' :'border-border hover:border-secondary-300 hover:bg-background'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-heading font-medium text-text-primary text-sm">
                        {template.name}
                      </h4>
                      <span className={`text-xs px-2 py-1 rounded-full ${getClassificationColor(template.classification)}`}>
                        {template.classification}
                      </span>
                    </div>
                    
                    <p className="text-xs text-text-secondary mb-3 line-clamp-2">
                      {template.description}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-text-tertiary">
                      <div className="flex items-center space-x-4">
                        <span>v{template.version}</span>
                        <span>{template.lastModified}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="Users" size={12} />
                        <span>{template.usage}</span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center justify-between text-xs text-text-secondary">
          <span>Templates: {filteredCategories.reduce((acc, cat) => acc + cat.templates.length, 0)}</span>
          <Button
            variant="ghost"
            size="xs"
            iconName="Settings"
            onClick={() => console.log('Template settings')}
          >
            Manage
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TemplateLibrary;