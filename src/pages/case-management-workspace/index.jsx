import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import CaseHeader from './components/CaseHeader';
import EvidenceTree from './components/EvidenceTree';
import MainContentArea from './components/MainContentArea';
import AnalysisPanel from './components/AnalysisPanel';
import EvidenceTable from './components/EvidenceTable';

import Button from '../../components/ui/Button';

const CaseManagementWorkspace = () => {
  const [activeView, setActiveView] = useState('workspace'); // workspace, table
  const [selectedEvidence, setSelectedEvidence] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [caseNotes, setCaseNotes] = useState([]);
  const [isLeftPanelCollapsed, setIsLeftPanelCollapsed] = useState(false);
  const [isRightPanelCollapsed, setIsRightPanelCollapsed] = useState(false);

  // Mock case data
  const caseData = {
    id: "CASE-2024-001",
    title: "Advanced Persistent Threat Investigation - Operation ShadowNet",
    description: "Comprehensive investigation into sophisticated cyber espionage campaign targeting financial institutions. Evidence suggests coordinated attack involving multiple threat actors with advanced capabilities and international scope.",
    status: "Active",
    priority: "Critical",
    createdDate: "2024-01-15T09:00:00Z",
    lastUpdated: "2024-01-20T14:30:00Z",
    dueDate: "2024-02-15T23:59:59Z",
    teamMembers: [
      {
        id: 1,
        name: "Sarah Chen",
        role: "Lead Analyst",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b9e0e4d4?w=150"
      },
      {
        id: 2,
        name: "Marcus Rodriguez",
        role: "Threat Intelligence",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150"
      },
      {
        id: 3,
        name: "Dr. Emily Watson",
        role: "Digital Forensics",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150"
      },
      {
        id: 4,
        name: "James Park",
        role: "Network Analysis",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150"
      },
      {
        id: 5,
        name: "Lisa Thompson",
        role: "Malware Analysis",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150"
      }
    ],
    stats: {
      evidenceCount: 247,
      sourcesCount: 18,
      analysisCount: 12,
      completionPercentage: 68
    }
  };

  // Mock evidence tree data
  const evidenceTreeData = [
    {
      id: 'network-intelligence',
      name: 'Network Intelligence',
      type: 'folder',
      children: [
        {
          id: 'evidence_1',
          name: 'Malicious IP Analysis - 192.168.1.100',
          type: 'evidence',
          sourceType: 'network',
          collectedDate: '2024-01-18T10:30:00Z',
          verificationStatus: 'verified',
          credibilityScore: 92,
          tags: ['malware', 'c2-server', 'high-priority'],
          sourceUrl: 'https://virustotal.com/gui/ip-address/192.168.1.100',
          fileSize: '2.4 KB',
          hash: 'a1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456',
          contentType: 'json',
          content: `{
  "ip_address": "192.168.1.100",
  "reputation": "malicious",
  "threat_types": ["malware", "c2"],
  "first_seen": "2024-01-15T08:00:00Z",
  "last_seen": "2024-01-18T10:30:00Z",
  "geolocation": {
    "country": "Unknown",
    "city": "Unknown",
    "coordinates": [0, 0]
  },
  "associated_domains": [
    "malicious-domain.com",
    "suspicious-site.net"
  ],
  "communication_patterns": {
    "frequency": "high",
    "data_volume": "moderate",
    "encryption": "yes"
  }
}`,
          annotations: [],
          timeline: [
            {
              action: 'Evidence Collected',
              description: 'IP address identified through network traffic analysis',
              timestamp: '2024-01-18T10:30:00Z',
              user: 'James Park'
            },
            {
              action: 'Verification Completed',
              description: 'Confirmed malicious activity through multiple threat intelligence sources',
              timestamp: '2024-01-18T11:15:00Z',
              user: 'Sarah Chen'
            }
          ]
        },
        {
          id: 'evidence_2',
          name: 'Domain Registration Records - shadownet.org',
          type: 'evidence',
          sourceType: 'domain',
          collectedDate: '2024-01-17T14:20:00Z',
          verificationStatus: 'verified',
          credibilityScore: 88,
          tags: ['domain', 'registration', 'infrastructure'],
          sourceUrl: 'https://whois.net/shadownet.org',
          fileSize: '1.8 KB',
          hash: 'b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef1234567',
          contentType: 'text',
          content: `Domain Name: SHADOWNET.ORG
Registry Domain ID: D123456789-LROR
Registrar WHOIS Server: whois.registrar.com
Registrar URL: http://www.registrar.com
Updated Date: 2024-01-15T00:00:00Z
Creation Date: 2023-12-01T00:00:00Z
Registry Expiry Date: 2024-12-01T00:00:00Z
Registrar: Anonymous Registrar LLC
Registrar IANA ID: 12345
Registrar Abuse Contact Email: abuse@registrar.com
Registrar Abuse Contact Phone: +1.5555551234

Domain Status: clientTransferProhibited
Registry Registrant ID: REDACTED FOR PRIVACY
Registrant Name: REDACTED FOR PRIVACY
Registrant Organization: REDACTED FOR PRIVACY
Registrant Street: REDACTED FOR PRIVACY
Registrant City: REDACTED FOR PRIVACY
Registrant State/Province: REDACTED FOR PRIVACY
Registrant Postal Code: REDACTED FOR PRIVACY
Registrant Country: US
Registrant Phone: REDACTED FOR PRIVACY
Registrant Email: REDACTED FOR PRIVACY

Name Server: NS1.SHADOWNET.ORG
Name Server: NS2.SHADOWNET.ORG`,
          annotations: [],
          timeline: [
            {
              action: 'Domain Discovered',
              description: 'Domain identified in network traffic logs',
              timestamp: '2024-01-17T14:20:00Z',
              user: 'Marcus Rodriguez'
            }
          ]
        }
      ]
    },
    {
      id: 'social-media-intel',
      name: 'Social Media Intelligence',
      type: 'folder',
      children: [
        {
          id: 'evidence_3',
          name: 'Suspicious Twitter Account - @shadow_ops_2024',
          type: 'evidence',
          sourceType: 'social_media',
          collectedDate: '2024-01-19T09:45:00Z',
          verificationStatus: 'pending',
          credibilityScore: 75,
          tags: ['social-media', 'twitter', 'suspicious-activity'],
          sourceUrl: 'https://twitter.com/shadow_ops_2024',
          fileSize: '3.2 KB',
          hash: 'c3d4e5f6789012345678901234567890abcdef1234567890abcdef12345678',
          contentType: 'text',
          content: `Twitter Profile Analysis:
Username: @shadow_ops_2024
Display Name: Shadow Operations
Bio: "Digital security researcher. Exploring the depths of cyberspace."
Location: Not specified
Joined: December 2023
Following: 47
Followers: 156
Tweets: 89

Recent Activity Analysis:
- Frequent posts about cybersecurity tools and techniques
- Unusual posting patterns (primarily during non-business hours)
- Interactions with known threat actor accounts
- Sharing of suspicious links and resources
- Use of coded language and technical jargon

Behavioral Indicators:
- Account created shortly before campaign began
- Limited personal information
- Focus on technical security topics
- Engagement with underground communities`,
          annotations: [],
          timeline: [
            {
              action: 'Account Discovered',
              description: 'Account identified through social media monitoring',
              timestamp: '2024-01-19T09:45:00Z',
              user: 'Sarah Chen'
            }
          ]
        }
      ]
    },
    {
      id: 'digital-forensics',
      name: 'Digital Forensics',
      type: 'folder',
      children: [
        {
          id: 'evidence_4',
          name: 'Malware Sample - trojan.exe',
          type: 'evidence',
          sourceType: 'document',
          collectedDate: '2024-01-16T16:30:00Z',
          verificationStatus: 'verified',
          credibilityScore: 95,
          tags: ['malware', 'trojan', 'executable'],
          sourceUrl: 'file://evidence/malware/trojan.exe',
          fileSize: '2.1 MB',
          hash: 'd4e5f6789012345678901234567890abcdef1234567890abcdef123456789',
          contentType: 'binary',
          content: 'Binary file content not displayable',
          annotations: [],
          timeline: [
            {
              action: 'Sample Collected',
              description: 'Malware sample extracted from infected system',
              timestamp: '2024-01-16T16:30:00Z',
              user: 'Dr. Emily Watson'
            },
            {
              action: 'Analysis Completed',
              description: 'Static and dynamic analysis completed',
              timestamp: '2024-01-17T10:00:00Z',
              user: 'Lisa Thompson'
            }
          ]
        }
      ]
    }
  ];

  // Flatten evidence tree for table view
  const flattenEvidenceTree = (nodes) => {
    let flattened = [];
    nodes.forEach(node => {
      if (node.type === 'evidence') {
        flattened.push(node);
      }
      if (node.children) {
        flattened = [...flattened, ...flattenEvidenceTree(node.children)];
      }
    });
    return flattened;
  };

  const evidenceItems = flattenEvidenceTree(evidenceTreeData);

  // Mock initial notes
  useEffect(() => {
    setCaseNotes([
      {
        id: 1,
        content: `Initial assessment reveals sophisticated multi-stage attack campaign. Threat actors demonstrate advanced capabilities including:
- Custom malware development
- Infrastructure obfuscation techniques
- Social engineering components
- Persistence mechanisms

Recommend immediate containment measures and expanded monitoring.`,
        category: 'critical',
        timestamp: new Date('2024-01-15T10:00:00Z'),
        author: 'Sarah Chen',
        evidenceId: null
      },
      {
        id: 2,
        content: `Network traffic analysis shows consistent C2 communication patterns. Peak activity observed between 02:00-04:00 UTC, suggesting threat actors operating in Eastern European timezone.`,
        category: 'important',
        timestamp: new Date('2024-01-18T11:30:00Z'),
        author: 'James Park',
        evidenceId: 'evidence_1'
      },
      {
        id: 3,
        content: `Question: Are there any connections between the domain registration and known threat actor groups? Need to cross-reference with threat intelligence databases.`,
        category: 'question',
        timestamp: new Date('2024-01-17T15:00:00Z'),
        author: 'Marcus Rodriguez',
        evidenceId: 'evidence_2'
      }
    ]);
  }, []);

  const handleEvidenceSelect = (evidence) => {
    setSelectedEvidence(evidence);
  };

  const handleEvidenceUpdate = (evidenceId, updates) => {
    console.log('Update evidence:', evidenceId, updates);
    // In a real app, this would update the evidence in the backend
  };

  const handleAnnotationAdd = (evidenceId, annotation) => {
    console.log('Add annotation:', evidenceId, annotation);
    // In a real app, this would save the annotation to the backend
  };

  const handleNotesUpdate = (updatedNotes) => {
    setCaseNotes(updatedNotes);
  };

  const handleRelationshipAdd = (relationship) => {
    console.log('Add relationship:', relationship);
    // In a real app, this would save the relationship to the backend
  };

  const handleBulkAction = (action, itemIds) => {
    console.log('Bulk action:', action, itemIds);
    // In a real app, this would perform the bulk action
    switch (action) {
      case 'tag': console.log('Tagging items:', itemIds);
        break;
      case 'verify':
        console.log('Verifying items:', itemIds);
        break;
      case 'export':
        console.log('Exporting items:', itemIds);
        break;
      default:
        break;
    }
  };

  const handleCaseUpdate = (updatedCase) => {
    console.log('Update case:', updatedCase);
    // In a real app, this would update the case in the backend
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar />
      
      <div className="ml-64 mt-16">
        {/* Case Header */}
        <CaseHeader 
          caseData={caseData}
          onUpdateCase={handleCaseUpdate}
        />

        {/* View Toggle */}
        <div className="border-b border-border bg-surface px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1 bg-background rounded-lg p-1">
              <Button
                variant={activeView === 'workspace' ? 'primary' : 'ghost'}
                size="sm"
                iconName="Layout"
                onClick={() => setActiveView('workspace')}
              >
                Workspace View
              </Button>
              <Button
                variant={activeView === 'table' ? 'primary' : 'ghost'}
                size="sm"
                iconName="Table"
                onClick={() => setActiveView('table')}
              >
                Table View
              </Button>
            </div>

            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" iconName="Search">
                Search Evidence
              </Button>
              <Button variant="ghost" size="sm" iconName="Filter">
                Advanced Filters
              </Button>
              <Button variant="primary" size="sm" iconName="Plus">
                Add Evidence
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        {activeView === 'workspace' ? (
          <div className="flex h-[calc(100vh-200px)]">
            {/* Left Panel - Evidence Tree */}
            {!isLeftPanelCollapsed && (
              <div className="w-80 flex-shrink-0">
                <EvidenceTree
                  evidenceData={evidenceTreeData}
                  onEvidenceSelect={handleEvidenceSelect}
                  onEvidenceUpdate={handleEvidenceUpdate}
                  selectedEvidence={selectedEvidence}
                />
              </div>
            )}

            {/* Panel Toggle Button */}
            <div className="flex flex-col justify-center">
              <Button
                variant="ghost"
                size="sm"
                iconName={isLeftPanelCollapsed ? 'ChevronRight' : 'ChevronLeft'}
                onClick={() => setIsLeftPanelCollapsed(!isLeftPanelCollapsed)}
                className="w-6 h-12 rounded-none border-y border-border"
              />
            </div>

            {/* Main Content Area */}
            <MainContentArea
              selectedEvidence={selectedEvidence}
              onEvidenceUpdate={handleEvidenceUpdate}
              onAnnotationAdd={handleAnnotationAdd}
            />

            {/* Panel Toggle Button */}
            <div className="flex flex-col justify-center">
              <Button
                variant="ghost"
                size="sm"
                iconName={isRightPanelCollapsed ? 'ChevronLeft' : 'ChevronRight'}
                onClick={() => setIsRightPanelCollapsed(!isRightPanelCollapsed)}
                className="w-6 h-12 rounded-none border-y border-border"
              />
            </div>

            {/* Right Panel - Analysis */}
            {!isRightPanelCollapsed && (
              <AnalysisPanel
                selectedEvidence={selectedEvidence}
                caseNotes={caseNotes}
                onNotesUpdate={handleNotesUpdate}
                onRelationshipAdd={handleRelationshipAdd}
              />
            )}
          </div>
        ) : (
          <div className="p-6">
            <EvidenceTable
              evidenceItems={evidenceItems}
              onEvidenceSelect={handleEvidenceSelect}
              onBulkAction={handleBulkAction}
              selectedItems={selectedItems}
              onSelectionChange={setSelectedItems}
            />
          </div>
        )}
      </div>

      {/* Keyboard Shortcuts Help */}
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          variant="ghost"
          size="sm"
          iconName="Keyboard"
          className="bg-surface border border-border shadow-elevated"
          onClick={() => console.log('Show keyboard shortcuts')}
        >
          Shortcuts
        </Button>
      </div>
    </div>
  );
};

export default CaseManagementWorkspace;