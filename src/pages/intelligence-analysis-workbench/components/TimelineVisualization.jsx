import React, { useState, useRef, useEffect } from 'react';
import * as d3 from 'd3';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TimelineVisualization = ({ data, onEventSelect, selectedEvent }) => {
  const svgRef = useRef();
  const [timeRange, setTimeRange] = useState('7d');
  const [isPlaying, setIsPlaying] = useState(false);

  const mockTimelineData = [
    {
      id: 'event1',
      timestamp: new Date('2024-01-15T10:30:00'),
      type: 'communication',
      title: 'Email Exchange Detected',
      description: 'Suspicious email communication between target and unknown entity',
      confidence: 0.87,
      source: 'Email Analysis',
      entities: ['john.doe@example.com', 'suspicious@darkweb.com']
    },
    {
      id: 'event2',
      timestamp: new Date('2024-01-15T14:22:00'),
      type: 'network',
      title: 'Domain Resolution',
      description: 'Target domain resolved to new IP address',
      confidence: 0.94,
      source: 'DNS Monitoring',
      entities: ['malicious-site.com', '192.168.1.100']
    },
    {
      id: 'event3',
      timestamp: new Date('2024-01-16T09:15:00'),
      type: 'social',
      title: 'Social Media Activity',
      description: 'New post with suspicious content detected',
      confidence: 0.72,
      source: 'Social Media Monitor',
      entities: ['@suspicious_user', 'encrypted_message.jpg']
    },
    {
      id: 'event4',
      timestamp: new Date('2024-01-16T16:45:00'),
      type: 'financial',
      title: 'Transaction Pattern',
      description: 'Unusual financial transaction pattern identified',
      confidence: 0.91,
      source: 'Financial Intelligence',
      entities: ['Account-XXX-1234', '$15,000 transfer']
    },
    {
      id: 'event5',
      timestamp: new Date('2024-01-17T11:30:00'),
      type: 'location',
      title: 'Geolocation Update',
      description: 'Target device location changed significantly',
      confidence: 0.85,
      source: 'Geolocation Tracking',
      entities: ['Device-ABC123', 'New York → Miami']
    }
  ];

  const getEventColor = (type) => {
    const colors = {
      communication: '#3B82F6',
      network: '#EF4444',
      social: '#10B981',
      financial: '#F59E0B',
      location: '#8B5CF6'
    };
    return colors[type] || '#6B7280';
  };

  const getEventIcon = (type) => {
    const icons = {
      communication: 'Mail',
      network: 'Globe',
      social: 'Users',
      financial: 'DollarSign',
      location: 'MapPin'
    };
    return icons[type] || 'Circle';
  };

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const margin = { top: 20, right: 30, bottom: 40, left: 60 };
    const width = 800 - margin.left - margin.right;
    const height = 400 - margin.bottom - margin.top;

    const container = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Create scales
    const xScale = d3.scaleTime()
      .domain(d3.extent(mockTimelineData, d => d.timestamp))
      .range([0, width]);

    const yScale = d3.scaleBand()
      .domain(mockTimelineData.map((d, i) => i))
      .range([0, height])
      .padding(0.1);

    // Create axes
    const xAxis = d3.axisBottom(xScale)
      .tickFormat(d3.timeFormat('%m/%d %H:%M'));

    container.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(xAxis)
      .selectAll('text')
      .style('font-size', '12px')
      .style('fill', '#6B7280');

    // Create timeline line
    container.append('line')
      .attr('x1', 0)
      .attr('x2', width)
      .attr('y1', height / 2)
      .attr('y2', height / 2)
      .attr('stroke', '#E5E7EB')
      .attr('stroke-width', 2);

    // Create event groups
    const eventGroups = container.selectAll('.event-group')
      .data(mockTimelineData)
      .enter().append('g')
      .attr('class', 'event-group')
      .attr('transform', (d, i) => `translate(${xScale(d.timestamp)}, ${yScale(i) + yScale.bandwidth() / 2})`)
      .style('cursor', 'pointer');

    // Add event circles
    eventGroups.append('circle')
      .attr('r', d => 8 + (d.confidence * 6))
      .attr('fill', d => getEventColor(d.type))
      .attr('stroke', '#FFFFFF')
      .attr('stroke-width', 2)
      .attr('opacity', 0.8);

    // Add event lines to timeline
    eventGroups.append('line')
      .attr('x1', 0)
      .attr('x2', 0)
      .attr('y1', 0)
      .attr('y2', height / 2 - yScale(0))
      .attr('stroke', d => getEventColor(d.type))
      .attr('stroke-width', 1)
      .attr('stroke-dasharray', '3,3')
      .attr('opacity', 0.5);

    // Add event labels
    eventGroups.append('text')
      .text(d => d.title)
      .attr('text-anchor', 'middle')
      .attr('dy', -20)
      .attr('font-size', '11px')
      .attr('fill', '#374151')
      .attr('font-weight', '500');

    // Add confidence indicators
    eventGroups.append('text')
      .text(d => `${Math.round(d.confidence * 100)}%`)
      .attr('text-anchor', 'middle')
      .attr('dy', 25)
      .attr('font-size', '9px')
      .attr('fill', '#6B7280')
      .attr('font-weight', '600');

    // Event click handler
    eventGroups.on('click', (event, d) => {
      onEventSelect(d);
      
      // Highlight selected event
      eventGroups.selectAll('circle')
        .attr('stroke-width', n => n.id === d.id ? 4 : 2)
        .attr('stroke', n => n.id === d.id ? '#F59E0B' : '#FFFFFF');
    });

  }, [data, onEventSelect]);

  const timeRangeOptions = [
    { value: '1d', label: '24 Hours' },
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' },
    { value: '90d', label: '90 Days' }
  ];

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    // Animation logic would go here
  };

  return (
    <div className="h-full bg-surface border border-border rounded-lg">
      {/* Timeline Controls */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-4">
          <h3 className="text-lg font-semibold text-text-primary">Event Timeline</h3>
          <div className="flex bg-background rounded-lg p-1">
            {timeRangeOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setTimeRange(option.value)}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-micro ${
                  timeRange === option.value
                    ? 'bg-primary text-primary-foreground'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            iconName={isPlaying ? 'Pause' : 'Play'}
            onClick={handlePlayPause}
          >
            {isPlaying ? 'Pause' : 'Play'}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            iconName="RotateCcw"
            onClick={() => console.log('Reset timeline')}
          >
            Reset
          </Button>
        </div>
      </div>

      {/* Timeline Visualization */}
      <div className="p-4">
        <svg
          ref={svgRef}
          width="100%"
          height="400"
          className="bg-background rounded-lg"
        />
      </div>

      {/* Event Legend */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <h4 className="text-sm font-medium text-text-primary">Event Types:</h4>
            {Object.entries({
              communication: 'Communication',
              network: 'Network',
              social: 'Social Media',
              financial: 'Financial',
              location: 'Location'
            }).map(([type, label]) => (
              <div key={type} className="flex items-center space-x-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: getEventColor(type) }}
                />
                <span className="text-xs text-text-secondary">{label}</span>
              </div>
            ))}
          </div>
          <div className="text-xs text-text-secondary">
            Total Events: {mockTimelineData.length}
          </div>
        </div>
      </div>

      {/* Event Details Panel */}
      {selectedEvent && (
        <div className="absolute right-4 top-20 w-80 bg-surface border border-border rounded-lg shadow-elevated p-4 z-10">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <Icon name={getEventIcon(selectedEvent.type)} size={16} />
              <h4 className="text-sm font-medium text-text-primary">Event Details</h4>
            </div>
            <Button
              variant="ghost"
              size="xs"
              iconName="X"
              onClick={() => onEventSelect(null)}
            />
          </div>
          
          <div className="space-y-3">
            <div>
              <h5 className="text-sm font-medium text-text-primary mb-1">
                {selectedEvent.title}
              </h5>
              <p className="text-xs text-text-secondary">
                {selectedEvent.description}
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-text-secondary">Type:</span>
                <div className="font-medium text-text-primary capitalize">
                  {selectedEvent.type}
                </div>
              </div>
              <div>
                <span className="text-text-secondary">Confidence:</span>
                <div className="font-medium text-text-primary">
                  {Math.round(selectedEvent.confidence * 100)}%
                </div>
              </div>
              <div>
                <span className="text-text-secondary">Source:</span>
                <div className="font-medium text-text-primary">
                  {selectedEvent.source}
                </div>
              </div>
              <div>
                <span className="text-text-secondary">Time:</span>
                <div className="font-medium text-text-primary">
                  {selectedEvent.timestamp.toLocaleString()}
                </div>
              </div>
            </div>
            
            <div>
              <span className="text-xs text-text-secondary">Related Entities:</span>
              <div className="mt-1 space-y-1">
                {selectedEvent.entities.map((entity, index) => (
                  <div key={index} className="text-xs bg-background px-2 py-1 rounded">
                    {entity}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex space-x-2 pt-2">
              <Button variant="primary" size="xs" fullWidth>
                Investigate
              </Button>
              <Button variant="outline" size="xs" fullWidth>
                Add Note
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimelineVisualization;