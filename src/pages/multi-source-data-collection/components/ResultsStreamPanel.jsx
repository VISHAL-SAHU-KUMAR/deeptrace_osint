import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ResultsStreamPanel = ({ results, onExport, onViewDetails }) => {
  const [expandedRows, setExpandedRows] = useState(new Set());
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('timestamp');

  const toggleRowExpansion = (resultId) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(resultId)) {
      newExpanded.delete(resultId);
    } else {
      newExpanded.add(resultId);
    }
    setExpandedRows(newExpanded);
  };

  const getSourceIcon = (source) => {
    const iconMap = {
      'twitter': 'Twitter',
      'linkedin': 'Linkedin',
      'facebook': 'Facebook',
      'whois': 'Globe',
      'dns': 'Server',
      'ssl': 'Shield',
      'email': 'Mail',
      'phone': 'Phone',
      'image': 'Image',
      'threat-intel': 'AlertTriangle'
    };
    return iconMap[source] || 'Database';
  };

  const getQualityColor = (score) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-error';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-success';
      case 'processing': return 'text-warning';
      case 'failed': return 'text-error';
      case 'queued': return 'text-text-secondary';
      default: return 'text-text-secondary';
    }
  };

  const filteredResults = results.filter(result => {
    if (filterType === 'all') return true;
    return result.source === filterType;
  });

  const sortedResults = [...filteredResults].sort((a, b) => {
    switch (sortBy) {
      case 'timestamp':
        return new Date(b.timestamp) - new Date(a.timestamp);
      case 'quality':
        return b.qualityScore - a.qualityScore;
      case 'source':
        return a.source.localeCompare(b.source);
      default:
        return 0;
    }
  });

  return (
    <div className="h-full bg-surface flex flex-col">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-heading font-semibold text-text-primary">
            Collection Results
          </h3>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              iconName="Download"
              onClick={onExport}
            >
              Export
            </Button>
            <Button
              variant="ghost"
              size="sm"
              iconName="RefreshCw"
              onClick={() => console.log('Refresh results')}
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-1.5 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">All Sources</option>
              <option value="twitter">Twitter</option>
              <option value="linkedin">LinkedIn</option>
              <option value="whois">WHOIS</option>
              <option value="dns">DNS</option>
              <option value="threat-intel">Threat Intel</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-1.5 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="timestamp">Latest First</option>
              <option value="quality">Quality Score</option>
              <option value="source">Source</option>
            </select>
          </div>

          <div className="flex items-center space-x-4 text-sm text-text-secondary">
            <span>{sortedResults.length} results</span>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-success rounded-full pulse-subtle" />
              <span>Live</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {sortedResults.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-8">
            <Icon name="Database" size={48} className="text-text-tertiary mb-4" />
            <h4 className="text-lg font-heading font-medium text-text-primary mb-2">
              No Results Yet
            </h4>
            <p className="text-text-secondary max-w-md">
              Start a collection job to see real-time results from your configured data sources.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {sortedResults.map((result) => (
              <div key={result.id} className="p-4 hover:bg-background transition-micro">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    <button
                      onClick={() => toggleRowExpansion(result.id)}
                      className="mt-1 p-1 hover:bg-secondary-100 rounded transition-micro"
                    >
                      <Icon
                        name={expandedRows.has(result.id) ? 'ChevronDown' : 'ChevronRight'}
                        size={16}
                        className="text-text-secondary"
                      />
                    </button>

                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <Icon
                          name={getSourceIcon(result.source)}
                          size={16}
                          className="text-primary"
                        />
                        <span className="text-sm font-medium text-text-primary">
                          {result.target}
                        </span>
                        <span className="px-2 py-1 text-xs bg-secondary-100 text-text-secondary rounded">
                          {result.source}
                        </span>
                        <span className={`text-xs ${getStatusColor(result.status)}`}>
                          {result.status}
                        </span>
                      </div>

                      <div className="flex items-center space-x-4 text-xs text-text-secondary mb-2">
                        <span>
                          {new Date(result.timestamp).toLocaleString()}
                        </span>
                        <span>
                          {result.recordCount} records
                        </span>
                        <span className={getQualityColor(result.qualityScore)}>
                          Quality: {result.qualityScore}%
                        </span>
                        <span>
                          Size: {result.dataSize}
                        </span>
                      </div>

                      {result.preview && (
                        <div className="text-sm text-text-secondary line-clamp-2">
                          {result.preview}
                        </div>
                      )}

                      {expandedRows.has(result.id) && (
                        <div className="mt-3 p-3 bg-background rounded-lg">
                          <div className="grid grid-cols-2 gap-4 mb-3">
                            <div>
                              <h5 className="text-xs font-medium text-text-primary mb-1">
                                Collection Details
                              </h5>
                              <div className="space-y-1 text-xs text-text-secondary">
                                <div>Job ID: {result.jobId}</div>
                                <div>Duration: {result.duration}</div>
                                <div>API Calls: {result.apiCalls}</div>
                                <div>Cost: ${result.cost}</div>
                              </div>
                            </div>
                            <div>
                              <h5 className="text-xs font-medium text-text-primary mb-1">
                                Data Attribution
                              </h5>
                              <div className="space-y-1 text-xs text-text-secondary">
                                <div>Source: {result.sourceAttribution}</div>
                                <div>Confidence: {result.confidence}%</div>
                                <div>Last Updated: {result.lastUpdated}</div>
                                <div>Verification: {result.verification}</div>
                              </div>
                            </div>
                          </div>

                          {result.errors && result.errors.length > 0 && (
                            <div className="mb-3">
                              <h5 className="text-xs font-medium text-error mb-1">
                                Errors & Warnings
                              </h5>
                              <div className="space-y-1">
                                {result.errors.map((error, index) => (
                                  <div key={index} className="text-xs text-error">
                                    {error}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="xs"
                              iconName="Eye"
                              onClick={() => onViewDetails(result.id)}
                            >
                              View Details
                            </Button>
                            <Button
                              variant="ghost"
                              size="xs"
                              iconName="Download"
                              onClick={() => console.log('Download result', result.id)}
                            >
                              Download
                            </Button>
                            <Button
                              variant="ghost"
                              size="xs"
                              iconName="Share"
                              onClick={() => console.log('Share result', result.id)}
                            >
                              Share
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 ml-4">
                    {result.status === 'processing' && (
                      <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                    )}
                    <Button
                      variant="ghost"
                      size="xs"
                      iconName="MoreVertical"
                      onClick={() => console.log('More options', result.id)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {sortedResults.length > 0 && (
        <div className="p-4 border-t border-border">
          <div className="flex items-center justify-between text-sm text-text-secondary">
            <div>
              Showing {sortedResults.length} of {results.length} results
            </div>
            <div className="flex items-center space-x-4">
              <span>Total data collected: 2.3 GB</span>
              <span>Average quality: 78%</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultsStreamPanel;