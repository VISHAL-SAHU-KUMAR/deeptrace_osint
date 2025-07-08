import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import SourceTreePanel from './components/SourceTreePanel';
import CollectionConfigPanel from './components/CollectionConfigPanel';
import ResultsStreamPanel from './components/ResultsStreamPanel';
import MonitoringPanel from './components/MonitoringPanel';
import Icon from '../../components/AppIcon';


const MultiSourceDataCollection = () => {
  const [activeView, setActiveView] = useState('collection');
  const [sources, setSources] = useState([]);
  const [results, setResults] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [systemStatus, setSystemStatus] = useState({});

  useEffect(() => {
    // Initialize mock data
    const mockSources = [
      {
        id: 'social-media',
        name: 'Social Media',
        icon: 'Users',
        sources: [
          {
            id: 'twitter-api',
            name: 'Twitter API v2',
            status: 'active',
            enabled: true,
            isPremium: true,
            rateLimit: { current: 450, max: 500 },
            lastSync: '2 min ago'
          },
          {
            id: 'linkedin-api',
            name: 'LinkedIn API',
            status: 'active',
            enabled: true,
            isPremium: true,
            rateLimit: { current: 180, max: 200 },
            lastSync: '5 min ago'
          },
          {
            id: 'facebook-api',
            name: 'Facebook Graph API',
            status: 'warning',
            enabled: false,
            isPremium: true,
            rateLimit: { current: 95, max: 100 },
            lastSync: '1 hour ago'
          }
        ]
      },
      {
        id: 'domain-analysis',
        name: 'Domain Analysis',
        icon: 'Globe',
        sources: [
          {
            id: 'whois-api',
            name: 'WHOIS Lookup',
            status: 'active',
            enabled: true,
            isPremium: false,
            rateLimit: { current: 25, max: 100 },
            lastSync: '1 min ago'
          },
          {
            id: 'dns-api',
            name: 'DNS Resolution',
            status: 'active',
            enabled: true,
            isPremium: false,
            rateLimit: { current: 340, max: 1000 },
            lastSync: '30 sec ago'
          },
          {
            id: 'ssl-api',
            name: 'SSL Certificate',
            status: 'error',
            enabled: false,
            isPremium: false,
            rateLimit: { current: 0, max: 50 },
            lastSync: '2 hours ago'
          }
        ]
      },
      {
        id: 'threat-intel',
        name: 'Threat Intelligence',
        icon: 'Shield',
        sources: [
          {
            id: 'virustotal-api',
            name: 'VirusTotal',
            status: 'active',
            enabled: true,
            isPremium: true,
            rateLimit: { current: 15, max: 20 },
            lastSync: '3 min ago'
          },
          {
            id: 'shodan-api',
            name: 'Shodan',
            status: 'active',
            enabled: true,
            isPremium: true,
            rateLimit: { current: 8, max: 10 },
            lastSync: '1 min ago'
          }
        ]
      },
      {
        id: 'dark-web',
        name: 'Dark Web Monitoring',
        icon: 'Eye',
        sources: [
          {
            id: 'tor-monitor',
            name: 'Tor Network Monitor',
            status: 'active',
            enabled: true,
            isPremium: true,
            rateLimit: { current: 5, max: 10 },
            lastSync: '10 min ago'
          },
          {
            id: 'paste-monitor',
            name: 'Paste Site Monitor',
            status: 'warning',
            enabled: true,
            isPremium: false,
            rateLimit: { current: 45, max: 50 },
            lastSync: '15 min ago'
          }
        ]
      }
    ];

    const mockResults = [
      {
        id: 'result-001',
        target: 'example.com',
        source: 'whois',
        status: 'completed',
        timestamp: new Date(Date.now() - 300000).toISOString(),
        recordCount: 15,
        qualityScore: 92,
        dataSize: '2.3 KB',
        preview: 'Domain registered 2019-03-15, Registrar: GoDaddy, Name servers: ns1.example.com, ns2.example.com',
        jobId: 'job-12345',
        duration: '1.2s',
        apiCalls: 3,
        cost: '0.05',
        sourceAttribution: 'WHOIS Database',
        confidence: 95,
        lastUpdated: '2024-01-15 14:30:00',
        verification: 'Verified',
        errors: []
      },
      {
        id: 'result-002',
        target: '@johndoe',
        source: 'twitter',
        status: 'processing',
        timestamp: new Date(Date.now() - 120000).toISOString(),
        recordCount: 0,
        qualityScore: 0,
        dataSize: '0 KB',
        preview: 'Collecting tweets, followers, and profile information...',
        jobId: 'job-12346',
        duration: '2m 15s',
        apiCalls: 12,
        cost: '0.24',
        sourceAttribution: 'Twitter API v2',
        confidence: 0,
        lastUpdated: '',
        verification: 'Pending',
        errors: []
      },
      {
        id: 'result-003',
        target: '192.168.1.1',
        source: 'threat-intel',
        status: 'completed',
        timestamp: new Date(Date.now() - 600000).toISOString(),
        recordCount: 8,
        qualityScore: 78,
        dataSize: '1.8 KB',
        preview: 'IP reputation: Clean, Geolocation: United States, ISP: Comcast, No malware associations found',
        jobId: 'job-12347',
        duration: '0.8s',
        apiCalls: 5,
        cost: '0.15',
        sourceAttribution: 'VirusTotal API',
        confidence: 88,
        lastUpdated: '2024-01-15 14:20:00',
        verification: 'Verified',
        errors: ['Rate limit warning: 18/20 requests used']
      },
      {
        id: 'result-004',
        target: 'user@example.com',
        source: 'email',
        status: 'failed',
        timestamp: new Date(Date.now() - 900000).toISOString(),
        recordCount: 0,
        qualityScore: 0,
        dataSize: '0 KB',
        preview: 'Email validation failed - invalid format or domain not found',
        jobId: 'job-12348',
        duration: '5.2s',
        apiCalls: 2,
        cost: '0.02',
        sourceAttribution: 'Email Validation API',
        confidence: 0,
        lastUpdated: '',
        verification: 'Failed',
        errors: ['Invalid email format', 'Domain not found in MX records']
      }
    ];

    const mockJobs = [
      {
        id: 'job-12345',
        name: 'Domain Investigation - example.com',
        status: 'completed',
        progress: 100,
        startTime: new Date(Date.now() - 1800000).toISOString(),
        duration: '15m 32s',
        targetCount: 1,
        recordsCollected: 15,
        currentTask: null,
        errors: []
      },
      {
        id: 'job-12346',
        name: 'Social Media Sweep - @johndoe',
        status: 'running',
        progress: 65,
        startTime: new Date(Date.now() - 900000).toISOString(),
        duration: '15m 0s',
        targetCount: 1,
        recordsCollected: 42,
        currentTask: 'Collecting follower network data...',
        errors: []
      },
      {
        id: 'job-12347',
        name: 'Bulk IP Analysis',
        status: 'queued',
        progress: 0,
        startTime: null,
        duration: '0s',
        targetCount: 250,
        recordsCollected: 0,
        currentTask: 'Waiting for available API quota...',
        errors: []
      },
      {
        id: 'job-12348',
        name: 'Email Validation Batch',
        status: 'failed',
        progress: 25,
        startTime: new Date(Date.now() - 3600000).toISOString(),
        duration: '5m 12s',
        targetCount: 100,
        recordsCollected: 25,
        currentTask: null,
        errors: ['API authentication failed', 'Rate limit exceeded']
      }
    ];

    const mockSystemStatus = {
      overall: 'healthy',
      cpu: 45,
      memory: 62,
      apiQuota: 78,
      storage: '2.3 TB / 5.0 TB'
    };

    setSources(mockSources);
    setResults(mockResults);
    setJobs(mockJobs);
    setSystemStatus(mockSystemStatus);
  }, []);

  const handleSourceToggle = (sourceId) => {
    setSources(prevSources => 
      prevSources.map(category => ({
        ...category,
        sources: category.sources.map(source =>
          source.id === sourceId
            ? { ...source, enabled: !source.enabled }
            : source
        )
      }))
    );
  };

  const handleSourceConfig = (sourceId) => {
    console.log('Configure source:', sourceId);
  };

  const handleStartCollection = (config) => {
    console.log('Starting collection with config:', config);
    // Add new job to jobs list
    const newJob = {
      id: `job-${Date.now()}`,
      name: `Collection Job - ${config.targets.length} targets`,
      status: 'running',
      progress: 0,
      startTime: new Date().toISOString(),
      duration: '0s',
      targetCount: config.targets.length,
      recordsCollected: 0,
      currentTask: 'Initializing collection...',
      errors: []
    };
    setJobs(prev => [newJob, ...prev]);
  };

  const handleBulkUpload = (file) => {
    console.log('Processing bulk upload:', file.name);
  };

  const handleExport = () => {
    console.log('Exporting results...');
  };

  const handleViewDetails = (resultId) => {
    console.log('Viewing details for result:', resultId);
  };

  const handleJobControl = (jobId, action) => {
    console.log(`Job ${action}:`, jobId);
    setJobs(prev =>
      prev.map(job =>
        job.id === jobId
          ? {
              ...job,
              status: action === 'pause' ? 'paused' : 
                     action === 'resume' ? 'running' : 
                     action === 'stop' ? 'completed' : job.status
            }
          : job
      )
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar />
      
      <main className="ml-64 mt-16 h-[calc(100vh-4rem)]">
        <div className="h-full flex flex-col">
          {/* Top Navigation Bar */}
          <div className="bg-surface border-b border-border px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-heading font-bold text-text-primary">
                  Multi-Source Data Collection
                </h1>
                <p className="text-text-secondary mt-1">
                  Orchestrate automated intelligence gathering across multiple OSINT platforms
                </p>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-sm">
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-success rounded-full pulse-subtle" />
                    <span className="text-text-secondary">
                      {sources.reduce((acc, cat) => acc + cat.sources.filter(s => s.status === 'active').length, 0)} sources active
                    </span>
                  </div>
                  <span className="text-text-tertiary">•</span>
                  <span className="text-text-secondary">
                    {jobs.filter(j => j.status === 'running').length} jobs running
                  </span>
                </div>
                
                <div className="flex space-x-1 bg-background rounded-lg p-1">
                  <button
                    onClick={() => setActiveView('collection')}
                    className={`px-3 py-2 text-sm font-medium rounded-md transition-micro ${
                      activeView === 'collection' ?'bg-surface text-text-primary shadow-sm' :'text-text-secondary hover:text-text-primary'
                    }`}
                  >
                    Collection
                  </button>
                  <button
                    onClick={() => setActiveView('monitoring')}
                    className={`px-3 py-2 text-sm font-medium rounded-md transition-micro ${
                      activeView === 'monitoring' ?'bg-surface text-text-primary shadow-sm' :'text-text-secondary hover:text-text-primary'
                    }`}
                  >
                    Monitoring
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 flex overflow-hidden">
            {activeView === 'collection' ? (
              <>
                {/* Left Panel - Source Tree (25%) */}
                <div className="w-1/4 min-w-[300px]">
                  <SourceTreePanel
                    sources={sources}
                    onSourceToggle={handleSourceToggle}
                    onSourceConfig={handleSourceConfig}
                  />
                </div>

                {/* Center Panel - Configuration (35%) */}
                <div className="w-[35%] min-w-[400px]">
                  <CollectionConfigPanel
                    onStartCollection={handleStartCollection}
                    onBulkUpload={handleBulkUpload}
                  />
                </div>

                {/* Right Panel - Results Stream (40%) */}
                <div className="flex-1">
                  <ResultsStreamPanel
                    results={results}
                    onExport={handleExport}
                    onViewDetails={handleViewDetails}
                  />
                </div>
              </>
            ) : (
              <>
                {/* Left Panel - Source Tree (25%) */}
                <div className="w-1/4 min-w-[300px]">
                  <SourceTreePanel
                    sources={sources}
                    onSourceToggle={handleSourceToggle}
                    onSourceConfig={handleSourceConfig}
                  />
                </div>

                {/* Center Panel - Results Stream (50%) */}
                <div className="flex-1">
                  <ResultsStreamPanel
                    results={results}
                    onExport={handleExport}
                    onViewDetails={handleViewDetails}
                  />
                </div>

                {/* Right Panel - Monitoring (25%) */}
                <div className="w-1/4 min-w-[300px]">
                  <MonitoringPanel
                    jobs={jobs}
                    systemStatus={systemStatus}
                    onJobControl={handleJobControl}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </main>

      {/* Keyboard Shortcuts Overlay */}
      <div className="fixed bottom-4 right-4 z-50">
        <div className="bg-surface border border-border rounded-lg shadow-elevated p-3 text-xs">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Keyboard" size={14} className="text-text-secondary" />
            <span className="font-medium text-text-primary">Shortcuts</span>
          </div>
          <div className="space-y-1 text-text-secondary">
            <div className="flex justify-between">
              <span>New source</span>
              <kbd className="px-1 py-0.5 bg-secondary-100 rounded text-xs">Ctrl+N</kbd>
            </div>
            <div className="flex justify-between">
              <span>Preview</span>
              <kbd className="px-1 py-0.5 bg-secondary-100 rounded text-xs">Space</kbd>
            </div>
            <div className="flex justify-between">
              <span>Start collection</span>
              <kbd className="px-1 py-0.5 bg-secondary-100 rounded text-xs">Ctrl+Enter</kbd>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiSourceDataCollection;