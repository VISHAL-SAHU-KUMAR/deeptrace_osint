import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NetworkGraphVisualization = ({ data, onNodeSelect, selectedNode, onRelationshipCreate }) => {
  const svgRef = useRef();
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const mockNetworkData = {
    nodes: [
      { id: 'person1', type: 'person', label: 'John Anderson', confidence: 0.95, x: 100, y: 100 },
      { id: 'email1', type: 'email', label: 'j.anderson@company.com', confidence: 0.98, x: 200, y: 150 },
      { id: 'phone1', type: 'phone', label: '+1-555-0123', confidence: 0.87, x: 150, y: 200 },
      { id: 'domain1', type: 'domain', label: 'suspicious-site.com', confidence: 0.76, x: 300, y: 120 },
      { id: 'ip1', type: 'ip', label: '192.168.1.100', confidence: 0.92, x: 350, y: 180 },
      { id: 'location1', type: 'location', label: 'New York, NY', confidence: 0.89, x: 120, y: 250 }
    ],
    links: [
      { source: 'person1', target: 'email1', type: 'owns', strength: 0.9 },
      { source: 'person1', target: 'phone1', type: 'uses', strength: 0.8 },
      { source: 'email1', target: 'domain1', type: 'communicates', strength: 0.7 },
      { source: 'domain1', target: 'ip1', type: 'resolves', strength: 0.95 },
      { source: 'person1', target: 'location1', type: 'located', strength: 0.6 }
    ]
  };

  const getNodeColor = (type) => {
    const colors = {
      person: '#3B82F6',
      email: '#10B981',
      phone: '#F59E0B',
      domain: '#EF4444',
      ip: '#8B5CF6',
      location: '#06B6D4'
    };
    return colors[type] || '#6B7280';
  };

  const getNodeIcon = (type) => {
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

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const width = 800;
    const height = 600;

    const zoom = d3.zoom()
      .scaleExtent([0.1, 4])
      .on('zoom', (event) => {
        container.attr('transform', event.transform);
        setZoomLevel(event.transform.k);
      });

    svg.call(zoom);

    const container = svg.append('g');

    // Create simulation
    const simulation = d3.forceSimulation(mockNetworkData.nodes)
      .force('link', d3.forceLink(mockNetworkData.links).id(d => d.id).distance(100))
      .force('charge', d3.forceManyBody().strength(-300))
      .force('center', d3.forceCenter(width / 2, height / 2));

    // Create links
    const link = container.append('g')
      .selectAll('line')
      .data(mockNetworkData.links)
      .enter().append('line')
      .attr('stroke', '#E5E7EB')
      .attr('stroke-width', d => Math.sqrt(d.strength * 5))
      .attr('stroke-opacity', 0.6);

    // Create nodes
    const node = container.append('g')
      .selectAll('g')
      .data(mockNetworkData.nodes)
      .enter().append('g')
      .attr('class', 'node')
      .style('cursor', 'pointer')
      .call(d3.drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended));

    // Add circles to nodes
    node.append('circle')
      .attr('r', d => 20 + (d.confidence * 10))
      .attr('fill', d => getNodeColor(d.type))
      .attr('stroke', '#FFFFFF')
      .attr('stroke-width', 2)
      .attr('opacity', 0.8);

    // Add labels to nodes
    node.append('text')
      .text(d => d.label.length > 15 ? d.label.substring(0, 15) + '...' : d.label)
      .attr('text-anchor', 'middle')
      .attr('dy', 40)
      .attr('font-size', '12px')
      .attr('fill', '#374151')
      .attr('font-weight', '500');

    // Add confidence indicators
    node.append('text')
      .text(d => `${Math.round(d.confidence * 100)}%`)
      .attr('text-anchor', 'middle')
      .attr('dy', -25)
      .attr('font-size', '10px')
      .attr('fill', '#6B7280')
      .attr('font-weight', '600');

    // Node click handler
    node.on('click', (event, d) => {
      onNodeSelect(d);
      
      // Highlight selected node
      node.selectAll('circle')
        .attr('stroke-width', n => n.id === d.id ? 4 : 2)
        .attr('stroke', n => n.id === d.id ? '#F59E0B' : '#FFFFFF');
    });

    // Simulation tick
    simulation.on('tick', () => {
      link
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);

      node
        .attr('transform', d => `translate(${d.x},${d.y})`);
    });

    function dragstarted(event, d) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event, d) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event, d) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

  }, [data, onNodeSelect]);

  const handleZoomIn = () => {
    const svg = d3.select(svgRef.current);
    svg.transition().call(
      d3.zoom().transform,
      d3.zoomTransform(svg.node()).scale(zoomLevel * 1.2)
    );
  };

  const handleZoomOut = () => {
    const svg = d3.select(svgRef.current);
    svg.transition().call(
      d3.zoom().transform,
      d3.zoomTransform(svg.node()).scale(zoomLevel * 0.8)
    );
  };

  const handleResetZoom = () => {
    const svg = d3.select(svgRef.current);
    svg.transition().call(
      d3.zoom().transform,
      d3.zoomIdentity
    );
  };

  return (
    <div className={`relative bg-surface border border-border rounded-lg ${isFullscreen ? 'fixed inset-0 z-50' : 'h-full'}`}>
      {/* Graph Controls */}
      <div className="absolute top-4 right-4 z-10 flex flex-col space-y-2">
        <Button
          variant="ghost"
          size="sm"
          iconName={isFullscreen ? 'Minimize2' : 'Maximize2'}
          onClick={() => setIsFullscreen(!isFullscreen)}
          className="bg-surface shadow-primary"
        />
        <Button
          variant="ghost"
          size="sm"
          iconName="ZoomIn"
          onClick={handleZoomIn}
          className="bg-surface shadow-primary"
        />
        <Button
          variant="ghost"
          size="sm"
          iconName="ZoomOut"
          onClick={handleZoomOut}
          className="bg-surface shadow-primary"
        />
        <Button
          variant="ghost"
          size="sm"
          iconName="RotateCcw"
          onClick={handleResetZoom}
          className="bg-surface shadow-primary"
        />
      </div>

      {/* Zoom Level Indicator */}
      <div className="absolute bottom-4 left-4 z-10 bg-surface px-3 py-1 rounded-lg shadow-primary">
        <span className="text-sm text-text-secondary">
          Zoom: {Math.round(zoomLevel * 100)}%
        </span>
      </div>

      {/* Legend */}
      <div className="absolute top-4 left-4 z-10 bg-surface p-3 rounded-lg shadow-primary">
        <h4 className="text-sm font-medium text-text-primary mb-2">Entity Types</h4>
        <div className="space-y-1">
          {Object.entries({
            person: 'Person',
            email: 'Email',
            phone: 'Phone',
            domain: 'Domain',
            ip: 'IP Address',
            location: 'Location'
          }).map(([type, label]) => (
            <div key={type} className="flex items-center space-x-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: getNodeColor(type) }}
              />
              <span className="text-xs text-text-secondary">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* SVG Container */}
      <svg
        ref={svgRef}
        width="100%"
        height={isFullscreen ? '100vh' : '600px'}
        className="bg-background"
      />

      {/* Node Details Panel */}
      {selectedNode && (
        <div className="absolute bottom-4 right-4 z-10 w-64 bg-surface border border-border rounded-lg shadow-elevated p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-medium text-text-primary">Node Details</h4>
            <Button
              variant="ghost"
              size="xs"
              iconName="X"
              onClick={() => onNodeSelect(null)}
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Icon name={getNodeIcon(selectedNode.type)} size={16} />
              <span className="text-sm font-medium text-text-primary">
                {selectedNode.label}
              </span>
            </div>
            <div className="text-xs text-text-secondary">
              Type: {selectedNode.type}
            </div>
            <div className="text-xs text-text-secondary">
              Confidence: {Math.round(selectedNode.confidence * 100)}%
            </div>
            <Button
              variant="primary"
              size="xs"
              fullWidth
              onClick={() => onRelationshipCreate(selectedNode)}
            >
              Create Relationship
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NetworkGraphVisualization;