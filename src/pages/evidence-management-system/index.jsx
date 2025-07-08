import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import EvidenceHierarchyTree from './components/EvidenceHierarchyTree';
import EvidenceGrid from './components/EvidenceGrid';
import MetadataCustodyPanel from './components/MetadataCustodyPanel';
import ComplianceDashboard from './components/ComplianceDashboard';

const EvidenceManagementSystem = () => {
  const [selectedEvidence, setSelectedEvidence] = useState(null);
  const [selectedEvidenceIds, setSelectedEvidenceIds] = useState([]);
  const [activeView, setActiveView] = useState('grid');
  const [showComplianceDashboard, setShowComplianceDashboard] = useState(false);
  const [notifications, setNotifications] = useState([]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (event) => {
      // Only handle shortcuts when not typing in input fields
      if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
        return;
      }

      switch (event.key.toLowerCase()) {
        case 'e':
          if (selectedEvidence) {
            console.log('Edit metadata for:', selectedEvidence.id);
          }
          break;
        case 'h':
          if (selectedEvidence) {
            console.log('Toggle legal hold for:', selectedEvidence.id);
          }
          break;
        case 's':
          if (selectedEvidence) {
            console.log('Digital signature for:', selectedEvidence.id);
          }
          break;
        case 'c':
          setShowComplianceDashboard(!showComplianceDashboard);
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [selectedEvidence, showComplianceDashboard]);

  // Mock real-time notifications
  useEffect(() => {
    const mockNotifications = [
      {
        id: 1,
        type: 'custody_request',
        title: 'Evidence Custody Request',
        message: 'Detective M. Johnson requested custody of EV-2024-003',
        timestamp: new Date(Date.now() - 300000),
        priority: 'high'
      },
      {
        id: 2,
        type: 'legal_hold',
        title: 'Legal Hold Applied',
        message: 'Legal hold automatically applied to Case INV-2024-001 evidence',
        timestamp: new Date(Date.now() - 600000),
        priority: 'medium'
      },
      {
        id: 3,
        type: 'compliance',
        title: 'Compliance Alert',
        message: 'GDPR audit scheduled for next week - prepare documentation',
        timestamp: new Date(Date.now() - 900000),
        priority: 'medium'
      }
    ];

    setNotifications(mockNotifications);
  }, []);

  const handleSelectEvidence = (evidence) => {
    setSelectedEvidence(evidence);
  };

  const handleBulkSelect = (evidenceIds) => {
    setSelectedEvidenceIds(evidenceIds);
  };

  const handleBulkAction = (action) => {
    console.log(`Bulk action: ${action} on items:`, selectedEvidenceIds);
    // Implement bulk actions here
    setSelectedEvidenceIds([]);
  };

  const formatNotificationTime = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    
    if (minutes < 60) {
      return `${minutes}m ago`;
    } else {
      return `${hours}h ago`;
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'custody_request': return 'UserCheck';
      case 'legal_hold': return 'Lock';
      case 'compliance': return 'Shield';
      default: return 'Bell';
    }
  };

  const getNotificationColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-error bg-error-50';
      case 'medium': return 'text-warning bg-warning-50';
      case 'low': return 'text-success bg-success-50';
      default: return 'text-text-secondary bg-secondary-100';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar />
      
      <main className="ml-64 mt-16 h-[calc(100vh-4rem)]">
        {/* Top Action Bar */}
        <div className="bg-surface border-b border-border p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-heading font-semibold text-text-primary">
                Evidence Management System
              </h1>
              <div className="flex items-center space-x-2">
                <Button
                  variant={activeView === 'grid' ? 'primary' : 'ghost'}
                  size="sm"
                  iconName="Grid3X3"
                  onClick={() => setActiveView('grid')}
                >
                  Grid View
                </Button>
                <Button
                  variant={activeView === 'list' ? 'primary' : 'ghost'}
                  size="sm"
                  iconName="List"
                  onClick={() => setActiveView('list')}
                >
                  List View
                </Button>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <div className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Bell"
                  onClick={() => console.log('Toggle notifications')}
                >
                  {notifications.length > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-error text-error-foreground text-xs rounded-full flex items-center justify-center">
                      {notifications.length}
                    </span>
                  )}
                </Button>
              </div>

              {/* Quick Actions */}
              <Button
                variant="ghost"
                size="sm"
                iconName="Shield"
                onClick={() => setShowComplianceDashboard(!showComplianceDashboard)}
              >
                Compliance
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                iconName="Download"
                onClick={() => console.log('Export evidence report')}
              >
                Export
              </Button>

              <Button
                variant="primary"
                size="sm"
                iconName="Plus"
                onClick={() => console.log('Add new evidence')}
              >
                Add Evidence
              </Button>
            </div>
          </div>

          {/* Bulk Actions Bar */}
          {selectedEvidenceIds.length > 0 && (
            <div className="mt-4 p-3 bg-primary-50 border border-primary-200 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-medium text-text-primary">
                    {selectedEvidenceIds.length} items selected
                  </span>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="xs"
                      iconName="Tag"
                      onClick={() => handleBulkAction('tag')}
                    >
                      Tag
                    </Button>
                    <Button
                      variant="ghost"
                      size="xs"
                      iconName="UserCheck"
                      onClick={() => handleBulkAction('transfer')}
                    >
                      Transfer Custody
                    </Button>
                    <Button
                      variant="ghost"
                      size="xs"
                      iconName="Lock"
                      onClick={() => handleBulkAction('legal-hold')}
                    >
                      Legal Hold
                    </Button>
                    <Button
                      variant="ghost"
                      size="xs"
                      iconName="Archive"
                      onClick={() => handleBulkAction('archive')}
                    >
                      Archive
                    </Button>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="xs"
                  iconName="X"
                  onClick={() => setSelectedEvidenceIds([])}
                >
                  Clear Selection
                </Button>
              </div>
            </div>
          )}

          {/* Keyboard Shortcuts Help */}
          <div className="mt-2 text-xs text-text-secondary">
            <span className="mr-4">
              <kbd className="px-1 py-0.5 bg-secondary-100 rounded text-xs">E</kbd> Edit metadata
            </span>
            <span className="mr-4">
              <kbd className="px-1 py-0.5 bg-secondary-100 rounded text-xs">H</kbd> Toggle hold
            </span>
            <span className="mr-4">
              <kbd className="px-1 py-0.5 bg-secondary-100 rounded text-xs">S</kbd> Sign evidence
            </span>
            <span>
              <kbd className="px-1 py-0.5 bg-secondary-100 rounded text-xs">C</kbd> Compliance dashboard
            </span>
          </div>
        </div>

        {/* Notifications Panel */}
        {notifications.length > 0 && (
          <div className="bg-warning-50 border-b border-warning-200 p-3">
            <div className="flex items-center space-x-3">
              <Icon name="AlertTriangle" size={16} className="text-warning flex-shrink-0" />
              <div className="flex-1">
                <div className="flex items-center space-x-4">
                  {notifications.slice(0, 2).map((notification) => (
                    <div key={notification.id} className="flex items-center space-x-2">
                      <Icon
                        name={getNotificationIcon(notification.type)}
                        size={14}
                        className="text-text-secondary"
                      />
                      <span className="text-sm text-text-primary">
                        {notification.title}
                      </span>
                      <span className="text-xs text-text-secondary">
                        {formatNotificationTime(notification.timestamp)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <Button
                variant="ghost"
                size="xs"
                iconName="X"
                onClick={() => setNotifications([])}
              />
            </div>
          </div>
        )}

        {/* Main Content */}
        {showComplianceDashboard ? (
          <div className="p-6">
            <ComplianceDashboard />
          </div>
        ) : (
          <div className="flex h-full">
            {/* Evidence Hierarchy Tree - 25% */}
            <div className="w-1/4 h-full">
              <EvidenceHierarchyTree
                onSelectEvidence={handleSelectEvidence}
                selectedEvidenceId={selectedEvidence?.id}
              />
            </div>

            {/* Evidence Grid - 50% */}
            <div className="w-1/2 h-full">
              <EvidenceGrid
                onSelectEvidence={handleSelectEvidence}
                selectedEvidenceIds={selectedEvidenceIds}
                onBulkSelect={handleBulkSelect}
              />
            </div>

            {/* Metadata/Custody Panel - 25% */}
            <div className="w-1/4 h-full">
              <MetadataCustodyPanel selectedEvidence={selectedEvidence} />
            </div>
          </div>
        )}

        {/* Status Bar */}
        <div className="fixed bottom-0 left-64 right-0 bg-surface border-t border-border p-2">
          <div className="flex items-center justify-between text-xs text-text-secondary">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span>System Status: Operational</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Database" size={12} />
                <span>Evidence Count: 1,247</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Lock" size={12} />
                <span>Legal Holds: 23</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span>Last Sync: {new Date().toLocaleTimeString()}</span>
              <div className="flex items-center space-x-1">
                <Icon name="Shield" size={12} />
                <span>Compliance: 94%</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EvidenceManagementSystem;