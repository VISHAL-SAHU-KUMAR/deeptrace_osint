import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const GeospatialMapVisualization = ({ data, onLocationSelect, selectedLocation }) => {
  const [mapType, setMapType] = useState('roadmap');
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const mockLocationData = [
    {
      id: 'loc1',
      lat: 40.7128,
      lng: -74.0060,
      title: 'New York Office',
      type: 'office',
      confidence: 0.95,
      description: 'Primary business location with high activity',
      events: 15,
      lastActivity: '2 hours ago'
    },
    {
      id: 'loc2',
      lat: 40.7589,
      lng: -73.9851,
      title: 'Times Square Meeting',
      type: 'meeting',
      confidence: 0.87,
      description: 'Suspicious meeting location identified',
      events: 3,
      lastActivity: '1 day ago'
    },
    {
      id: 'loc3',
      lat: 40.6892,
      lng: -74.0445,
      title: 'Brooklyn Residence',
      type: 'residence',
      confidence: 0.92,
      description: 'Target residence with regular activity',
      events: 8,
      lastActivity: '6 hours ago'
    },
    {
      id: 'loc4',
      lat: 40.7505,
      lng: -73.9934,
      title: 'Financial District',
      type: 'financial',
      confidence: 0.78,
      description: 'Financial transactions traced to this area',
      events: 12,
      lastActivity: '30 minutes ago'
    }
  ];

  const getLocationColor = (type) => {
    const colors = {
      office: '#3B82F6',
      meeting: '#EF4444',
      residence: '#10B981',
      financial: '#F59E0B',
      unknown: '#6B7280'
    };
    return colors[type] || colors.unknown;
  };

  const getLocationIcon = (type) => {
    const icons = {
      office: 'Building',
      meeting: 'Users',
      residence: 'Home',
      financial: 'DollarSign',
      unknown: 'MapPin'
    };
    return icons[type] || icons.unknown;
  };

  const mapTypeOptions = [
    { value: 'roadmap', label: 'Road' },
    { value: 'satellite', label: 'Satellite' },
    { value: 'hybrid', label: 'Hybrid' },
    { value: 'terrain', label: 'Terrain' }
  ];

  // Calculate center point for map
  const centerLat = mockLocationData.reduce((sum, loc) => sum + loc.lat, 0) / mockLocationData.length;
  const centerLng = mockLocationData.reduce((sum, loc) => sum + loc.lng, 0) / mockLocationData.length;

  return (
    <div className={`relative bg-surface border border-border rounded-lg ${isFullscreen ? 'fixed inset-0 z-50' : 'h-full'}`}>
      {/* Map Controls */}
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
          iconName="Layers"
          onClick={() => setShowHeatmap(!showHeatmap)}
          className={`bg-surface shadow-primary ${showHeatmap ? 'text-primary' : ''}`}
        />
        <Button
          variant="ghost"
          size="sm"
          iconName="RotateCcw"
          onClick={() => console.log('Reset map view')}
          className="bg-surface shadow-primary"
        />
      </div>

      {/* Map Type Selector */}
      <div className="absolute top-4 left-4 z-10 bg-surface rounded-lg shadow-primary p-2">
        <div className="flex space-x-1">
          {mapTypeOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setMapType(option.value)}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-micro ${
                mapType === option.value
                  ? 'bg-primary text-primary-foreground'
                  : 'text-text-secondary hover:text-text-primary hover:bg-background'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Location Statistics */}
      <div className="absolute bottom-4 left-4 z-10 bg-surface rounded-lg shadow-primary p-3">
        <h4 className="text-sm font-medium text-text-primary mb-2">Location Summary</h4>
        <div className="space-y-1 text-xs">
          <div className="flex justify-between">
            <span className="text-text-secondary">Total Locations:</span>
            <span className="font-medium text-text-primary">{mockLocationData.length}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-secondary">Active Events:</span>
            <span className="font-medium text-text-primary">
              {mockLocationData.reduce((sum, loc) => sum + loc.events, 0)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-secondary">Avg Confidence:</span>
            <span className="font-medium text-text-primary">
              {Math.round((mockLocationData.reduce((sum, loc) => sum + loc.confidence, 0) / mockLocationData.length) * 100)}%
            </span>
          </div>
        </div>
      </div>

      {/* Google Maps Iframe */}
      <div className="relative w-full h-full rounded-lg overflow-hidden">
        <iframe
          width="100%"
          height={isFullscreen ? '100vh' : '600px'}
          loading="lazy"
          title="Intelligence Analysis Map"
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps?q=${centerLat},${centerLng}&z=12&output=embed&maptype=${mapType}`}
          className="border-0"
        />

        {/* Custom Location Markers Overlay */}
        <div className="absolute inset-0 pointer-events-none">
          {mockLocationData.map((location, index) => (
            <div
              key={location.id}
              className="absolute pointer-events-auto"
              style={{
                left: `${20 + (index * 15)}%`,
                top: `${30 + (index * 10)}%`,
                transform: 'translate(-50%, -50%)'
              }}
            >
              <button
                onClick={() => onLocationSelect(location)}
                className={`relative flex items-center justify-center w-8 h-8 rounded-full shadow-elevated transition-micro hover:scale-110 ${
                  selectedLocation?.id === location.id ? 'ring-2 ring-accent' : ''
                }`}
                style={{ backgroundColor: getLocationColor(location.type) }}
                title={location.title}
              >
                <Icon
                  name={getLocationIcon(location.type)}
                  size={16}
                  className="text-white"
                />
                {location.events > 0 && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-error text-white text-xs rounded-full flex items-center justify-center font-bold">
                    {location.events > 9 ? '9+' : location.events}
                  </div>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Location Legend */}
      <div className="absolute bottom-4 right-4 z-10 bg-surface rounded-lg shadow-primary p-3">
        <h4 className="text-sm font-medium text-text-primary mb-2">Location Types</h4>
        <div className="space-y-1">
          {Object.entries({
            office: 'Office',
            meeting: 'Meeting',
            residence: 'Residence',
            financial: 'Financial'
          }).map(([type, label]) => (
            <div key={type} className="flex items-center space-x-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: getLocationColor(type) }}
              />
              <span className="text-xs text-text-secondary">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Location Details Panel */}
      {selectedLocation && (
        <div className="absolute top-20 right-4 w-80 bg-surface border border-border rounded-lg shadow-elevated p-4 z-20">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: getLocationColor(selectedLocation.type) }}
              />
              <h4 className="text-sm font-medium text-text-primary">Location Details</h4>
            </div>
            <Button
              variant="ghost"
              size="xs"
              iconName="X"
              onClick={() => onLocationSelect(null)}
            />
          </div>
          
          <div className="space-y-3">
            <div>
              <h5 className="text-sm font-medium text-text-primary mb-1">
                {selectedLocation.title}
              </h5>
              <p className="text-xs text-text-secondary">
                {selectedLocation.description}
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-text-secondary">Type:</span>
                <div className="font-medium text-text-primary capitalize">
                  {selectedLocation.type}
                </div>
              </div>
              <div>
                <span className="text-text-secondary">Confidence:</span>
                <div className="font-medium text-text-primary">
                  {Math.round(selectedLocation.confidence * 100)}%
                </div>
              </div>
              <div>
                <span className="text-text-secondary">Events:</span>
                <div className="font-medium text-text-primary">
                  {selectedLocation.events}
                </div>
              </div>
              <div>
                <span className="text-text-secondary">Last Activity:</span>
                <div className="font-medium text-text-primary">
                  {selectedLocation.lastActivity}
                </div>
              </div>
            </div>
            
            <div>
              <span className="text-xs text-text-secondary">Coordinates:</span>
              <div className="text-xs font-mono bg-background px-2 py-1 rounded mt-1">
                {selectedLocation.lat.toFixed(4)}, {selectedLocation.lng.toFixed(4)}
              </div>
            </div>
            
            <div className="flex space-x-2 pt-2">
              <Button variant="primary" size="xs" fullWidth>
                Investigate
              </Button>
              <Button variant="outline" size="xs" fullWidth>
                Add Marker
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GeospatialMapVisualization;