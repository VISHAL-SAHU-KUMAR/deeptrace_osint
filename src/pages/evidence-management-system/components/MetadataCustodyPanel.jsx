import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';


const MetadataCustodyPanel = ({ selectedEvidence }) => {
  const [activeTab, setActiveTab] = useState('metadata');
  const [isEditing, setIsEditing] = useState(false);

  if (!selectedEvidence) {
    return (
      <div className="h-full bg-surface border-l border-border flex items-center justify-center">
        <div className="text-center">
          <Icon name="FileSearch" size={48} className="text-text-secondary mx-auto mb-4" />
          <p className="text-text-secondary">Select evidence to view details</p>
        </div>
      </div>
    );
  }

  const custodyChain = [
    {
      id: 1,
      action: 'Evidence Collected',
      custodian: 'Detective J. Smith',
      timestamp: '2024-01-15T10:30:00Z',
      location: 'Crime Scene - 123 Main St',
      signature: 'Digital Signature Verified',
      notes: 'Initial collection from suspect workstation. Device powered down and secured.'
    },
    {
      id: 2,
      action: 'Evidence Transferred',
      custodian: 'Evidence Clerk M. Johnson',
      timestamp: '2024-01-15T11:45:00Z',
      location: 'Evidence Locker A-15',
      signature: 'Digital Signature Verified',
      notes: 'Transferred to secure evidence storage. Chain of custody maintained.'
    },
    {
      id: 3,
      action: 'Forensic Analysis Started',
      custodian: 'Forensic Analyst R. Davis',
      timestamp: '2024-01-16T09:15:00Z',
      location: 'Digital Forensics Lab',
      signature: 'Digital Signature Verified',
      notes: 'Began forensic imaging process. Write-blocking device attached.'
    },
    {
      id: 4,
      action: 'Analysis Completed',
      custodian: 'Forensic Analyst R. Davis',
      timestamp: '2024-01-17T16:30:00Z',
      location: 'Digital Forensics Lab',
      signature: 'Digital Signature Verified',
      notes: 'Forensic analysis completed. Evidence returned to secure storage.'
    }
  ];

  const metadata = {
    evidenceId: selectedEvidence.id,
    name: selectedEvidence.name,
    type: selectedEvidence.type,
    size: selectedEvidence.size,
    hash: selectedEvidence.hash,
    collectionDate: selectedEvidence.collectionDate,
    source: selectedEvidence.source,
    location: selectedEvidence.location,
    caseId: selectedEvidence.caseId,
    priority: selectedEvidence.priority,
    status: selectedEvidence.status,
    legalHold: selectedEvidence.legalHold,
    custodian: selectedEvidence.custodian,
    tags: ['financial', 'digital-evidence', 'high-priority'],
    description: `Laptop hard drive seized from suspect's workstation during search warrant execution. Device contains potential evidence related to financial fraud investigation. Drive has been forensically imaged and analyzed.`,
    technicalDetails: {
      manufacturer: 'Dell',model: 'Latitude 7420',serialNumber: 'DL7420-2024-001',fileSystem: 'NTFS',capacity: '512 GB',interface: 'SATA III',encryption: 'BitLocker Encrypted'
    },
    forensicDetails: {
      imagingTool: 'FTK Imager 4.7.1',hashAlgorithm: 'SHA-256',
      verificationHash: 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6',imagingDate: '2024-01-16T09:15:00Z',analyst: 'R. Davis',writeBlocker: 'Tableau T35u'
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'verified': return 'text-success bg-success-50';
      case 'processing': return 'text-warning bg-warning-50';
      case 'sealed': return 'text-primary bg-primary-50';
      case 'legal-hold': return 'text-error bg-error-50';
      case 'archived': return 'text-text-secondary bg-secondary-100';
      case 'collecting': return 'text-accent bg-accent-50';
      default: return 'text-text-secondary bg-secondary-100';
    }
  };

  const renderMetadataTab = () => (
    <div className="space-y-6">
      {/* Basic Information */}
      <div>
        <h4 className="text-sm font-heading font-semibold text-text-primary mb-3">
          Basic Information
        </h4>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-text-secondary uppercase tracking-wider">
                Evidence ID
              </label>
              <p className="text-sm font-data font-medium text-text-primary mt-1">
                {metadata.evidenceId}
              </p>
            </div>
            <div>
              <label className="text-xs font-medium text-text-secondary uppercase tracking-wider">
                Case ID
              </label>
              <p className="text-sm text-text-primary mt-1">
                {metadata.caseId}
              </p>
            </div>
          </div>
          
          <div>
            <label className="text-xs font-medium text-text-secondary uppercase tracking-wider">
              Name & Description
            </label>
            <p className="text-sm font-medium text-text-primary mt-1">
              {metadata.name}
            </p>
            <p className="text-sm text-text-secondary mt-1">
              {metadata.description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-text-secondary uppercase tracking-wider">
                Type
              </label>
              <p className="text-sm text-text-primary mt-1">
                {metadata.type}
              </p>
            </div>
            <div>
              <label className="text-xs font-medium text-text-secondary uppercase tracking-wider">
                Size
              </label>
              <p className="text-sm text-text-primary mt-1">
                {metadata.size}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-text-secondary uppercase tracking-wider">
                Status
              </label>
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-1 ${getStatusColor(metadata.status)}`}>
                {metadata.status.replace('-', ' ').toUpperCase()}
              </span>
            </div>
            <div>
              <label className="text-xs font-medium text-text-secondary uppercase tracking-wider">
                Legal Hold
              </label>
              <div className="flex items-center mt-1">
                <Icon
                  name={metadata.legalHold ? 'Lock' : 'Unlock'}
                  size={16}
                  className={metadata.legalHold ? 'text-error' : 'text-text-secondary'}
                />
                <span className="text-sm text-text-primary ml-2">
                  {metadata.legalHold ? 'Active' : 'Not Active'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Technical Details */}
      <div>
        <h4 className="text-sm font-heading font-semibold text-text-primary mb-3">
          Technical Details
        </h4>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-text-secondary uppercase tracking-wider">
                Manufacturer
              </label>
              <p className="text-sm text-text-primary mt-1">
                {metadata.technicalDetails.manufacturer}
              </p>
            </div>
            <div>
              <label className="text-xs font-medium text-text-secondary uppercase tracking-wider">
                Model
              </label>
              <p className="text-sm text-text-primary mt-1">
                {metadata.technicalDetails.model}
              </p>
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-text-secondary uppercase tracking-wider">
              Serial Number
            </label>
            <p className="text-sm font-data text-text-primary mt-1">
              {metadata.technicalDetails.serialNumber}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-text-secondary uppercase tracking-wider">
                File System
              </label>
              <p className="text-sm text-text-primary mt-1">
                {metadata.technicalDetails.fileSystem}
              </p>
            </div>
            <div>
              <label className="text-xs font-medium text-text-secondary uppercase tracking-wider">
                Interface
              </label>
              <p className="text-sm text-text-primary mt-1">
                {metadata.technicalDetails.interface}
              </p>
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-text-secondary uppercase tracking-wider">
              Encryption
            </label>
            <p className="text-sm text-text-primary mt-1">
              {metadata.technicalDetails.encryption}
            </p>
          </div>
        </div>
      </div>

      {/* Forensic Details */}
      <div>
        <h4 className="text-sm font-heading font-semibold text-text-primary mb-3">
          Forensic Analysis
        </h4>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-text-secondary uppercase tracking-wider">
                Imaging Tool
              </label>
              <p className="text-sm text-text-primary mt-1">
                {metadata.forensicDetails.imagingTool}
              </p>
            </div>
            <div>
              <label className="text-xs font-medium text-text-secondary uppercase tracking-wider">
                Write Blocker
              </label>
              <p className="text-sm text-text-primary mt-1">
                {metadata.forensicDetails.writeBlocker}
              </p>
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-text-secondary uppercase tracking-wider">
              Hash Algorithm
            </label>
            <p className="text-sm text-text-primary mt-1">
              {metadata.forensicDetails.hashAlgorithm}
            </p>
          </div>

          <div>
            <label className="text-xs font-medium text-text-secondary uppercase tracking-wider">
              Verification Hash
            </label>
            <p className="text-xs font-data text-text-primary mt-1 break-all bg-background p-2 rounded">
              {metadata.forensicDetails.verificationHash}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-text-secondary uppercase tracking-wider">
                Imaging Date
              </label>
              <p className="text-sm text-text-primary mt-1">
                {formatDate(metadata.forensicDetails.imagingDate)}
              </p>
            </div>
            <div>
              <label className="text-xs font-medium text-text-secondary uppercase tracking-wider">
                Analyst
              </label>
              <p className="text-sm text-text-primary mt-1">
                {metadata.forensicDetails.analyst}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tags */}
      <div>
        <h4 className="text-sm font-heading font-semibold text-text-primary mb-3">
          Tags
        </h4>
        <div className="flex flex-wrap gap-2">
          {metadata.tags.map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  const renderCustodyTab = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-heading font-semibold text-text-primary">
          Chain of Custody
        </h4>
        <Button
          variant="ghost"
          size="xs"
          iconName="Plus"
          onClick={() => console.log('Add custody entry')}
        >
          Add Entry
        </Button>
      </div>

      <div className="space-y-4">
        {custodyChain.map((entry, index) => (
          <div key={entry.id} className="relative">
            {index < custodyChain.length - 1 && (
              <div className="absolute left-4 top-8 bottom-0 w-0.5 bg-border"></div>
            )}
            
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0">
                {index + 1}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="bg-background rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="text-sm font-medium text-text-primary">
                      {entry.action}
                    </h5>
                    <span className="text-xs text-text-secondary">
                      {formatDate(entry.timestamp)}
                    </span>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Icon name="User" size={14} className="text-text-secondary" />
                        <span className="text-xs text-text-secondary">
                          {entry.custodian}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="MapPin" size={14} className="text-text-secondary" />
                        <span className="text-xs text-text-secondary">
                          {entry.location}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-1">
                      <Icon name="Shield" size={14} className="text-success" />
                      <span className="text-xs text-success">
                        {entry.signature}
                      </span>
                    </div>
                    
                    {entry.notes && (
                      <p className="text-xs text-text-secondary mt-2">
                        {entry.notes}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="h-full bg-surface border-l border-border flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-heading font-semibold text-text-primary">
            Evidence Details
          </h3>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              iconName="Download"
              onClick={() => console.log('Download evidence')}
            />
            <Button
              variant="ghost"
              size="sm"
              iconName="Edit"
              onClick={() => setIsEditing(!isEditing)}
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-background rounded-lg p-1">
          <button
            onClick={() => setActiveTab('metadata')}
            className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-micro ${
              activeTab === 'metadata' ?'bg-surface text-text-primary shadow-sm' :'text-text-secondary hover:text-text-primary'
            }`}
          >
            Metadata
          </button>
          <button
            onClick={() => setActiveTab('custody')}
            className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-micro ${
              activeTab === 'custody' ?'bg-surface text-text-primary shadow-sm' :'text-text-secondary hover:text-text-primary'
            }`}
          >
            Custody Chain
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'metadata' ? renderMetadataTab() : renderCustodyTab()}
      </div>

      {/* Footer Actions */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-xs text-text-secondary">
            <Icon name="Clock" size={14} />
            <span>Last updated: {formatDate(selectedEvidence.collectionDate)}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              iconName="FileSignature"
              onClick={() => console.log('Digital signature')}
            >
              Sign
            </Button>
            <Button
              variant="primary"
              size="sm"
              iconName="Save"
              onClick={() => console.log('Save changes')}
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetadataCustodyPanel;