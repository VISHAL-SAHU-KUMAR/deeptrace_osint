import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MonitoringPanel = ({ jobs, systemStatus, onJobControl }) => {
  const [activeTab, setActiveTab] = useState('active');

  const getJobStatusColor = (status) => {
    switch (status) {
      case 'running': return 'text-success';
      case 'queued': return 'text-warning';
      case 'completed': return 'text-primary';
      case 'failed': return 'text-error';
      case 'paused': return 'text-text-secondary';
      default: return 'text-text-secondary';
    }
  };

  const getJobStatusIcon = (status) => {
    switch (status) {
      case 'running': return 'Play';
      case 'queued': return 'Clock';
      case 'completed': return 'CheckCircle';
      case 'failed': return 'XCircle';
      case 'paused': return 'Pause';
      default: return 'Circle';
    }
  };

  const filteredJobs = jobs.filter(job => {
    if (activeTab === 'active') return ['running', 'queued', 'paused'].includes(job.status);
    if (activeTab === 'completed') return job.status === 'completed';
    if (activeTab === 'failed') return job.status === 'failed';
    return true;
  });

  return (
    <div className="h-full bg-surface border-l border-border">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-heading font-semibold text-text-primary">
            Collection Monitor
          </h3>
          <Button
            variant="ghost"
            size="sm"
            iconName="Settings"
            onClick={() => console.log('Monitor settings')}
          />
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <div className="text-2xl font-heading font-bold text-success">
              {jobs.filter(j => j.status === 'running').length}
            </div>
            <div className="text-xs text-text-secondary">Active Jobs</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-heading font-bold text-warning">
              {jobs.filter(j => j.status === 'queued').length}
            </div>
            <div className="text-xs text-text-secondary">Queued</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-heading font-bold text-primary">
              {jobs.filter(j => j.status === 'completed').length}
            </div>
            <div className="text-xs text-text-secondary">Completed</div>
          </div>
        </div>

        <div className="flex space-x-1 bg-background rounded-lg p-1">
          {['active', 'completed', 'failed'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-micro ${
                activeTab === tab
                  ? 'bg-surface text-text-primary shadow-sm'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {filteredJobs.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-8">
            <Icon name="Activity" size={48} className="text-text-tertiary mb-4" />
            <h4 className="text-lg font-heading font-medium text-text-primary mb-2">
              No {activeTab} Jobs
            </h4>
            <p className="text-text-secondary">
              {activeTab === 'active' && 'No collection jobs are currently running.'}
              {activeTab === 'completed' && 'No completed jobs to display.'}
              {activeTab === 'failed' && 'No failed jobs found.'}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {filteredJobs.map((job) => (
              <div key={job.id} className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start space-x-3">
                    <Icon
                      name={getJobStatusIcon(job.status)}
                      size={16}
                      className={getJobStatusColor(job.status)}
                    />
                    <div>
                      <h4 className="text-sm font-medium text-text-primary">
                        {job.name}
                      </h4>
                      <p className="text-xs text-text-secondary">
                        Job ID: {job.id}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    {job.status === 'running' && (
                      <Button
                        variant="ghost"
                        size="xs"
                        iconName="Pause"
                        onClick={() => onJobControl(job.id, 'pause')}
                      />
                    )}
                    {job.status === 'paused' && (
                      <Button
                        variant="ghost"
                        size="xs"
                        iconName="Play"
                        onClick={() => onJobControl(job.id, 'resume')}
                      />
                    )}
                    <Button
                      variant="ghost"
                      size="xs"
                      iconName="Square"
                      onClick={() => onJobControl(job.id, 'stop')}
                    />
                    <Button
                      variant="ghost"
                      size="xs"
                      iconName="MoreVertical"
                      onClick={() => console.log('Job options', job.id)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-text-secondary">Progress</span>
                    <span className="text-text-primary">{job.progress}%</span>
                  </div>
                  <div className="w-full bg-secondary-100 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all ${
                        job.status === 'failed' ? 'bg-error' :
                        job.status === 'completed'? 'bg-success' : 'bg-primary'
                      }`}
                      style={{ width: `${job.progress}%` }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-3 text-xs">
                  <div>
                    <span className="text-text-secondary">Started:</span>
                    <div className="text-text-primary">
                      {new Date(job.startTime).toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <span className="text-text-secondary">Duration:</span>
                    <div className="text-text-primary">{job.duration}</div>
                  </div>
                  <div>
                    <span className="text-text-secondary">Targets:</span>
                    <div className="text-text-primary">{job.targetCount}</div>
                  </div>
                  <div>
                    <span className="text-text-secondary">Collected:</span>
                    <div className="text-text-primary">{job.recordsCollected}</div>
                  </div>
                </div>

                {job.currentTask && (
                  <div className="mt-3 p-2 bg-background rounded">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full pulse-subtle" />
                      <span className="text-xs text-text-primary">
                        {job.currentTask}
                      </span>
                    </div>
                  </div>
                )}

                {job.errors && job.errors.length > 0 && (
                  <div className="mt-3">
                    <div className="text-xs text-error mb-1">
                      {job.errors.length} error(s)
                    </div>
                    <div className="text-xs text-text-secondary">
                      {job.errors[0]} {job.errors.length > 1 && `(+${job.errors.length - 1} more)`}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="p-4 border-t border-border">
        <div className="mb-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-text-primary">
              System Status
            </span>
            <div className={`flex items-center space-x-1 ${
              systemStatus.overall === 'healthy' ? 'text-success' :
              systemStatus.overall === 'warning'? 'text-warning' : 'text-error'
            }`}>
              <div className="w-2 h-2 bg-current rounded-full pulse-subtle" />
              <span className="text-xs capitalize">{systemStatus.overall}</span>
            </div>
          </div>
          
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-text-secondary">CPU Usage:</span>
              <span className="text-text-primary">{systemStatus.cpu}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Memory:</span>
              <span className="text-text-primary">{systemStatus.memory}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">API Quota:</span>
              <span className="text-text-primary">{systemStatus.apiQuota}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Storage:</span>
              <span className="text-text-primary">{systemStatus.storage}</span>
            </div>
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          fullWidth
          iconName="BarChart3"
          onClick={() => console.log('View detailed metrics')}
        >
          View Metrics
        </Button>
      </div>
    </div>
  );
};

export default MonitoringPanel;