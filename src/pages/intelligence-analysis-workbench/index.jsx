import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import AnalysisToolbar from './components/AnalysisToolbar';
import NetworkGraphVisualization from './components/NetworkGraphVisualization';
import TimelineVisualization from './components/TimelineVisualization';
import GeospatialMapVisualization from './components/GeospatialMapVisualization';
import AnalysisSidebar from './components/AnalysisSidebar';
import EntityDataGrid from './components/EntityDataGrid';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const IntelligenceAnalysisWorkbench = () => {
  const [currentView, setCurrentView] = useState('graph');
  const [selectedNode, setSelectedNode] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedEntities, setSelectedEntities] = useState([]);
  const [isCollaborating, setIsCollaborating] = useState(true);
  const [collaboratorCount, setCollaboratorCount] = useState(3);
  const [showDataGrid, setShowDataGrid] = useState(false);
  const [analysisData, setAnalysisData] = useState({
    entities: [],
    relationships: [],
    notes: []
  });

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.ctrlKey || event.metaKey) return;
      
      switch (event.key.toLowerCase()) {
        case 'g': setCurrentView('graph');
          break;
        case 't': setCurrentView('timeline');
          break;
        case 'm': setCurrentView('map');
          break;
        case 'r': setCurrentView('matrix');
          break;
        case 'd':
          setShowDataGrid(!showDataGrid);
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [showDataGrid]);

  const handleViewChange = (view) => {
    setCurrentView(view);
    // Clear selections when changing views
    setSelectedNode(null);
    setSelectedEvent(null);
    setSelectedLocation(null);
  };

  const handleExport = (format) => {
    console.log(`Exporting analysis in ${format} format`);
    // Export logic would go here
  };

  const handleSave = () => {
    console.log('Saving analysis workspace');
    // Save logic would go here
  };

  const handleShare = () => {
    console.log('Sharing analysis workspace');
    // Share logic would go here
  };

  const handleNodeSelect = (node) => {
    setSelectedNode(node);
  };

  const handleEventSelect = (event) => {
    setSelectedEvent(event);
  };

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
  };

  const handleEntitySelect = (entity) => {
    console.log('Entity selected:', entity);
  };

  const handleRelationshipCreate = (entity) => {
    console.log('Creating relationship for:', entity);
  };

  const handleEntityFilter = (filters) => {
    console.log('Applying entity filters:', filters);
  };

  const handleNoteAdd = (note) => {
    setAnalysisData(prev => ({
      ...prev,
      notes: [...prev.notes, { ...note, id: Date.now() }]
    }));
  };

  const handleHypothesisCreate = () => {
    console.log('Creating new hypothesis');
  };

  const handleBulkAction = (action) => {
    console.log(`Performing bulk action: ${action} on`, selectedEntities);
  };

  const handleSelectionChange = (newSelection) => {
    setSelectedEntities(newSelection);
  };

  const renderVisualization = () => {
    switch (currentView) {
      case 'graph':
        return (
          <NetworkGraphVisualization
            data={analysisData}
            onNodeSelect={handleNodeSelect}
            selectedNode={selectedNode}
            onRelationshipCreate={handleRelationshipCreate}
          />
        );
      case 'timeline':
        return (
          <TimelineVisualization
            data={analysisData}
            onEventSelect={handleEventSelect}
            selectedEvent={selectedEvent}
          />
        );
      case 'map':
        return (
          <GeospatialMapVisualization
            data={analysisData}
            onLocationSelect={handleLocationSelect}
            selectedLocation={selectedLocation}
          />
        );
      case 'matrix':
        return (
          <div className="h-full bg-surface border border-border rounded-lg flex items-center justify-center">
            <div className="text-center">
              <Icon name="Grid3X3" size={48} className="text-text-secondary mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-text-primary mb-2">
                Relationship Matrix
              </h3>
              <p className="text-text-secondary mb-4">
                Interactive relationship matrix visualization coming soon
              </p>
              <Button
                variant="primary"
                iconName="ArrowLeft"
                onClick={() => setCurrentView('graph')}
              >
                Back to Network Graph
              </Button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar />
      
      <main className="ml-64 mt-16 h-screen overflow-hidden">
        {/* Analysis Toolbar */}
        <AnalysisToolbar
          currentView={currentView}
          onViewChange={handleViewChange}
          onExport={handleExport}
          onSave={handleSave}
          onShare={handleShare}
          isCollaborating={isCollaborating}
          collaboratorCount={collaboratorCount}
        />

        <div className="flex h-full">
          {/* Main Workspace */}
          <div className="flex-1 flex flex-col">
            {/* Quick Actions Bar */}
            <div className="flex items-center justify-between p-4 bg-surface border-b border-border">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-success rounded-full pulse-subtle" />
                  <span className="text-sm text-text-secondary">
                    Analysis Active
                  </span>
                </div>
                <div className="text-sm text-text-secondary">
                  Last updated: {new Date().toLocaleTimeString()}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Table"
                  onClick={() => setShowDataGrid(!showDataGrid)}
                  className={showDataGrid ? 'text-primary' : ''}
                >
                  Data Grid (D)
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Zap"
                  onClick={() => console.log('Run ML analysis')}
                >
                  ML Analysis
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Search"
                  onClick={() => console.log('Pattern search')}
                >
                  Pattern Search
                </Button>
              </div>
            </div>

            {/* Visualization Area */}
            <div className="flex-1 p-4">
              {showDataGrid ? (
                <EntityDataGrid
                  entities={analysisData.entities}
                  onEntitySelect={handleEntitySelect}
                  onBulkAction={handleBulkAction}
                  selectedEntities={selectedEntities}
                  onSelectionChange={handleSelectionChange}
                />
              ) : (
                renderVisualization()
              )}
            </div>
          </div>

          {/* Analysis Sidebar */}
          <div className="w-96">
            <AnalysisSidebar
              entities={analysisData.entities}
              relationships={analysisData.relationships}
              notes={analysisData.notes}
              onEntityFilter={handleEntityFilter}
              onNoteAdd={handleNoteAdd}
              onHypothesisCreate={handleHypothesisCreate}
            />
          </div>
        </div>

        {/* Collaboration Indicators */}
        {isCollaborating && (
          <div className="fixed bottom-4 right-4 z-50">
            <div className="bg-surface border border-border rounded-lg shadow-elevated p-3">
              <div className="flex items-center space-x-2">
                <div className="flex -space-x-2">
                  {Array.from({ length: collaboratorCount }, (_, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium border-2 border-surface"
                    >
                      {String.fromCharCode(65 + i)}
                    </div>
                  ))}
                </div>
                <div className="text-sm text-text-secondary">
                  {collaboratorCount} analysts active
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Keyboard Shortcuts Help */}
        <div className="fixed bottom-4 left-4 z-50">
          <div className="bg-surface border border-border rounded-lg shadow-elevated p-3">
            <h4 className="text-sm font-medium text-text-primary mb-2">Shortcuts</h4>
            <div className="space-y-1 text-xs text-text-secondary">
              <div className="flex justify-between">
                <span>Graph View:</span>
                <kbd className="px-1 py-0.5 bg-secondary-100 rounded">G</kbd>
              </div>
              <div className="flex justify-between">
                <span>Timeline:</span>
                <kbd className="px-1 py-0.5 bg-secondary-100 rounded">T</kbd>
              </div>
              <div className="flex justify-between">
                <span>Map View:</span>
                <kbd className="px-1 py-0.5 bg-secondary-100 rounded">M</kbd>
              </div>
              <div className="flex justify-between">
                <span>Data Grid:</span>
                <kbd className="px-1 py-0.5 bg-secondary-100 rounded">D</kbd>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default IntelligenceAnalysisWorkbench;